import { ShoppingCart } from '@mui/icons-material';
import {
  AppBar,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Basket } from '../models/basket';

interface Props {
  setDarkMode: Function;
  basket: Basket;
}

const midLinks = [
  { title: 'catalog', path: '/catalog' },
  { title: 'contact', path: '/contact' },
];

const navStyles = {
  color: 'inherit',
  typography: 'h6',
  '&:hover': { filter: 'brightness(.75)' },
  '&.active': { filter: 'brightness(.5)' },
};

export default function Header({ basket, setDarkMode }: Props) {
  const HeaderRef = React.useRef(null);

  function getQuantityOfProducts() {
    let quantity = 0;
    basket.products.forEach((product) => {
      quantity += product.quantity;
    });

    return quantity;
  }

  return (
    <AppBar position='static' sx={{ mb: 4 }} ref={HeaderRef}>
      <Toolbar>
        <Typography variant='h6'>RE-STORE</Typography>
        <Switch onChange={() => setDarkMode()} />
        <List
          sx={{
            display: 'flex',
            margin: 'auto',
            position: 'unset',
            paddingRight: '55px',
          }}
        >
          {midLinks.map(({ title, path }): any => (
            <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
              {title.toUpperCase()}
            </ListItem>
          ))}
          <ListItem
            component={NavLink}
            to='/basket'
            sx={{
              ...navStyles,
              position: 'absolute',
              width: 'fit-content',
              top: '12px',
              right: 0,
            }}
          >
            <div
              style={{
                display: 'flex',
                position: 'relative',
                marginLeft: 'auto',
                cursor: 'pointer',
              }}
            >
              {basket.products.length > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    background: 'green',
                    border: '1px solid white',
                    borderRadius: '50%',
                    width: '1.3rem',
                    height: '1.3rem',
                    top: '-8px',
                    right: '-8px',
                    zIndex: 1,
                    textAlign: 'center',
                    fontSize: '14px',
                    lineHeight: '20px',
                    // color: 'white',
                  }}
                >
                  <span>{getQuantityOfProducts()}</span>
                </div>
              )}
              <ShoppingCart />
            </div>
          </ListItem>
        </List>
      </Toolbar>
    </AppBar>
  );
}
