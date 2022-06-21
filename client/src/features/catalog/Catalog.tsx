import axios from 'axios';
import React from 'react';
import { Product } from '../../app/models/product';
import ProductList from './ProductList';

export default function Catalog() {
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
      <ProductList products={products} />
    </>
  );
}
