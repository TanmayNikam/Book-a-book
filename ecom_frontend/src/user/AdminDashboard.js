import React from 'react'
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";


const AdminDashboard = () => {
    
  const {user} = isAuthenticated();

  const userInfo = ()=>{ 
    return (

      <div className="card mb-5">
        <h3 className="card-header">Admin Information</h3> 
        <ul className="list-group">
            <li className="list-group-item">{user.name}</li>
            <li className="list-group-item">{user.email}</li>
        </ul>
      </div>
    )
  }

  const userLinks=()=>{
    return(
      <div className="card">
        <h3 className="card-header">Admin Links</h3> 
        <ul className="list-group">
            <li className="list-group-item"><Link className="nav-link" to="/create/category">Add Category</Link></li>
            <li className="list-group-item"><Link className="nav-link" to="/create/product">Add Product</Link></li>
        </ul>
      </div>
    )
  }

    return (
        <Layout title="Dashboard" description={`Hello ${user.name}`} className="container-fluid">
        {/* {console.log(isAuthenticated())} */}
  
        <div className="row">
  
          <div className="col-3"> 
            {userLinks()}
          </div>
  
          <div className="col-9"> 
            {userInfo()}
          </div>
  
        </div>
  
      </Layout>
    )
}

export default AdminDashboard
