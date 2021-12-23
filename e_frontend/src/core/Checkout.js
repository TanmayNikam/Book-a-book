import React, {useState,useEffect,Fragment} from 'react'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { getClientToken,processPayment} from './apiCore'
import DropIn from 'braintree-web-drop-in-react' 
import {emptyCart} from "./apiCore"
const Checkout = ({cartItems}) => {

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token
    
    const [data,setData] = useState({ 
        success:"",
        clientToken:null, 
        error:"",
        address:"",
        instance:{}
    })
    
    
    
    const getTotal = ()=> {
        return cartItems.reduce((acc,curr)=> acc+ curr.price*curr.count,0)
    }


    const getToken= ()=>{ 
        getClientToken(userId,token)
        .then(response=>{ 
            if(response.error){ 
                setData({...data,error: response.error})
            }
            else{ 
                // console.log(response.token.clientToken)
                setData({...data,clientToken:response.token.clientToken})
            }
        })
    }
    
    useEffect(()=>{ 
        getToken()
    },[])


    const buy = () =>{ 
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
        .then(data=>{ 
            nonce=data.nonce
            const paymentData ={
                paymentMethodNonce:nonce,
                amount: getTotal()
            }
            processPayment(userId,token,paymentData)
            .then(response=>{
                console.log(response)
                if(response.error){
                    setData({...data,error:response.error})
                }
                else{ 
                    setData({...data,success:response.result.success})
                    emptyCart(()=>{ 
                        console.log("Cart removed successfully")
                    })
                }
            })
            // .catch(error=>{
            //     console.log(error)
            //     // setData({...data,error:error})
            // })
        })
        .catch(error=>{ 
            console.log(error)
            setData({...data,error:error.message})
        })
    }


    const showError = ()=>(
        <div>
            {data.error && (
                <div className="alert alert-danger">
                    {data.error}
                </div>
            )}
        </div>
    )

    const showSuccess = ()=>(
        <div>
            {data.success && (
                <div className="alert alert-success">
                    Transaction successful
                </div>
            )}
        </div>
    )

    const showDropIn = ()=>(
        <div  onBlur={()=>(setData({...data,error:""}))}> 
            { (data.clientToken!==null && cartItems.length>0 && data.success==="")? (
                <Fragment>
                    <div>
                        <DropIn 
                            options={{
                                authorization:data.clientToken
                            }}
                            onInstance={instance=> data.instance =instance}
                        />
                    </div>
                    <button className="btn btn-success" onClick= {buy}>Checkout</button>
                </Fragment> 
                
            ):null}
        </div>
    )
    
    
    
    const checkout = ()=>{ 
        return (
          isAuthenticated() ? 
                (
                    <div >
                        {showError()}
                        {showSuccess()}
                        {showDropIn()}
                    </div>
                    
                ):
                (
                    <Link to="/signin">
                        <button className="btn btn-primary">
                            SignIn
                        </button>
                    </Link>
                )
            
        )
    }

    return(
        <div className="container-fluid" style={{"textAlign":"center"}}>
            <h3 className="card-header text-muted">Checkout</h3>
            <h5>Your total cart price is {getTotal()}</h5>
            {checkout()}
        </div>
    )
}

export default Checkout
