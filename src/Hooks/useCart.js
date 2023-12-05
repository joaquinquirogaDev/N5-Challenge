import { useContext } from 'react';
import { CartContext } from '../Provider/CartProvider';

const useCart = () => useContext(CartContext);

export default useCart;

