import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { setupListeners } from '@reduxjs/toolkit/query'
import App from './App'
import { setupStore } from './app/store'
import './index.css'

const store = setupStore();
setupListeners(store.dispatch)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
