import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

const indicator = document.getElementById('loading-indicator')
if (indicator) {
  indicator.classList.add('d-none')
}
