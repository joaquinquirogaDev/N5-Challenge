import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartProvider from '../Provider/CartProvider';
import useCart from '../Hooks/useCart'


test('addToCart agrega un producto al carrito', () => {
  const TestComponent = () => {
    const { addToCart } = useCart();

    return (
      <div>
        <button onClick={() => addToCart({ id: 1, name: 'Pomelo', price: 10, amount: 1 })}>
          Agregar al carrito
        </button>
      </div>
    );
  };

  render(
    <CartProvider>
      <TestComponent />
    </CartProvider>
  );

  const addToCartButton = screen.getByText('Agregar al carrito');
  userEvent.click(addToCartButton);

});


