// @ts-ignore
import raf from 'raf';

let isAvailableAnimation = !document.hidden;

document.addEventListener('visibilitychange', () => {
  isAvailableAnimation = !document.hidden;
});

const createRunner = (backgroundThrottling: boolean = true) => {
  const requestAnimationFrame = (callback: FrameRequestCallback): number => {
    if (backgroundThrottling || isAvailableAnimation) {
      return window.requestAnimationFrame(callback);
    }

    return raf(callback);
  };

  const cancelAnimationFrame = (handle: number): void => {
    window.cancelAnimationFrame(handle);
    raf.cancel(handle);
  };

  return { requestAnimationFrame, cancelAnimationFrame };
};

export default createRunner;
