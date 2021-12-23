import React,{useState,useEffect} from 'react'
import { getCartProducts} from './cartHelper'
import { Link} from 'react-router-dom'
import ProductCard from './ProductCard'
import Checkout from './Checkout'

const Cart = () => {

    const [cartItems,setCartItems] = useState([])
    const [run,setRun] = useState(false)

    useEffect(()=>{ 
        setCartItems(getCartProducts())
    },[run])
    

    return (
        <div className="conatiner-fluid">
            {cartItems.length!==0? 
            (  
                <div className="row" style={{"display":"flex"}}>
                    <div className="col-8">
                        <center>
                            <h3 className="text-muted card-header">Cart Items</h3>
                        </center>
                        <div className="row">
                            {cartItems.map((e,i)=>(
                                    <ProductCard product={e} key={i} classname="col-3  m-4" 
                                        cartButton={false} 
                                        run={run} 
                                        setRun={setRun}
                                    />
                                ))}
                        </div>
                    </div> 
                    <div className="col-4">
                        <Checkout cartItems={cartItems}/>
                    </div>
                
                </div>
            ) : 
            (
                <div>
                    <center>
                        <h3 className="text-muted">Nothing to show here... ☹</h3>
                        <br/> 
                        <h6>Continue to <Link to="/shop">shop</Link></h6>
                        </center>       
                </div>
            )}
        </div>
    )
}

export default Cart
