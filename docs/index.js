/* eslint-disable no-console, require-jsdoc */
import React from 'react';
import ReactDOM from 'react-dom';
import EmojiMartPicker from '../src';

function onChange(emoji) {
  console.log(emoji);
}

ReactDOM.render(
  <div style={{margin: 100}}>
    <EmojiMartPicker onChange={onChange}>
      <button>click me</button>
    </EmojiMartPicker>
  </div>
, document.getElementById('root'));
