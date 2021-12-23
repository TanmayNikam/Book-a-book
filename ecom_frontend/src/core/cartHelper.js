export const addItemCart = (item,cb)=> { 
    let cart=[]
    if(typeof(window) !== 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
            if(!cart.some((el)=>el._id === item._id)){
                cart.push({...item,count:1})
                localStorage.setItem('cart',JSON.stringify(cart)) 
            }
        }
        else{ 
            localStorage.setItem('cart',JSON.stringify([{...item, count:1}]))
        }
    }
    cb()
}


export const itemCount = () => {
    if(typeof window !== 'undefined'){ 
        if(localStorage.getItem('cart'))
        if(JSON.parse(localStorage.getItem('cart')).length>0)
            return JSON.parse(localStorage.getItem('cart')).length
    }
    return 0;
}

export const getCartProducts = ()=>{ 
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart'))
            {
                return JSON.parse(localStorage.getItem('cart'))
            }      
    }
    return []
}

export const removeCartItem = (item)=>{ 
    let cart=[]
    if(typeof window !== 'undefined'){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart")) 
            let prod = cart.find(el=> el._id === item._id)
            cart.splice(prod,1)
            localStorage.setItem("cart",JSON.stringify(cart))  
        }
    }
    return cart
}

export const updateCount = (val,item)=>{
    let cart=[]
    if(typeof window !== 'undefined'){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart")) 
            cart.find(el=> el._id === item._id).count = val
            localStorage.setItem('cart',JSON.stringify(cart))
        }
    }
}
