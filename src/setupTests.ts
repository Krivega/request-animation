/* eslint-disable import/prefer-default-export */

export const REQUEST_ANIMATION_FRAME_TIMEOUT = 100;

global.requestAnimationFrame = (callback) => {
  const id: number = +setTimeout(() => {
    return callback(Date.now());
  }, REQUEST_ANIMATION_FRAME_TIMEOUT);

  return id;
};

global.cancelAnimationFrame = jest.fn((id) => {
  return clearTimeout(id);
});
