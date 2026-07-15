"use client"

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react"
import html2canvas from "html2canvas"
import { Camera, RotateCcw, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { detectRingFingerTransform, type RingFingerTransform } from "@/lib/tryon/hand-pose"

export interface LiveTryOnHandle {
  captureScreenshot: () => Promise<string | null>
}

interface LiveTryOnProps {
  ringImageUrl: string | null
}

type CameraStatus = "starting" | "live" | "denied" | "unavailable"

function isMobileDevice() {
  if (typeof navigator === "undefined") return false
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}

// How long to keep drawing the ring at its last known position after the hand
// briefly drops out of frame, so tracking doesn't flicker on momentary occlusion.
const TRACKING_GRACE_MS = 800
const SMOOTHING = 0.3

function loadImage(src: string, crossOrigin?: "anonymous"): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    if (crossOrigin) img.crossOrigin = crossOrigin
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

export const LiveTryOn = forwardRef<LiveTryOnHandle, LiveTryOnProps>(function LiveTryOn({ ringImageUrl }, ref) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const ringImageElRef = useRef<HTMLImageElement | null>(null)
  const uploadedImageRef = useRef<HTMLImageElement | null>(null)

  const latestTransformRef = useRef<RingFingerTransform | null>(null)
  const smoothedTransformRef = useRef<RingFingerTransform | null>(null)
  const lastSeenAtRef = useRef(0)

  const scaleRef = useRef(100)
  const rotationOffsetRef = useRef(0)
  const offsetXRef = useRef(0)
  const offsetYRef = useRef(0)

  const [facingMode, setFacingMode] = useState<"user" | "environment">("user")
  const [cameraStatus, setCameraStatus] = useState<CameraStatus>("starting")
  const [handStatus, setHandStatus] = useState<"searching" | "tracking" | "unavailable">("searching")
  const detectionUnavailableRef = useRef(false)
  const [usingUpload, setUsingUpload] = useState(false)

  const [scale, setScale] = useState(100)
  const [rotationOffset, setRotationOffset] = useState(0)
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    scaleRef.current = scale
  }, [scale])
  useEffect(() => {
    rotationOffsetRef.current = rotationOffset
  }, [rotationOffset])
  useEffect(() => {
    offsetXRef.current = offsetX
  }, [offsetX])
  useEffect(() => {
    offsetYRef.current = offsetY
  }, [offsetY])

  useEffect(() => {
    setFacingMode(isMobileDevice() ? "environment" : "user")
  }, [])

  // --- Camera lifecycle -----------------------------------------------------

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
  }, [])

  const startStream = useCallback(async () => {
    stopStream()
    setCameraStatus("starting")

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1280 }, height: { ideal: 960 } },
        audio: false,
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      setUsingUpload(false)
      setCameraStatus("live")
    } catch (error) {
      console.error("Camera error:", error)
      setCameraStatus(
        error instanceof DOMException && error.name === "NotAllowedError" ? "denied" : "unavailable",
      )
    }
  }, [facingMode, stopStream])

  useEffect(() => {
    startStream()
    return () => stopStream()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facingMode])

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"))
  }

  // --- Photo upload fallback (when camera is denied/unavailable) -----------

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    stopStream()
    const reader = new FileReader()
    reader.onload = async () => {
      if (typeof reader.result !== "string") return
      const img = await loadImage(reader.result)
      uploadedImageRef.current = img
      setUsingUpload(true)
    }
    reader.readAsDataURL(file)
  }

  // --- Ring image loading -----------------------------------------------------

  useEffect(() => {
    if (!ringImageUrl) {
      ringImageElRef.current = null
      return
    }
    let cancelled = false
    loadImage(ringImageUrl, "anonymous").then((img) => {
      if (!cancelled) ringImageElRef.current = img
    })
    return () => {
      cancelled = true
    }
  }, [ringImageUrl])

  // --- Hand detection loop (runs continuously against the live video / upload) ---

  useEffect(() => {
    let cancelled = false

    async function loop() {
      while (!cancelled && !detectionUnavailableRef.current) {
        const source: HTMLImageElement | HTMLVideoElement | null = usingUpload
          ? uploadedImageRef.current
          : videoRef.current
        const sourceReady = source && (usingUpload || (source as HTMLVideoElement).readyState >= 2)

        if (source && sourceReady) {
          try {
            const transform = await detectRingFingerTransform(source)
            if (cancelled) return
            latestTransformRef.current = transform
            if (transform) lastSeenAtRef.current = performance.now()
          } catch (error) {
            // Hand tracking is best-effort — if the model can't load (blocked CDN,
            // unsupported browser, etc.) stop retrying instead of erroring every frame.
            console.error("Hand detection unavailable:", error)
            detectionUnavailableRef.current = true
            setHandStatus("unavailable")
            return
          }
        }

        // If we're just showing a single uploaded photo, one detection pass is enough.
        if (usingUpload) return

        await new Promise((resolve) => requestAnimationFrame(resolve))
      }
    }

    loop()
    return () => {
      cancelled = true
    }
  }, [cameraStatus, usingUpload])

  // Reflect detection presence into React state, throttled to actual transitions only
  useEffect(() => {
    const interval = setInterval(() => {
      if (detectionUnavailableRef.current) return
      const found = performance.now() - lastSeenAtRef.current < TRACKING_GRACE_MS
      setHandStatus((prev) => {
        const next = found ? "tracking" : "searching"
        return prev === next ? prev : next
      })
    }, 150)
    return () => clearInterval(interval)
  }, [])

  // --- Render loop: draws the mirrored video/photo + ring overlay every frame ---

  useEffect(() => {
    let rafId: number

    function render() {
      const canvas = canvasRef.current
      const source = usingUpload ? uploadedImageRef.current : videoRef.current
      rafId = requestAnimationFrame(render)
      if (!canvas || !source) return

      const sourceWidth = usingUpload
        ? (source as HTMLImageElement).naturalWidth
        : (source as HTMLVideoElement).videoWidth
      const sourceHeight = usingUpload
        ? (source as HTMLImageElement).naturalHeight
        : (source as HTMLVideoElement).videoHeight
      if (!sourceWidth || !sourceHeight) return

      if (canvas.width !== sourceWidth || canvas.height !== sourceHeight) {
        canvas.width = sourceWidth
        canvas.height = sourceHeight
      }

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const mirror = !usingUpload && facingMode === "user"

      ctx.save()
      if (mirror) {
        ctx.translate(canvas.width, 0)
        ctx.scale(-1, 1)
      }
      ctx.drawImage(source, 0, 0, canvas.width, canvas.height)

      // Ease toward the latest detection so the ring glides with the hand instead of snapping
      const target = latestTransformRef.current
      const withinGrace = performance.now() - lastSeenAtRef.current < TRACKING_GRACE_MS
      if (target && withinGrace) {
        const prev = smoothedTransformRef.current
        smoothedTransformRef.current = prev
          ? {
              x: prev.x + (target.x - prev.x) * SMOOTHING,
              y: prev.y + (target.y - prev.y) * SMOOTHING,
              fingerWidth: prev.fingerWidth + (target.fingerWidth - prev.fingerWidth) * SMOOTHING,
              rotation: prev.rotation + (target.rotation - prev.rotation) * SMOOTHING,
            }
          : target
      } else if (!withinGrace) {
        smoothedTransformRef.current = null
      }

      const ringImage = ringImageElRef.current
      // If auto-detection never found a hand (blocked model, unsupported browser),
      // fall back to a centered placement so the manual sliders still have something to adjust.
      const smoothed =
        smoothedTransformRef.current ??
        (detectionUnavailableRef.current
          ? { x: canvas.width * 0.5, y: canvas.height * 0.55, fingerWidth: canvas.width * 0.09, rotation: 0 }
          : null)
      if (ringImage && smoothed) {
        const centerX = smoothed.x + offsetXRef.current
        const centerY = smoothed.y + offsetYRef.current
        const rotation = smoothed.rotation + (rotationOffsetRef.current * Math.PI) / 180
        const ringWidth = smoothed.fingerWidth * 1.5 * (scaleRef.current / 100)
        const ringHeight = ringWidth * (ringImage.naturalHeight / ringImage.naturalWidth)

        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate(rotation)
        ctx.drawImage(ringImage, -ringWidth / 2, -ringHeight / 2, ringWidth, ringHeight)
        ctx.restore()
      }

      ctx.restore()
    }

    rafId = requestAnimationFrame(render)
    return () => cancelAnimationFrame(rafId)
  }, [facingMode, usingUpload])

  useImperativeHandle(ref, () => ({
    captureScreenshot: async () => {
      if (!containerRef.current) return null
      const shot = await html2canvas(containerRef.current, { useCORS: true, backgroundColor: null })
      return shot.toDataURL("image/jpeg", 0.9)
    },
  }))

  const showUploadFallback = cameraStatus === "denied" || cameraStatus === "unavailable"

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div
        ref={containerRef}
        className="relative w-full max-w-md aspect-[3/4] bg-muted rounded-lg overflow-hidden"
      >
        {/* Kept off-screen rather than display:none — hidden video elements stop
            decoding frames on many mobile browsers (notably iOS Safari), which
            would starve the canvas of a source image to draw. */}
        <video
          ref={videoRef}
          className="absolute w-px h-px opacity-0 pointer-events-none -z-10"
          style={{ left: "-9999px" }}
          playsInline
          muted
        />
        <canvas ref={canvasRef} className="w-full h-full object-cover" />

        {cameraStatus === "starting" && !usingUpload && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center bg-muted">
            <Camera className="w-8 h-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Starting camera…</p>
          </div>
        )}

        {showUploadFallback && !usingUpload && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center bg-muted">
            <Camera className="w-8 h-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              We couldn't access your camera. Upload a photo of your hand instead.
            </p>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="gap-2">
              <Upload className="w-4 h-4" />
              Upload Photo
            </Button>
          </div>
        )}

        {(cameraStatus === "live" || usingUpload) && (
          <div className="absolute top-3 right-3 bg-background/90 backdrop-blur px-3 py-1.5 rounded-full text-xs">
            {handStatus === "tracking" && "Ring tracking your hand"}
            {handStatus === "searching" && "Show your hand to the camera"}
            {handStatus === "unavailable" && "Auto-detect unavailable — use sliders"}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {cameraStatus === "live" && isMobileDevice() && (
          <Button variant="outline" size="icon" onClick={toggleFacingMode} title="Switch camera">
            <RotateCcw className="w-4 h-4" />
          </Button>
        )}
        {!showUploadFallback && (
          <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="gap-2">
            <Upload className="w-3.5 h-3.5" />
            Upload Photo Instead
          </Button>
        )}
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
      </div>

      <div className="w-full max-w-md grid grid-cols-2 gap-x-6 gap-y-4 pt-2">
        <div className="col-span-2 space-y-1.5">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Ring size</Label>
            <span className="text-xs text-muted-foreground">{scale}%</span>
          </div>
          <Slider min={40} max={200} step={2} value={[scale]} onValueChange={([v]) => setScale(v)} />
        </div>
        <div className="col-span-2 space-y-1.5">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Rotation</Label>
            <span className="text-xs text-muted-foreground">{rotationOffset}°</span>
          </div>
          <Slider
            min={-90}
            max={90}
            step={1}
            value={[rotationOffset]}
            onValueChange={([v]) => setRotationOffset(v)}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Left / Right</Label>
          <Slider min={-100} max={100} step={1} value={[offsetX]} onValueChange={([v]) => setOffsetX(v)} />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Up / Down</Label>
          <Slider min={-100} max={100} step={1} value={[offsetY]} onValueChange={([v]) => setOffsetY(v)} />
        </div>
      </div>
    </div>
  )
})
