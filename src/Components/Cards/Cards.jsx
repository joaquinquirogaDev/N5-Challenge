import './Cards.scss'
import useCart from '../../Hooks/useCart'

export const Cards = ({ item }) => {
    const {addToCart} = useCart()

    const handleAdd = () => {
        // item.amount === 0 ? 
        addToCart(item)
    }
    return <div className="card_container">
        <div className='card_header'>
            <h1>{item?.name}</h1>
        </div>
        <div className='card_items'>
            <p>Precio: </p>
            <p>${item?.price}</p>
        </div>
        <div className='card_items'>
            <p>Cantidad: </p>
            <p>{item?.amount === 0 ? 'Sin stock' : item?.amount}</p>
        </div>
        <div className='card_button'>
            <button
                disabled={item.amount === 0}
                onClick={handleAdd}
            >
                Sumar al carrito
            </button>
        </div>
    </div>
}