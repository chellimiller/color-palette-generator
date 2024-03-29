import * as React from 'react';
import { Outlet, LoaderFunction, redirect } from 'react-router-dom';
import ColorList from './ui/ColorList';

export const loadApp: LoaderFunction = ({ request }) => {
  const pathname = new URL(request.url).pathname;
  if (!pathname || pathname === '/') {
    return redirect('/palettes');
  }

  return undefined;
};

const App: React.FC = () => {
  return (
    <div id="app">
      <header>
        <h1>Color Palette Generator</h1>
      </header>
      <main>
        <ColorList />
      </main>
    </div>
  );
};

export default App;
