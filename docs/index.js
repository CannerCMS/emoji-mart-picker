/* eslint-disable no-console, require-jsdoc */
import React from 'react';
import ReactDOM from 'react-dom';
import EmojiMartPicker from '../src';

function onChange(emoji) {
  console.log(emoji);
}

ReactDOM.render(
  <EmojiMartPicker onChange={onChange}>
    <button>click me</button>
  </EmojiMartPicker>
, document.getElementById('root'));
