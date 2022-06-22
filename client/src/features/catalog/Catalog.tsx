import axios from 'axios';
import React from 'react';
import { Basket } from '../../app/models/basket';
import { Product } from '../../app/models/product';
import ProductList from './ProductList';

interface Props {
  basket: Basket;
  setBasket: Function;
}

export default function Catalog({ basket, setBasket }: Props) {
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    axios
      .get('http://localhost:5000/api/Products')
      .then((response) => setProducts(response.data))
      .catch((error) =>
        console.error('There was an error fetching data', error),
      );
  }, []);

  return (
    <>
      <ProductList products={products} basket={basket} setBasket={setBasket} />
    </>
  );
}
