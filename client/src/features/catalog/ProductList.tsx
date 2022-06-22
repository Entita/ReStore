import { Grid } from '@mui/material';
import { Basket } from '../../app/models/basket';
import { Product } from '../../app/models/product';
import ProductCard from './ProductCard';

interface Props {
  products: Product[];
  basket: Basket;
  setBasket: Function;
}

export default function ProductList({ products, basket, setBasket }: Props) {
  return (
    <Grid container spacing={4}>
      {products.map((product: Product) => (
        <Grid item xs={3} key={product.id}>
          <ProductCard
            product={product}
            basket={basket}
            setBasket={setBasket}
          />
        </Grid>
      ))}
    </Grid>
  );
}
