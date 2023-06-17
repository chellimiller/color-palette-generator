import {
  AppBar,
  IconButton,
  Container,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  Stack,
  Box,
} from '@mui/material';
import * as React from 'react';
import { LoaderFunction, redirect } from 'react-router-dom';
import { useNeutralColor } from './state';
import ColorPanel from './container/ColorPanel';
import { ColorMode } from './types';
import { Moon as MoonIcon, Sun as SunIcon } from 'react-feather';

export const loadApp: LoaderFunction = ({ request }) => {
  const pathname = new URL(request.url).pathname;
  if (!pathname || pathname === '/') {
    return redirect('/palettes');
  }

  return undefined;
};

const lightTheme = createTheme({ palette: { mode: 'light' } });
const darkTheme = createTheme({ palette: { mode: 'dark' } });

const App: React.FC = () => {
  const [mode, setMode] = React.useState<ColorMode>('light');
  const neutral = useNeutralColor();

  return (
    <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
      <Box
        id="app"
        className="app"
        sx={{ backgroundColor: 'background.default' }}
      >
        <AppBar
          className="app__header"
          component="header"
          position="relative"
          sx={{ margin: 0 }}
        >
          <Toolbar
            component={Stack}
            direction="row"
            justifyContent="space-between"
          >
            <Typography variant="h5" component="span">
              Color Palette Generator
            </Typography>
            <IconButton
              onClick={() =>
                setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
              }
              color="inherit"
            >
              {mode === 'light' ? <MoonIcon /> : <SunIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container
          className="app__content"
          component="main"
          sx={{ paddingTop: '2rem' }}
        >
          <ColorPanel color={neutral} />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
