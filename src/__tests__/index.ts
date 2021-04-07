import RequestAnimation from '../index';

describe('RequestAnimation', () => {
  let requestAnimation: RequestAnimation;
  let mockFn: jest.Mock<any, any>;

  beforeEach(() => {
    jest.resetModules();
    requestAnimation = new RequestAnimation();
    mockFn = jest.fn();
    jest.useFakeTimers();
  });

  it('cancelRequest', () => {
    requestAnimation.request(mockFn);
    requestAnimation.cancelRequest();
    jest.runAllTimers();

    expect(mockFn).toHaveBeenCalledTimes(0);
  });

  it('request deactivate/activate', () => {
    expect(requestAnimation._active).toBe(true);

    requestAnimation.request(mockFn);
    jest.runAllTimers();

    expect(mockFn).toHaveBeenCalledTimes(1);

    requestAnimation.deactivate();
    requestAnimation.request(mockFn);
    jest.runAllTimers();

    expect(requestAnimation._active).toBe(false);
    expect(mockFn).toHaveBeenCalledTimes(1);

    requestAnimation.activate();

    requestAnimation.request(mockFn);
    jest.runAllTimers();

    expect(mockFn).toHaveBeenCalledTimes(2);
    expect(requestAnimation._active).toBe(true);
  });
});
