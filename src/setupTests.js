/* eslint-disable import/prefer-default-export */

export const REQUEST_ANIMATION_FRAME_TIMEOUT = 100;

global.requestAnimationFrame = (callback) =>
  setTimeout(() => callback(Date.now()), REQUEST_ANIMATION_FRAME_TIMEOUT);
global.cancelAnimationFrame = jest.fn((id) => clearTimeout(id));
