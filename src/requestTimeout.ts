let last = 0;
let id = 0;
const queue: {
  handle: number;
  callback: FrameRequestCallback;
  cancelled: boolean;
}[] = [];
const frameDuration = 1000 / 60;

export const request = (callback: FrameRequestCallback) => {
  if (queue.length === 0) {
    const time = performance.now();
    const next = Math.max(0, frameDuration - (time - last));

    last = next + time;
    setTimeout(() => {
      const cp = queue.slice(0);

      // Clear queue here to prevent
      // callbacks from appending listeners
      // to the current frame's queue
      queue.length = 0;

      for (let i = 0; i < cp.length; i++) {
        if (!cp[i].cancelled) {
          try {
            cp[i].callback(last);
          } catch (e) {
            setTimeout(() => {
              throw e;
            }, 0);
          }
        }
      }
    }, Math.round(next));
  }

  id += 1;
  queue.push({
    handle: id,
    cancelled: false,
    callback,
  });

  return id;
};

export const cancelRequest = (handle: number) => {
  for (let i = 0; i < queue.length; i++) {
    if (queue[i].handle === handle) {
      queue[i].cancelled = true;
    }
  }
};
