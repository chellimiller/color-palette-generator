import * as React from 'react';
import { createRoot } from 'react-dom/client';

import '@picocss/pico';
import './styles.css';
import registerServiceWorker from './registerServiceWorker';

import App, { loadApp } from './App';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import PaletteView from './view/PaletteView';
import PaletteSelectView from './view/PaletteSelectView';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    loader: loadApp,
    children: [
      {
        path: 'palettes',
        element: <PaletteSelectView />,
        children: [
          {
            path: ':paletteId',
            element: <PaletteView />,
          },
        ],
      },
    ],
  },
]);

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<RouterProvider router={router} />);

window.addEventListener('load', registerServiceWorker);
