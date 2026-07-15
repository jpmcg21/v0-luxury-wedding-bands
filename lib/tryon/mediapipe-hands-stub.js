// Stub for "@mediapipe/hands", which ships as a UMD/global-script bundle with no
// real ESM exports and breaks bundlers. @tensorflow-models/hand-pose-detection
// statically imports { Hands } from it, but that class is only used when the
// "mediapipe" runtime is selected — this app always uses the "tfjs" runtime,
// so the stub is never actually invoked.
export class Hands {
  constructor() {
    throw new Error("The mediapipe hand-pose-detection runtime is not supported; use runtime: 'tfjs' instead.")
  }
}
