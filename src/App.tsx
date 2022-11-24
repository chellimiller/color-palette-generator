import * as React from 'react';
import { Outlet, LoaderFunction, redirect } from 'react-router-dom';

export const loadApp: LoaderFunction = ({ request }) => {
  const pathname = new URL(request.url).pathname;
  if (!pathname || pathname === '/') {
    return redirect('/palettes');
  }

  return undefined;
};

const App: React.FC = () => {
  return (
    <div className="app">
      <Outlet />
    </div>
  );
};

export default App;
