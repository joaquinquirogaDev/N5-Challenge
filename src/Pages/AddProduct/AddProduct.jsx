import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { Toaster, toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid';

//Style
import './AddProduct.scss'

import useCart from '../../Hooks/useCart';


export const AddProduct = () => {

    const navigate = useNavigate()

    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const { Update, products } = useCart();

    
    const onSubmit = (data) => {
        const existingProduct = products.find(product => product.name === data.name);
        if (existingProduct) {
            toast('Este producto ya existe!')
            return;
        }

        const newProduct = {
            id: uuidv4(),
            name: data.name,
            price: parseFloat(data.price),
            amount: parseInt(data.amount),
        };

        Update([...products, newProduct]);
        sessionStorage.setItem('Products', JSON.stringify([...products, newProduct]));
        reset();
        toast('Producto agregado con exito!', {
            action: {
                label: 'Aceptar',
                onClick: () => navigate('/')
            },
        })
    };

    return <div className='add_container'>
        <h2>Agregar producto</h2>
        <div className='add_container_inputs'>
            <div className='add_input'>
                <label htmlFor="">* Nombre del producto</label>
                <input
                    type="text"
                    placeholder='Ingrese nombre del producto'
                    {...register("name", { required: true })}
                />
                {errors.name && <span>El nombre es requerido</span>}
            </div>
            <div className='add_input'>
                <label htmlFor="">* Precio del producto</label>
                <input
                    type="number"
                    placeholder='Ingrese precio del producto'
                    {...register("price", { required: true })}
                />
                {errors.price && <span>El precio es requerido</span>}
            </div>
            <div className='add_input'>
                <label htmlFor="">* Cantidad del producto</label>
                <input
                    type="number"
                    placeholder='Ingrese cantidad del producto'
                    {...register("amount", { required: true })}
                />
                {errors.amount && <span>La cantidad es requerida</span>}
            </div>
            <div className='add_container_buttons'>
                <button
                    onClick={() => navigate(-1)}
                >
                    Volver
                </button>
                <button
                    onClick={handleSubmit(onSubmit)}
                >
                    Guardar
                </button>
            </div>
        </div>
        <Toaster />
    </div>
}   