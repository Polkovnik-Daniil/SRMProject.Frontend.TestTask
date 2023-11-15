import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ContactStore from "./store/ContactStore";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        contact: new ContactStore(),
      }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>
);
