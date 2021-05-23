import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StoreProvider } from './Store'
import { BrowserRouter } from 'react-router-dom'
import HomePage from './HomePage'
import FavPage from './FavPage'

ReactDOM.render(

  <StoreProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreProvider>,
  document.getElementById('root')
);


