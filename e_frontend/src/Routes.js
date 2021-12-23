import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Menu from "./core/Menu";
import Home from "./core/Home";
import Dashboard from "./user/Dashboard.js";
import PrivateRoute from "./auth/PrivateRoute";
import AdminDashboard from "./user/AdminDashboard";
import AdminRoute from "./auth/AdminRoute";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./core/Shop";
import SingleProduct from "./core/SingleProduct";
import Cart from "./core/Cart.js"

const Routes = () => {
  return (
      <BrowserRouter>
        <Menu />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/shop" exact component={Shop} />
          <PrivateRoute
            path="/user/dashboard"
            exact
            component={Dashboard}
            />
          <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
          <AdminRoute path="/create/category" exact component={AddCategory}/>
          <AdminRoute path="/create/product" exact component={AddProduct}/>
          <Route path="/product/:productId" exact component={SingleProduct} />
          <Route path="/cart" exact component = {Cart}/> 
        </Switch>
      </BrowserRouter>
  );
};

export default Routes;
