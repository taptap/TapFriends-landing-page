import { StrictMode } from 'react';
import { render } from 'react-dom';
import 'virtual:windi.css';

import App from './App';
import './index.css';

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('app')
);
