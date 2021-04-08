// @ts-ignore
import raf from 'raf';

const createRunner = (backgroundThrottling: boolean = true) => {
  const requestAnimationFrame = (callback: FrameRequestCallback): number => {
    if (backgroundThrottling) {
      return window.requestAnimationFrame(callback);
    }

    return raf(callback);
  };

  const cancelAnimationFrame = (handle: number): void => {
    if (backgroundThrottling) {
      window.cancelAnimationFrame(handle);
    } else {
      raf.cancel(handle);
    }
  };

  return { requestAnimationFrame, cancelAnimationFrame };
};

export default createRunner;
