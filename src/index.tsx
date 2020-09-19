import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { AppStateProvider } from "./AppStateContext"
import App from './App';

ReactDOM.render(
  <AppStateProvider>
    <App />
  </AppStateProvider>,
  document.getElementById('root')
);
