import React,{useState,useEffect} from 'react'
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
// import { Link } from "react-router-dom";
import { createProduct, getCategories } from './apiAdmin';

const AddProduct = () => {
    const {token,user} = isAuthenticated();
    
    const [values,setValues] = useState({
        name:'',
        description:'',
        price:'', 
        categories:[],
        category:'',
        shipping:'',
        quantity:'', 
        photo:'', 
        loading:false,
        error:'', 
        createdProduct:'',
        redirectToProfile:'',
        formData:''
    })

    const init = ()=>{ 
        getCategories()
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }
            else{ 
                setValues({...values,categories:data.message,formData:new FormData()})
            }
        })
    }

    useEffect(()=>{ 
        init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const {name,description,price,categories,category,shipping,quantity,loading,error,createdProduct,redirectToProfile,formData}=values; // eslint-disable-line no-unused-vars

    const handleChange = nameVal => event =>{ 
        const value = nameVal==="photo"?event.target.files[0]:event.target.value;
        // console.log("Name: ", nameVal, " , Value: ",value)
        setValues({...values, [nameVal]: value })
        formData.set(nameVal,value)
    }

    const handleSubmit = (event)=>{
        event.preventDefault()
        // console.log(values.formData)
        setValues({...values,error:'',loading:true})
        createProduct(user._id,formData,token)
        .then(data=>{
            if(data.error){     
                setValues({...values,error:data.error})
            }
            else{ 
                setValues({ 
                    name:'', 
                    description:'', 
                    price:'',
                    photo:'',
                    quantity:'',
                    loading:false,
                    createdProduct:data.name
                })
            }
        })
    }

    const productForm=()=>{ 
        return (
            <form className = "mb-3" onSubmit={handleSubmit}>
            <div className="form-group m-4">
                <h6>Post Photo</h6>
                <label className="btn btn-secondary"><input type="file" name="photo" accept="image/*" onChange={handleChange("photo")} /></label> 
            </div>
            

            <div className="form-group m-4">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange("name")} className="form-control" value={name}/>
            </div>
            

            <div className="form-group m-4">
                <label className="text-muted">description</label>
                <textarea onChange={handleChange("description")} className="form-control" value={description}/>
            </div>


            <div className="form-group m-4">
                <label className="text-muted">Price</label>
                <input type="number" onChange={handleChange("price")} className="form-control" value={price}/>
            </div>


            <div className="form-group m-4">
                <label className="text-muted">Category</label>
                <select onChange={handleChange("category")} className="form-control">

                    {
                        categories && categories.map((e,i)=>(
                            <option value={e._id} key={i}>{e.name}</option>
                        ))
                    }
                    
                </select>
            </div>


            <div className="form-group m-4">
                <label className="text-muted">Quantity</label>
                <input type="number" onChange={handleChange("quantity")} className="form-control" value={quantity}/>
            </div>
            

            <div className="form-group m-4">
                <label className="text-muted">Shipping</label>
                <select onChange={handleChange("shipping")} className="form-control">
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
            </div>

            <center><button className="btn btn-outline-success">Create Product</button></center>
        </form>
        )
    }

    const dispError = ()=>{
            return <div className="alert alert-danger" style={{"display":error?'':'none'}}><h4 >{error}</h4></div>
    }

    const dispSuccess = ()=>{
            return <div className="alert alert-info" style={{"display":createdProduct?'':'none'}}><h4>{`${createdProduct} created!`}</h4></div>
    }

    const dispLoading = ()=>{
            return <div className="alert alert-primary" style={{"display":loading?'':'none'}}><h4 >Loading...</h4></div>
    }

    return (
        <Layout title="Create Proudct" description={`Hello ${user.name}`} className="container col-md-6 offset-md-3">
                {dispError()}
                {dispLoading()}
                {dispSuccess()}
                {productForm()}
      </Layout>
    )
}

export default AddProduct
