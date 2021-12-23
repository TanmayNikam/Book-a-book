import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { Fragment} from "react";
import {itemCount} from "./cartHelper"
const Menu = ({ history }) => {
  // console.log(history);
  

  return (
    <div>
      <ul
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#e3f2fd", listStyleType: "none" }}
      >
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
        </li>



        { isAuthenticated() && isAuthenticated().user.role===1 && (
            <li className="nav-item">
            <Link className="nav-link" to= "/admin/dashboard">               
              Dashboard
            </Link>
            </li>
        )
        }

        { isAuthenticated() && isAuthenticated().user.role===0 && (
            <li className="nav-item">
            <Link className="nav-link" to= "/user/dashboard">               
              Dashboard
            </Link>
            </li>
        )

        }

        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Signup
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/signin">
                Signin
              </Link>
            </li>
          </Fragment>
        )}

        {isAuthenticated() && (
          <li className="nav-item">
            <Link className="nav-link" to="/cart">Cart<sup><small>{itemCount()}</small></sup></Link>
          </li>
        )
        }

        {isAuthenticated() && (
          <li className="nav-item">
            <span
              className="nav-link"
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
            >
              SignOut
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
