// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa createRoot desde "react-dom/client"
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import App from './App';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/',
  cache: new InMemoryCache(),
});

const rootElement = document.getElementById('root');

// Utiliza createRoot en lugar de ReactDOM.render
const root = createRoot(rootElement);

// Renderiza la aplicación dentro de createRoot
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
