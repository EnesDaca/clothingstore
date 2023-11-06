import React, { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import jwt_decode from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  // const location = useLocation();
  const navigate = useNavigate();
  // const redirectToNewPath = () => {
  //   navigate("/login");
  // };

  // const item = location.state;
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn && navigate("/")}

      <div className="d-flex justify-content-center align-items-center mt-4">
        <div className="card col-lg-4 col-md-6 col-sm-12">
          <div className="card-body">
            <h5 className="card-title">Sign in</h5>
            <div className="dropdown-divider"></div>
            <div className="form-group">
              <label>Username</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" />
            </div>
            <div className="btn btn-success btn-block w-100 mt-2">{`LOGIN`}</div>
            <div className="dropdown-divider mt-4">OR</div>
            <GoogleOAuthProvider clientId="888457942186-jm2o779d03gspm0d0l2rp7uak2j1icc8.apps.googleusercontent.com">
              <GoogleLogin
                className="btn-block"
                theme="dark"
                onSuccess={(response) => {
                  var userObject = jwt_decode(response.credential);
                  console.log("on success", userObject);
                  sessionStorage.setItem(
                    "userdetails",
                    JSON.stringify(userObject)
                  );
                  dispatch(actions.login(response.credential));
                  setIsLoggedIn(true);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </GoogleOAuthProvider>
            <p className="mt-4">
              <small>
                Registering through social media is incredibly speedy. You won't
                need to fret about managing extra passwords, so no memory
                overload. Rest assured, we uphold your data privacy and won't
                ever post on your behalf.
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
