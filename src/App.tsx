import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import { LoaderFunction, redirect } from 'react-router-dom';
import { useNeutralColor } from './state';
import ColorPanel from './container/ColorPanel/ColorPanel';

export const loadApp: LoaderFunction = ({ request }) => {
  const pathname = new URL(request.url).pathname;
  if (!pathname || pathname === '/') {
    return redirect('/palettes');
  }

  return undefined;
};

const App: React.FC = () => {
  const neutral = useNeutralColor();

  return (
    <div id="app" className="app">
      <AppBar
        className="app__header"
        component="header"
        position="relative"
        sx={{ margin: 0 }}
      >
        <Toolbar>
          <Typography variant="h5" component="span">
            Color Palette Generator
          </Typography>
        </Toolbar>
      </AppBar>
      <Container
        className="app__content"
        component="main"
        sx={{ paddingTop: '2rem' }}
      >
        <ColorPanel color={neutral} />
      </Container>
    </div>
  );
};

export default App;
