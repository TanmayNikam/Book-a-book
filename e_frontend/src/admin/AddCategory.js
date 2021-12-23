import React, {useState} from 'react'
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createCategory } from './apiAdmin';


const AddCategory = () => {

    const [name,setName] = useState("");
    const [error,setError] = useState(false);
    const [success,setSuccess] = useState(false); 

    const {token,user}  = isAuthenticated();

    const handleChange =(e)=>{
        setError('')
        setName(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        setError('')
        setSuccess(false)
        createCategory(user._id,{name},token)
        .then(data=>{
            if(data.error){
                
                setError(data.error.name)
            }
            else{
                setError("")
                setSuccess(true)
            }
        })
    }

    const addCategroryForm =()=>(
        <form onSubmit={handleSubmit}>
            <div className="form-group m-5">
                <label className="text-muted m-2" align="center">Name</label>
                <input type ="text" className="form-control" onChange={handleChange} value={name} autoFocus/>
            </div>
            <center>
                <button className="btn btn-outline-primary">Create Category</button>
            </center> 
        </form>
    )

    const dispError = ()=>{
        if(error){
            return <h4 className="text-danger">{error}</h4>
        }
    }

    const dispSuccess = ()=>{
        if(success){
            return <h4 className="text-success">{name} category is created</h4>
        }
    }

    const goBack = ()=>(
        <div align="center" className="mt-4">
            <Link to="/admin/dashboard" className="text-warning">Go to dashboard</Link>
        </div>
    )

    return (
        <Layout title="Dashboard" description={`Hello ${user.name}`}>
            <div className="row">
                <div className="col-md-4 offset-md-4">
                <center>{dispError()}</center>
                <center>{dispSuccess()}</center>
                {addCategroryForm()}
                { goBack() }
                </div> 
            </div>
  
      </Layout>
    )
}

export default AddCategory
