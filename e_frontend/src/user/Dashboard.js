import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const Dashboard = () => {

  const {user} = isAuthenticated();

  const userInfo = ()=>{ 
    return (

      <div className="card mb-5">
        <h3 className="card-header">User Information</h3> 
        <ul className="list-group">
            <li className="list-group-item">{user.name}</li>
            <li className="list-group-item">{user.email}</li>
            <li className="list-group-item">{user.role ? "Admin" : "Registered User"}</li>
        </ul>
      </div>
    )
  }

  const purchaseHistory= ()=>{

    return(
      <div className="card mb-5">
        <h3 className="card-header">Purchase History</h3> 
        <ul className="list-group">
            <li className="list-group-item">Purchased Items</li>
        </ul>
      </div>
    )

  }

  const userLinks=()=>{
    return(
      <div className="card">
        <h3 className="card-header">User Links</h3> 
        <ul className="list-group">
            <li className="list-group-item"><Link className="nav-link" to="/profile/update">Update Profile</Link></li>
            <li className="list-group-item"><Link className="nav-link" to="/cart">My Cart</Link></li>
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
          {purchaseHistory()}
        </div>

      </div>

    </Layout>
  );
};

export default Dashboard;
