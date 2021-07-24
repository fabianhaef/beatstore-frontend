import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import './index.css';
import App from './App';
import {GlobalStyles} from './global-styles'


ReactDOM.render(
  <Provider store={store}>
    <GlobalStyles />
    <App />
  </Provider>
  ,
  document.getElementById('root')
);