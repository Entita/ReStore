import { Basket } from '../models/basket';

interface Props {
  basket: Basket;
}

export default function BasketPage({ basket }: Props) {
  function getTotalPrice() {
    let totalPrice = 0;
    basket.products.forEach((product) => {
      totalPrice += product.price * product.quantity;
    });

    return (totalPrice / 100).toFixed(2);
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {basket.products.map((product) => (
          <span key={product.id}>
            {product.name} | {product.quantity} |{' '}
            {((product.price * product.quantity) / 100).toFixed(2)}$
          </span>
        ))}
      </div>
      <hr />
      Total price: {getTotalPrice()}$
    </>
  );
}
