import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import { useParams } from 'react-router-dom'
import { getProductById, getRelatedProducts} from './apiCore'
import ProductImage from './ProductImage'
import ProductCard from './ProductCard'

const SingleProduct = (props) => {

    const [product,setProduct] = useState()
    const[relatedProductsList,setRelatedProductsList] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState()
    const {productId}=useParams();


    const loadProduct=()=>{ 
    
        getProductById(productId)
        .then(data=>{
            if(data.error){
                setError(data.error)
            }
            else{
                // console.log(data.data)
                setProduct(data.data)
                getRelatedProducts(data.data._id)
                .then(results => {
                    if(results.error){
                        console.log(results.error)
                    }
                    else{ 
                        // console.log(results.results[0])
                        setRelatedProductsList(results.results)
                    }
                })
            }
        })
    }

    useEffect(()=>{  
        loadProduct()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])



    return( 
    
        <Layout title="Product Page" description="Product description" className="container-fluid">
        <div style={{"display":"flex"}}>
        <div className="col-5">
                {product && <ProductImage product={product} style={{width:  "550px",height: "550px",objectFit: "scale-down"}}/>}
            </div>
            <div  className="col-7 m-4">
            {product && <div> 
                    <h3 className="card-header">{product.name}</h3>
                    <div className="m-3">
                        <p className="lead">{product.description}</p>
                        <p>Category: {product.category.name}</p>
                        <p>Price: ₹ {product.price}</p>   
                    </div>
                </div>
            }
                <center>
                    <button className="btn btn-outline-primary m-2">Add to cart</button>
                </center>
            </div>
            
        </div>
            <hr /> 
        {relatedProductsList && (
            
            <div className="row">
                <center><h4>Related Products</h4></center>
                    {relatedProductsList.map((e,i)=>(
                    <ProductCard product={e} key={i} classname="col-4 "/>
                ))} 
            </div>
        )}

        </Layout>
    )
}

export default SingleProduct
