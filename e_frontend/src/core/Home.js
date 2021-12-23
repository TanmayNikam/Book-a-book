import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getProducts} from "./apiCore.js"
import ProductCard from './ProductCard'

const Home = () => {

    const [products,setProducts] = useState([])
    const [query,setQuery] = useState('');              // eslint-disable-line no-unused-vars
    const [error,setError] = useState('')               // eslint-disable-line no-unused-vars
    const handleChange=(event)=>{                       // eslint-disable-line no-unused-vars
        // console.log(event.target.value)
        setQuery(event.target.value)
    }

    const loadProducts = ()=> {
        getProducts("sold")
        .then(data=>{
            if(data.error){
                setError(data.error)
            }
            else{
                // console.log(data.data)
                setProducts(data.data)
            }
        })
    }


    // useEffect(()=>{
    //     loadProducts()
    // },[query])
    

    useEffect(()=>{
        loadProducts()
    },[])

    return (
        <div>
            <Layout title="Home Page" description="An E_commerce web app with MERN tech stack" className="conatiner">

                {/* <div className="form-group col-3 mb-5">
                    <label className="text-muted">Sort by</label>
                    <select onChange={handleChange} className="form-control">
                        <option values="">None</option>
                        <option value="sold">Popular</option>
                        <option value="price">Price</option>
                        <option value="createdAt">Arrival</option>
                    </select>
                </div> */}

                 <div className="row">
                    {products.map((e,i)=>(
                        <ProductCard product={e} key={i} classname="col-3 m-5" cartButton={true}/>
                    ))}
                 </div>

            </Layout>
        </div>
    )
}

export default Home
