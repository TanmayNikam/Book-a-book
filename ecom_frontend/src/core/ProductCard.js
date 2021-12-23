import React,{Fragment, useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import ProductImage from './ProductImage'
import { addItemCart, removeCartItem, updateCount} from './cartHelper'


const ProductCard = ({product,classname,cartButton,run=undefined,setRun}) => {

    
    const [redirect,setRedirect] = useState(false)

    const redirectUser = ()=>{ 
        if(redirect)  return <Redirect to="/cart" />
    }

    const addToCart = ()=>{ 
        addItemCart(product,()=>{
            setRedirect(true)
        })
    }

    const removeFromCart= ()=>{
        removeCartItem(product)
        setRun(!run)
    }

    const changeQuantity =(event)=>{
        setRun(!run)
        let val = event.target.name==="add" ? product.count+1  : (product.count > 1 ? product.count-1 : 1)
        updateCount(val,product)
    }

    const showAddToCartButton = ()=>(
        <button onClick={addToCart} className="btn btn-outline-primary m-2">
            Add to cart
        </button>
    )

    const showRemoveFromCartButton = () =>(
        <button  onClick={removeFromCart} className="btn btn-outline-danger m-2">
            Remove from cart
        </button>
    )

    const cartItemQuantitiy= ()=>(
        <Fragment>
          <div style={{"display":"flex","margin":"auto","border":"0.5px dashed grey"}}>
                <div className="m-1"><button className="btn btn-sm btn-danger" onClick={changeQuantity} name="sub">-</button></div>   
                <div className="m-1"><h6>{product.count}</h6></div>
                <div className="m-1"><button className="btn btn-sm btn-success" onClick={changeQuantity} name="add">+</button></div>
                </div>
        </Fragment>
        
    )

    return (
        <div className={classname}>
                <div className="card">  
                <div className="card-header" style={{"textAlign":"center"}}>{product.name}</div>
                <div className="body" style={{"textAlign":"center"}}>
                    {redirectUser()}
                    <ProductImage product={product} style={{ width: "90%", height: "15vw" , objectFit: "scale-down"}}/>
                    <p>{product.description.substring(0,100)}</p>
                    <p>${product.price}</p>

                </div>

                {!cartButton && cartItemQuantitiy()}

                <div style={{"display":"inline-block","textAlign":"center"}}>
                    <Link to={`/product/${product._id}`}>
                    <button className="btn btn-outline-success m-2">
                        View Product
                    </button>
                    </Link>
                    {cartButton && showAddToCartButton() }
                    {!cartButton && showRemoveFromCartButton() }
                </div>

                </div>
        </div>
    )
}

export default ProductCard
