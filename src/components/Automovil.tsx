import { useCartStore } from "../store/zustandStore"
import { Automovil as AutomovilType } from "../types"

type AutomovilProps = { automovil: AutomovilType}

export default function Automovil({automovil} : AutomovilProps) {

    const { addToCart } =useCartStore()

    const { name, image, brand, price, topSpeed, year } = automovil

  return (
    <div className="col-md-8 col-lg-4 my-4 row align-items-center mx-auto">        
                <div className="col-10 row align-items-center mx-auto">
                <img 
                    className="img-fluid" 
                    src={`./img/${image}.jpg`} 
                    alt={`Imagen de ${name}`} 
                />  
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p><strong>{brand}</strong></p>
                <p><strong>Máxima velocidad</strong> {topSpeed}</p>
                <p><strong>Año</strong> {year}</p>
                <p className="fw-black text-primary fs-3">U$S - {price.toLocaleString()}</p> 
                <button
                    type="button"
                    className="btn btn-dark w-100"
                    onClick={() => addToCart(automovil)}
                    >Agregar al Carrito</button>
                </div>
            </div>
  )
}
