import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css';
import { store } from './store'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
