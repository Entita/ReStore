import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import Catalog from '../../features/catalog/Catalog';
import Header from './Header';
import { Route, Routes } from 'react-router-dom';
import BasketPage from './BasketPage';
import { Basket } from '../models/basket';
import ReRoute from './ReRoute';
import ContactPage from './ContactPage';

const basketInitialization = {
  products: [],
  price: 0,
};

const themeInitialization = localStorage.getItem('darkMode') === 'true';

export default function App() {
  const [darkMode, setDarkMode] = React.useState<boolean>(themeInitialization);
  const [basket, setBasket] = React.useState<Basket>(basketInitialization);
  const palleteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: palleteType === 'light' ? '#eaeaea' : '#121212',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          body {
            overflow-y: scroll;
          }
        `,
      },
    },
  });

  function changeDarkMode() {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', String(!darkMode));
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header basket={basket} setDarkMode={changeDarkMode} />
      <Container>
        <Routes>
          <Route path='/' element={<ReRoute />} />
          <Route
            path='/catalog'
            element={<Catalog basket={basket} setBasket={setBasket} />}
          />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/basket' element={<BasketPage basket={basket} />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}
