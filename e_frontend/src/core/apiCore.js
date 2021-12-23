import { API } from "../config.js";


export const getProducts=(sortBy)=>{ 
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`,{
        method:"GET"
    }).then(response=>{
        return response.json()
    })
    .catch(err=>{ 
        console.log(err)
    })
}

export const getCategories=()=>{ 
    return fetch(`${API}/categories`,{
        method:"GET"
    }).then(response=>{
        return response.json()
    })
    .catch(err=>{ 
        console.log(err)
    })
}

export const getProductById=(productId)=>{ 
  return fetch(`${API}/product/${productId}`,{
      method:"GET"
  }).then(response=>{
      return response.json()
  })
  .catch(err=>{ 
      console.log(err)
  })
}

export const getFilteredProducts = (filters={},skip,limit) => {
    // console.log({filters,skip,limit})
    return fetch(`${API}/products/by/search`, {
      method: "POST",
      headers: {
        Accept: "applcation/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({filters,skip,limit}),
    })
      .then((response) => {
        //  console.log(response)
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  export const getRelatedProducts=(productId)=>{ 
    return fetch(`${API}/products/related/${productId}`,{
        method:"GET"
    }).then(response=>{
        return response.json()
    })
    .catch(err=>{ 
        console.log(err)
    })
  }

  export const getClientToken = (userId,token) => {
    // console.log({filters,skip,limit})
    return fetch(`${API}/payment/getToken/${userId}`, {
      method: "GET",
      headers: {
        Accept: "applcation/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        //  console.log("response"response)
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };
 

  export const processPayment = (userId,token, paymentData) => {
    // console.log({filters,skip,limit})
    return fetch(`${API}/payment/process/${userId}`, {
      method: "POST",
      headers: {
        Accept: "applcation/json",
        "Content-Type": "application/json",
        Authorization:`Bearer ${token}`
      },
      body: JSON.stringify(paymentData),
    })
      .then((response) => {
         console.log("response",response)
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  export const emptyCart = (next)=>{ 
    if(typeof window !== undefined){
      localStorage.removeItem('cart')
    }
    next()
  }