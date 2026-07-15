"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Camera, RotateCcw, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CameraViewProps {
  onCapture: (imageDataUrl: string) => void
}

function isMobileDevice() {
  if (typeof navigator === "undefined") return false
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}

export function CameraView({ onCapture }: CameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [facingMode, setFacingMode] = useState<"user" | "environment">("user")
  const [isStreaming, setIsStreaming] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)

  useEffect(() => {
    setFacingMode(isMobileDevice() ? "environment" : "user")
  }, [])

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    setIsStreaming(false)
  }, [])

  const startStream = useCallback(async () => {
    stopStream()
    setCameraError(null)

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
      setIsStreaming(true)
    } catch (error) {
      console.error("Camera error:", error)
      setCameraError("We couldn't access your camera. You can upload a photo instead.")
      setIsStreaming(false)
    }
  }, [facingMode, stopStream])

  useEffect(() => {
    startStream()
    return () => stopStream()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facingMode])

  const handleCapture = () => {
    const video = videoRef.current
    if (!video) return

    const canvas = document.createElement("canvas")
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    onCapture(canvas.toDataURL("image/png"))
    stopStream()
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    stopStream()
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onCapture(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"))
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full max-w-md aspect-[3/4] bg-muted rounded-lg overflow-hidden">
        {isStreaming ? (
          <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 text-center">
            <Camera className="w-8 h-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {cameraError || "Starting camera…"}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {isStreaming && (
          <>
            <Button onClick={handleCapture} className="gap-2">
              <Camera className="w-4 h-4" />
              Capture
            </Button>
            <Button variant="outline" size="icon" onClick={toggleFacingMode} title="Switch camera">
              <RotateCcw className="w-4 h-4" />
            </Button>
          </>
        )}
        <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="gap-2">
          <Upload className="w-4 h-4" />
          Upload Photo
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture={isMobileDevice() ? "environment" : undefined}
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </div>
  )
}
