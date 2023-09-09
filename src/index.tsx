import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css'
import reportWebVitals from './reportWebVitals';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import {createBrowserHistory } from 'history'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
      <App />
    </Provider>
);

reportWebVitals();
