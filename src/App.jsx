import useCart from './Hooks/useCart'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home/Home'
import Footer from './Components/Footer/Footer';
import { Header } from './Components/Header/Header';
import { AddProduct } from './Pages/AddProduct/AddProduct';

function App() {

  const { cart } = useCart()

  return <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/addProduct" element={<AddProduct />} />
    </Routes>
    <Footer/>
  </Router>
}

export default App
