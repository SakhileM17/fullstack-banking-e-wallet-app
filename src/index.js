import React from 'react';
import AppRouter from './router/AppRouter';
import { Provider } from 'react-redux';
import store from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
  
import './css/main.scss';



import { createRoot } from 'react-dom/client';


const rootElement = document.getElementById('root');

createRoot(rootElement).render(

  <Provider store={store}>

    <AppRouter />
    
  </Provider>

);