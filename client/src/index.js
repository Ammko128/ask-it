import React from 'react';
import './index.scss';
import App from './App';
import { render } from 'react-dom';

/*
  This is not how you would use react-dom in React 18, but the WYSIWYG component
  doesn't work properly with the standard way of using react-dom in React 18
  Reference: https://stackoverflow.com/a/71893128
*/

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
