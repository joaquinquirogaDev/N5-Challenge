import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartProvider from '../Provider/CartProvider';
import useCart from '../Hooks/useCart'

test('removeFromCart elimina completamente un producto del carrito', () => {
    const TestComponent = () => {
      const { removeFromCart } = useCart();
  
      return (
        <div>
          <button onClick={() => removeFromCart(1)}>
            Eliminar del carrito
          </button>
        </div>
      );
    };
  
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
  
    const removeFromCartButton = screen.getByText('Eliminar del carrito');
  
    userEvent.click(removeFromCartButton);
  
  });