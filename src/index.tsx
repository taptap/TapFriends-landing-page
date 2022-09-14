import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'virtual:windi.css';

import './i18n';
import App from './App';
import './index.css';

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
