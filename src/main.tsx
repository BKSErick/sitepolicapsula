import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

import App from './App';
import './styles/index.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

const application = (
  <StrictMode>
    <App />
  </StrictMode>
);

/**
 * hasChildNodes() dava true para o placeholder <!--app-html--> do index.html,
 * porque nó de comentário conta como filho. firstElementChild só existe quando
 * há markup real pré-renderizado, que é a única situação em que hidratar faz
 * sentido.
 */
if (root.firstElementChild) {
  hydrateRoot(root, application);
} else {
  createRoot(root).render(application);
}
