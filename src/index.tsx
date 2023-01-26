import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import '@picocss/pico';
import './styles.css';
import registerServiceWorker from './registerServiceWorker';

import App from './App';

const container = document.getElementById('app');

// @ts-expect-error
const root = ReactDOM.createRoot(container);
root.render(<App />);

window.addEventListener('load', registerServiceWorker);
