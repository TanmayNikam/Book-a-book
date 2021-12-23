import { API } from "../config.js";

export const createCategory = (userId,category,token) => {
    return fetch(`${API}/category/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "applcation/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(category),
    })
      .then((response) => {
        //  console.log(response)
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };



  export const createProduct = (userId,product,token) => {
    return fetch(`${API}/product/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "applcation/json",
        Authorization: `Bearer ${token}`
      },
      body: product
    })
      .then((response) => {
        //  console.log(response)
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  export const getCategories = () => {
    return fetch(`${API}/categories`, {
      method: "GET",
    })
      .then((response) => {
        //  console.log(response)
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };