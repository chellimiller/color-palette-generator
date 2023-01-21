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
    <div id="app">
      <header className="flex-row-wrap flex-justify-space-between  flex-align-items-center">
        <h1>Color Palette Generator</h1>
        <form className="flex-row-nowrap flex-align-items-center">
          <label htmlFor="selectColorPalette" className="text-nowrap ">
            Palette:
          </label>
          <select id="selectColorPalette" placeholder="Select Palette">
            <option value="0-13">0-13</option>
            <option value="14-17">14-17</option>
            <option value="18-23">18-23</option>
            <option value="24+">24+</option>
          </select>
        </form>
      </header>
      <Outlet />
    </div>
  );
};

export default App;
