# emoji-mart-picker [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> emoji picker based on emoji-mart (https://github.com/missive/emoji-mart/)

## Installation

```sh
$ npm install --save emoji-mart-picker
```

## Usage

```js
var emojiMartPicker = require('emoji-mart-picker');

function onChange(emoji) {
  console.log(emoji);
}

ReactDOM.render(
  <EmojiMartPicker onChange={onChange}>
    <button>click me</button>
  </EmojiMartPicker>
, document.getElementById('root'));
```

## Start example server

```
node devServer.js
```

## License

MIT © [Canner](http://github.com/canner)


[npm-image]: https://badge.fury.io/js/emoji-mart-picker.svg
[npm-url]: https://npmjs.org/package/emoji-mart-picker
[travis-image]: https://travis-ci.org/Canner/emoji-mart-picker.svg?branch=master
[travis-url]: https://travis-ci.org/Canner/emoji-mart-picker
[daviddm-image]: https://david-dm.org/Canner/emoji-mart-picker.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Canner/emoji-mart-picker
