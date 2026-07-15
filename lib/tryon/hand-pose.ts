// Client-only helpers for loading TensorFlow.js HandPose and detecting the ring finger.
// All imports are dynamic so this module never runs during SSR.

export type HandLandmark = { x: number; y: number; z: number }

export type RingFingerTransform = {
  /** Center point where the ring should sit, in source-image pixel coordinates */
  x: number
  y: number
  /** Width of the ring finger at the knuckle, in source-image pixels — used to scale the ring image */
  fingerWidth: number
  /** Angle of the ring finger in radians, measured from vertical */
  rotation: number
}

let detectorPromise: Promise<any> | null = null

async function getDetector() {
  if (!detectorPromise) {
    detectorPromise = (async () => {
      const tf = await import("@tensorflow/tfjs")
      const handPoseDetection = await import("@tensorflow-models/hand-pose-detection")
      await tf.ready()

      return handPoseDetection.createDetector(handPoseDetection.SupportedModels.MediaPipeHands, {
        runtime: "tfjs",
        modelType: "lite",
        maxHands: 1,
      })
    })()
  }
  return detectorPromise
}

/**
 * Runs hand landmark detection on an image and returns a transform for placing
 * a ring on the ring finger. Returns null if no hand is detected.
 */
export async function detectRingFingerTransform(
  image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
): Promise<RingFingerTransform | null> {
  const detector = await getDetector()
  const hands = await detector.estimateHands(image, { flipHorizontal: false })

  if (!hands || hands.length === 0) {
    return null
  }

  const keypoints: HandLandmark[] = hands[0].keypoints3D ?? hands[0].keypoints
  const byName = (name: string) => hands[0].keypoints.find((k: any) => k.name === name)

  // MediaPipe Hands landmark indices: ring finger = 13 (mcp), 14 (pip), 15 (dip), 16 (tip)
  const ringMcp = byName("ring_finger_mcp") ?? hands[0].keypoints[13]
  const ringPip = byName("ring_finger_pip") ?? hands[0].keypoints[14]
  const ringTip = byName("ring_finger_tip") ?? hands[0].keypoints[16]
  const indexMcp = byName("index_finger_mcp") ?? hands[0].keypoints[5]
  const pinkyMcp = byName("pinky_finger_mcp") ?? hands[0].keypoints[17]

  if (!ringMcp || !ringPip || !indexMcp || !pinkyMcp) {
    return null
  }

  // Place the ring between the mcp and pip joints (the base segment of the finger)
  const x = (ringMcp.x + ringPip.x) / 2
  const y = (ringMcp.y + ringPip.y) / 2

  // Estimate finger width from the distance between neighboring knuckles
  const handWidth = Math.hypot(pinkyMcp.x - indexMcp.x, pinkyMcp.y - indexMcp.y)
  const fingerWidth = Math.max(handWidth / 3.2, 16)

  const dx = (ringTip?.x ?? ringPip.x) - ringMcp.x
  const dy = (ringTip?.y ?? ringPip.y) - ringMcp.y
  const rotation = Math.atan2(dx, -dy)

  return { x, y, fingerWidth, rotation }
}
