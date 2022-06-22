import { ExpandMoreRounded } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import React from 'react';
import { Basket } from '../../app/models/basket';
import { Product } from '../../app/models/product';

interface Props {
  product: Product;
  basket: Basket;
  setBasket: Function;
}

const ExpandMore = styled((props: any) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProductCard({ product, basket, setBasket }: Props) {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  function isProductInBasket() {
    return (
      basket.products.filter((basketProduct) => basketProduct.id === product.id)
        .length > 0
    );
  }

  function getProductInBasket() {
    return basket.products.filter(
      (basketProduct) => basketProduct.id === product.id,
    )[0];
  }

  function getOtherProducts() {
    return [
      ...basket.products.filter(
        (basketProduct) => basketProduct.id !== product.id,
      ),
    ];
  }

  function addProductToBasket() {
    if (isProductInBasket()) {
      setBasket({
        ...basket,
        products: [
          ...getOtherProducts(),
          { ...product, quantity: getProductInBasket().quantity + 1 },
        ],
      });
    } else {
      setBasket({
        ...basket,
        products: [...basket.products, { ...product, quantity: 1 }],
      });
    }
  }

  function removeProductFromBasket() {
    const basketProduct = getProductInBasket();
    if (!basketProduct) return;

    if (basketProduct.quantity > 1) {
      setBasket({
        ...basket,
        products: [
          ...getOtherProducts(),
          { ...product, quantity: basketProduct.quantity - 1 },
        ],
      });
    } else {
      setBasket({
        ...basket,
        products: getOtherProducts(),
      });
    }
  }

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: {
            fontWeight: 'bold',
            color: 'primary.main',
          },
        }}
      />
      <CardMedia
        sx={{
          height: 140,
          backgroundSize: 'contain',
          bgcolor: 'primary.light',
        }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color='secondary' variant='h5'>
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {product.brand} / {product.type}
        </Typography>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography>{product.description}</Typography>
          </CardContent>
        </Collapse>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <ExpandMore
          expand={expanded}
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label='show more'
          sx={{ margin: 'unset' }}
        >
          <ExpandMoreRounded />
        </ExpandMore>
        <Button size='small' onClick={addProductToBasket}>
          Add to basket
        </Button>
      </CardActions>
    </Card>
  );
}
