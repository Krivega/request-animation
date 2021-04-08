// @ts-ignore
import { request, cancelRequest } from './requestTimeout';

let isAvailableAnimation = !document.hidden;

const createRunner = (backgroundThrottling: boolean = true) => {
  const hasAvailableAnimation = () => backgroundThrottling || isAvailableAnimation;
  const restartHandlers = new Map<number, () => void>();
  const whenRestarted = (handle: number, callback: () => void) => {
    restartHandlers.set(handle, callback);
  };
  const offRestart = (handle: number) => {
    restartHandlers.delete(handle);
  };

  const requestAnimationFrame = (callback: FrameRequestCallback): number => {
    if (hasAvailableAnimation()) {
      return window.requestAnimationFrame(callback);
    }

    return request(callback);
  };

  const cancelAnimationFrame = (handle: number): void => {
    window.cancelAnimationFrame(handle);
    cancelRequest(handle);
  };

  document.addEventListener('visibilitychange', () => {
    isAvailableAnimation = !document.hidden;

    if (!hasAvailableAnimation()) {
      restartHandlers.forEach((callback, key) => {
        callback();
        offRestart(key);
      });
    }
  });

  return { requestAnimationFrame, cancelAnimationFrame, whenRestarted, offRestart };
};

export default createRunner;
