import createRunner from './createRunner';

export default class RequestAnimation {
  private requestID?: number;

  private active = true;

  private runner: ReturnType<typeof createRunner>;

  constructor(
    { backgroundThrottling }: { backgroundThrottling?: boolean } = {
      backgroundThrottling: true,
    },
  ) {
    this.runner = createRunner(backgroundThrottling);
  }

  /**
   * Resolve the animation loop calculates time elapsed since the last loop
   * and only draws if your specified fps interval is achieved
   *
   * @param {function} animationFunc - Function for animation
   * @param {number}   fps           - Frames per Second
   * @param {number}   limit         - Frames summary
   *
   * @returns {undefined}
   */
  run(animationFunc: FrameRequestCallback, fps: number = 60, limit?: number) {
    const fpsInterval = 1000 / fps;

    let delta = 0; // 0 for run for first, set Date.now() if no needs first run
    let count = 0;

    /**
     * Animate loop
     *
     * @param {number} timestamp - DOMHighResTimeStamp similar to the one returned by performance.now()
     * indicating the point in time when requestAnimationFrame() starts to execute callback functions.
     *
     * @returns {undefined}
     */
    const animateLoop = (timestamp: number) => {
      const isLimited = limit && count >= limit;

      if (isLimited) {
        return;
      }

      this.request(animateLoop);

      // calc elapsed time since last loop
      const elapsed = timestamp - delta;

      // if enough time has elapsed, draw the next frame

      if (elapsed > fpsInterval) {
        // Get ready for next frame by setting delta=timestamp, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        delta = timestamp - (elapsed % fpsInterval);
        count += 1;

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
   * @param {number}   fps           - Frames per Second
   * @param {number}   limit         - Frames summary
   *
   * @returns {undefined}
   */
  async runAsync(animationFunc: FrameRequestCallback, fps: number = 60, limit?: number) {
    const fpsInterval = 1000 / fps;

    let delta = 0; // 0 for run for first, set Date.now() if no needs first run
    let count = 0;

    /**
     * Animate loop
     *
     * @param {number} timestamp - DOMHighResTimeStamp similar to the one returned by performance.now()
     * indicating the point in time when requestAnimationFrame() starts to execute callback functions.
     *
     * @returns {undefined}
     */
    const animateLoop = async (timestamp: number) => {
      const isLimited = limit && count >= limit;

      if (isLimited) {
        return;
      }

      // calc elapsed time since last loop
      const elapsed = timestamp - delta;

      // if enough time has elapsed, draw the next frame

      if (elapsed > fpsInterval) {
        // Get ready for next frame by setting delta=timestamp, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        delta = timestamp - (elapsed % fpsInterval);
        count += 1;

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
    if (this.requestID) {
      this.runner.offRestart(this.requestID);
    }

    if (this.active) {
      this.requestID = this.runner.requestAnimationFrame(animationFunc);

      this.runner.whenRestarted(this.requestID, () => {
        this.cancelRequest();
        this.requestID = this.runner.requestAnimationFrame(animationFunc);
      });
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
      this.runner.offRestart(this.requestID);
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
