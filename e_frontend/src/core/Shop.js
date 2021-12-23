import React,{useState,useEffect,Fragment} from 'react'
import Layout from './Layout'
import { getCategories } from './apiCore'
import Checkbox from './Checkbox'
import Radiobox from './Radiobox'
import { prices } from './fixedPrices'
import { getFilteredProducts } from './apiCore'
import ProductCard from './ProductCard'

const Shop = () => {

    const [categories,setCategories] = useState([])
    const [error,setError] = useState(false)    
    const [limit,setLimit] = useState(6)     // eslint-disable-line no-unused-vars
    const [skip, setSkip] = useState(0)    
    const [size,setSize] = useState(0)
    // eslint-disable-next-line no-unused-vars
    const [filteredProducts, setFilteredProducts] = useState([])
    const[userFilters,setUserFilters]  = useState({ 
        filters:{ category:[], price:[]}
    })



    const init = ()=> {
        getCategories()
        .then(data=>{
            if(data.error){
                setError(data.error)
            }
            else{
                setCategories(data.message)
            }
        })
    }

    useEffect(()=>{
        init()
        loadFilteredProducts(userFilters.filters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const loadFilteredProducts =(filters)=>{
        getFilteredProducts(filters,skip,limit)
        .then(data=>{ 
            if(data.error){
                setError(data.error)
                // console.log(error)
            }
            else{ 
                // console.log(data)
                setFilteredProducts(data.data)
                setSize(data.size)
                setSkip(0)
            }
        })
    }

    const handleFilters = (filters,filterBy)=>{
        // console.log(filters, filterBy)

        if(filterBy === "price"){
            let priceData = getPrice(filters)
            filters=priceData.range
        }
        const newFilters = {...userFilters} 
        newFilters.filters[filterBy] = filters
        setUserFilters(newFilters)
        loadFilteredProducts(userFilters.filters)
    }

    const getPrice =(id)=>{
        return prices[id];
    }

    const loadMoreProducts = ()=>{ 
        let toSkip = skip + size; 
        getFilteredProducts(userFilters.filters,toSkip,limit)
        .then(data=>{ 
            if(data.error){
                setError(data.error)
                console.log(error)
            }
            else{ 
                // console.log(data)
                setFilteredProducts([...filteredProducts, ...data.data])
                setSize(size+data.size)
            }
        })
    }

    const loadMoreButton=()=>{ 
        return <center><button onClick={loadMoreProducts} className="btn btn-secondary mb-5">Load More...</button></center>
    }



    return (
        <Layout title="Shop page" description="Shop books of your choice" className="container-fluid">
            <div className="row">
                <div className="col-3">
                <h6>Categories</h6>
                <ul>
                    <Checkbox categories={categories} handleFilters={handleFilters} />
                </ul>


                <h6>Prices</h6>
                <Fragment>
                    <Radiobox prices={prices} handleFilters={handleFilters} />
                </Fragment>

                </div>
                <div className="col-9">
                    <div className="row">
                        {filteredProducts.map((e,i)=>(
                            <ProductCard product={e} key={i} classname="col-3  m-4" cartButton={true}/>
                        ))}
                    </div>
                    {loadMoreButton()}
                </div>
            </div>
        </Layout>
    )
}

export default Shop
