import React, { createContext, useState, useEffect } from 'react';
import { Data } from '../Data/Data';

export const CartContext = createContext();

const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = sessionStorage.getItem('Products');
    const parsedProducts = storedProducts ? JSON.parse(storedProducts) : Data.products;
    setProducts(parsedProducts);

    const storedCartString = sessionStorage.getItem('Cart');
    const storedCart = JSON.parse(storedCartString) ?? [];
    setCart(storedCart);
  }, []);

  const addToCart = (product) => {
    const existingProduct = cart.find((p) => String(p.id) === String(product.id));
    const updatedProducts = products.map((p) =>
      String(p.id) === String(product.id) ? { ...p, amount: p.amount - 1 } : p
    );
    if (existingProduct) {
      const updatedCart = cart.map((p) =>
        String(p.id) === String(product.id) ? { ...p, amount: p.amount + 1 } : p
      );
      setCart(updatedCart);
      Update(updatedProducts, updatedCart);
    } else {
      const updatedCart = [...cart, { ...product, amount: 1 }];
      setCart(updatedCart);
      Update(updatedProducts, updatedCart);
    }
  };


  const removeFromCart = (productId, removeAll = false) => {
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex(product => String(product.id) === String(productId));
    if (existingProductIndex !== -1) {
      if (removeAll || updatedCart[existingProductIndex].amount <= 1) {
        updatedCart.splice(existingProductIndex, 1);
      } else {
        updatedCart[existingProductIndex].amount--;
      }
      setCart(updatedCart);
      Update(products, updatedCart);
    }
  }


  const calculateTotalPrice = () => {
    return cart.reduce((acc, product) => {
      return acc + product.amount * product.price;
    }, 0);
  };

  const clearCart = () => {
    //Aclaracion: - Se vacia el carrito y vuelven los productos a stock.
    //            - Se elimina el producto del stock cuando no hay.
    //            - Con mas tiempo me gustaria poder validar mas cosas como estas!

    setCart([]);
    Update(products, []);
  };

  const Update = (newProducts, newCart) => {
    if (newProducts !== undefined) {
      setProducts(newProducts);
      sessionStorage.setItem('Products', JSON.stringify(newProducts));
    }

    if (newCart !== undefined) {
      setCart(newCart);
      sessionStorage.setItem('Cart', JSON.stringify(newCart));
    }
  };




  const contextValue = {
    products,
    cart,
    Update,
    removeFromCart,
    addToCart,
    clearCart,
    calculateTotalPrice
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
