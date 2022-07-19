import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Products from "../ProductCard/ProductCard.jsx"
import "./ProductsCards.scss"




export default function ProductsCards() {
  
  let allProducts = useSelector((state) => state.products)
console.log("Todos los productos:", allProducts)
  return (
    <div className="Homepage">
      <div className="cardsContainer ">
        {allProducts?.map((product) => {
          return <Products
            key={product.id}
            name={product.name}
            // image={product.image}
            image = {product.image}
            
            price={product.price}
            description={product.description}
          />
        })}

      </div>


    </div>
  )
}