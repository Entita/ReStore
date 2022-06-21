import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import Catalog from '../../features/catalog/Catalog';
import Header from './Header';

export default function App() {
  const [darkMode, setDarkMode] = React.useState<boolean>(false);
  const palleteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: palleteType === 'light' ? '#eaeaea' : '#121212',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header setDarkMode={() => setDarkMode(!darkMode)} />
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
  );
}
