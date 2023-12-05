import './Cart.scss';
import useCart from "../../Hooks/useCart"
import { ProductCart } from './ProductCart/ProductCart';

export const Cart = ({ isOpenCart, setIsOpenCart }) => {
    const { cart, calculateTotalPrice, clearCart, removeFromCart } = useCart()

    const groupedCart = Object.values(cart.reduce((acc, product) => {
        acc[product.name] = acc[product.name] || { ...product, amount: 0 };
        acc[product.name].amount += product.amount;
        return acc;
    }, {}));

    const handleRemoveAllFromCart = (productId) => {
        removeFromCart(productId, true);
    };

    return <div className="cart_container open">
        <div className='cart_header'>
            <h3>Carrito</h3>
            <button
                onClick={() => setIsOpenCart(!isOpenCart)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
            </button>

        </div>
        {groupedCart.length > 0 ?
            <div className='cart_products'>
                {groupedCart.map((product, key) => (
                    <div key={key}>
                        <div className='cart_products_header'>
                            <p>{product?.name}</p>
                            <button 
                                onClick={() => handleRemoveAllFromCart(product?.id)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>

                        </div>
                        <ProductCart product={product}/>
                    </div>
                ))}
            </div> : <p>No hay productos en el carrito</p>
        }
        {groupedCart.length > 0 &&
            <div className='cart_final'>
                <p>Precio Final: </p>
                <p>{calculateTotalPrice()}</p>
            </div>
        }
        {groupedCart.length > 0 &&
            <div className='cart_button'>
                <button
                    onClick={() => clearCart()}
                >
                    Vaciar carrito
                </button>
            </div>
        }
    </div>
};
