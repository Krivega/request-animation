# request-animation

[![npm](https://img.shields.io/npm/v/request-animation?style=flat-square)](https://www.npmjs.com/package/request-animation)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/request-animation?style=flat-square)

Class for run loop animation with RAF

## Install

npm

```sh
npm install request-animation
```

yarn

```sh
yarn add request-animation
```

## Usage

```js
import RequestAnimation from 'request-animation';

const requestAnimation = new RequestAnimation();

requestAnimation.activate();
requestAnimation.run(() => {
  // some logic
});
```

## API

### requestAnimation.deactivate()

Disable call requests.

```js
requestAnimation.deactivate();
requestAnimation.run(() => {
  // some logic
}); // no effect

requestAnimation.activate();
requestAnimation.run(() => {
  // some logic
}); // handler is called
```

### requestAnimation.activate()

Enable call requests.

```js
requestAnimation.deactivate();
requestAnimation.run(() => {
  // some logic
}); // no effect

requestAnimation.activate();
requestAnimation.run(() => {
  // some logic
}); // handler is called
```

### requestAnimation.run

Resolve the animation loop calculates time elapsed since the last loop and only draws if your specified fps interval is achieved.

- @param {function} animationFunc - Function for animation
- @param {string} fps - Frames per Second

- @returns {undefined}

```js
requestAnimation.run(() => {
  // some logic
});
```

### requestAnimation.request

Request single call.

- @param {function} animationFunc - Function for animation

- @returns {undefined}

```js
requestAnimation.request(() => {
  // some logic
});
```

### requestAnimation.cancelRequest

Cancel current request.

- @returns {undefined}

```js
requestAnimation.cancelRequest();
```

## Run tests

```sh
npm test
```

## Maintainer

**Krivega Dmitriy**

- Website: https://krivega.com
- Github: [@Krivega](https://github.com/Krivega)

## Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/Krivega/request-animation/issues). You can also take a look at the [contributing guide](https://github.com/Krivega/request-animation/blob/master/CONTRIBUTING.md).

## 📝 License

Copyright © 2020 [Krivega Dmitriy](https://github.com/Krivega).<br />
This project is [MIT](https://github.com/Krivega/request-animation/blob/master/LICENSE) licensed.
