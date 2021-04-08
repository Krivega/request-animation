import createRunner from './createRunner';

export default class RequestAnimation {
  private requestID?: number;

  private active = true;

  private runner: ReturnType<typeof createRunner>;

  constructor(
    { backgroundThrottling }: { backgroundThrottling?: boolean } = {
      backgroundThrottling: true,
    }
  ) {
    this.runner = createRunner(backgroundThrottling);
  }

  /**
   * Resolve the animation loop calculates time elapsed since the last loop
   * and only draws if your specified fps interval is achieved
   *
   * @param {function} animationFunc - Function for animation
   * @param {string}   fps           - Frames per Second
   *
   * @returns {undefined}
   */
  run(animationFunc: FrameRequestCallback, fps = 60) {
    const fpsInterval = 1000 / fps;

    let delta = 0; // 0 for run for first, set Date.now() if no needs first run

    /**
     * Animate loop
     *
     * @param {number} timestamp - DOMHighResTimeStamp similar to the one returned by performance.now()
     * indicating the point in time when requestAnimationFrame() starts to execute callback functions.
     *
     * @returns {undefined}
     */
    const animateLoop = (timestamp: number) => {
      this.request(animateLoop);

      // calc elapsed time since last loop
      const elapsed = timestamp - delta;

      // if enough time has elapsed, draw the next frame

      if (elapsed > fpsInterval) {
        // Get ready for next frame by setting delta=timestamp, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        delta = timestamp - (elapsed % fpsInterval);

        animationFunc(timestamp);
      }
    };

    this.cancelRequest();
    this.request(animateLoop);
  }

  /**
   * Resolve the animation loop calculates time elapsed since the last loop
   * and only draws if your specified fps interval is achieved
   *
   * @param {function} animationFunc - Function for animation
   * @param {string}   fps           - Frames per Second
   *
   * @returns {undefined}
   */
  async runAsync(animationFunc: FrameRequestCallback, fps = 60) {
    const fpsInterval = 1000 / fps;

    let delta = 0; // 0 for run for first, set Date.now() if no needs first run

    /**
     * Animate loop
     *
     * @param {number} timestamp - DOMHighResTimeStamp similar to the one returned by performance.now()
     * indicating the point in time when requestAnimationFrame() starts to execute callback functions.
     *
     * @returns {undefined}
     */
    const animateLoop = async (timestamp: number) => {
      // calc elapsed time since last loop
      const elapsed = timestamp - delta;

      // if enough time has elapsed, draw the next frame

      if (elapsed > fpsInterval) {
        // Get ready for next frame by setting delta=timestamp, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        delta = timestamp - (elapsed % fpsInterval);

        await animationFunc(timestamp);
      }

      this.request(animateLoop);
    };

    this.cancelRequest();
    this.request(animateLoop);
  }

  /**
   * Request single call
   *
   * @param {function} animationFunc - Function for animation
   *
   * @returns {undefined}
   */
  request(animationFunc: FrameRequestCallback) {
    if (this.active) {
      this.requestID = this.runner.requestAnimationFrame(animationFunc);
    }
  }

  /**
   * cancelRequest
   *
   * @returns {undefined}
   */
  cancelRequest() {
    if (this.requestID) {
      this.runner.cancelAnimationFrame(this.requestID);
    }
  }

  /**
   * activate
   *
   * @returns {undefined}
   */
  activate() {
    this.cancelRequest();
    this.active = true;
  }

  /**
   * deactivate
   *
   * @returns {undefined}
   */
  deactivate() {
    this.cancelRequest();
    this.active = false;
  }
}
