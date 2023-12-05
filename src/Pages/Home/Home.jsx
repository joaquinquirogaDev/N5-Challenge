import './Home.scss'
import { Cards } from "../../Components/Cards/Cards"
import useCart from "../../Hooks/useCart"


export const Home = () => {
    const { products } = useCart()
    return <div className="list_container">
        {products.map((item, key) => (
            <Cards item={item} key={key}/>
        ))}
    </div>
}