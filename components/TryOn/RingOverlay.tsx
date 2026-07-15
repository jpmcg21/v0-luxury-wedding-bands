"use client"

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react"
import { Loader2, RefreshCw, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { detectRingFingerTransform, type RingFingerTransform } from "@/lib/tryon/hand-pose"

export interface RingOverlayHandle {
  exportImage: () => string | null
}

interface RingOverlayProps {
  imageSrc: string
  ringImageUrl: string | null
}

function loadImage(src: string, crossOrigin?: "anonymous"): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    if (crossOrigin) img.crossOrigin = crossOrigin
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

const DEFAULT_TRANSFORM: RingFingerTransform = { x: 0.5, y: 0.55, fingerWidth: 0, rotation: 0 }

export const RingOverlay = forwardRef<RingOverlayHandle, RingOverlayProps>(function RingOverlay(
  { imageSrc, ringImageUrl },
  ref,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const baseImageRef = useRef<HTMLImageElement | null>(null)
  const ringImageRef = useRef<HTMLImageElement | null>(null)

  const [detectedTransform, setDetectedTransform] = useState<RingFingerTransform | null>(null)
  const [detectionStatus, setDetectionStatus] = useState<"detecting" | "found" | "not-found">("detecting")

  const [scale, setScale] = useState(100)
  const [rotationOffset, setRotationOffset] = useState(0)
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    const baseImage = baseImageRef.current
    if (!canvas || !baseImage) return

    canvas.width = baseImage.naturalWidth
    canvas.height = baseImage.naturalHeight
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height)

    const ringImage = ringImageRef.current
    if (!ringImage) return

    const transform = detectedTransform ?? {
      ...DEFAULT_TRANSFORM,
      x: DEFAULT_TRANSFORM.x * canvas.width,
      y: DEFAULT_TRANSFORM.y * canvas.height,
      fingerWidth: canvas.width * 0.09,
    }

    const centerX = transform.x + offsetX
    const centerY = transform.y + offsetY
    const rotation = transform.rotation + (rotationOffset * Math.PI) / 180

    const ringWidth = transform.fingerWidth * 1.5 * (scale / 100)
    const ringHeight = ringWidth * (ringImage.naturalHeight / ringImage.naturalWidth)

    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate(rotation)
    ctx.drawImage(ringImage, -ringWidth / 2, -ringHeight / 2, ringWidth, ringHeight)
    ctx.restore()
  }, [detectedTransform, scale, rotationOffset, offsetX, offsetY])

  const runDetection = useCallback(async () => {
    if (!baseImageRef.current) return
    setDetectionStatus("detecting")
    try {
      const transform = await detectRingFingerTransform(baseImageRef.current)
      if (transform) {
        setDetectedTransform(transform)
        setDetectionStatus("found")
      } else {
        setDetectedTransform(null)
        setDetectionStatus("not-found")
      }
    } catch (error) {
      console.error("Hand detection failed:", error)
      setDetectedTransform(null)
      setDetectionStatus("not-found")
    }
  }, [])

  // Load the captured photo and run detection whenever it changes
  useEffect(() => {
    let cancelled = false
    setScale(100)
    setRotationOffset(0)
    setOffsetX(0)
    setOffsetY(0)

    loadImage(imageSrc).then((img) => {
      if (cancelled) return
      baseImageRef.current = img
      draw()
      runDetection()
    })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageSrc])

  // Load the selected ring image whenever it changes
  useEffect(() => {
    if (!ringImageUrl) {
      ringImageRef.current = null
      draw()
      return
    }

    let cancelled = false
    loadImage(ringImageUrl, "anonymous").then((img) => {
      if (cancelled) return
      ringImageRef.current = img
      draw()
    })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ringImageUrl])

  // Redraw whenever the transform or manual adjustments change
  useEffect(() => {
    draw()
  }, [draw])

  useImperativeHandle(ref, () => ({
    exportImage: () => canvasRef.current?.toDataURL("image/png") ?? null,
  }))

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="relative w-full max-w-md">
        <canvas ref={canvasRef} className="w-full h-auto rounded-lg bg-muted" />
        {detectionStatus === "detecting" && (
          <div className="absolute top-3 right-3 bg-background/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-2 text-xs">
            <Loader2 className="w-3 h-3 animate-spin" />
            Detecting hand…
          </div>
        )}
        {detectionStatus === "not-found" && (
          <div className="absolute top-3 right-3 bg-background/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="w-3 h-3" />
            Use sliders to place the ring
          </div>
        )}
      </div>

      <Button variant="outline" size="sm" onClick={runDetection} className="gap-2">
        <RefreshCw className="w-3.5 h-3.5" />
        Re-detect hand
      </Button>

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
