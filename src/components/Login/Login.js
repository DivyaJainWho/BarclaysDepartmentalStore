import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { LoginUser } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import './Login.css'


const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggedIn , setIsLoggedIn] = useState(false)

  const users = useSelector((state)=> state.Users.users)

  const [userLogin, setUserLogin] = useState({
    emailId: "",
    password: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserLogin({ ...userLogin, [name]: value });
  };

  const handleLogin =(userLogin, e)=>{

    e.preventDefault();
    const hasUser = users.find((i) => i.emailId === userLogin.emailId)
    if(!hasUser){
        alert("User is not registered !! Please register first");
    }
    else if(hasUser.password !== userLogin.password)
    {
        alert("Incorrect password")
    }
    else{
    dispatch(LoginUser(userLogin));
    setUserLogin({ 
        emailId: "",
        password: "",
    })
    setIsLoggedIn(true);
    }
  }

  useEffect(()=>{if(isLoggedIn){
    navigate('/landing')
  }})

  return (
    <>
      <section className="mainsection">
        <div className="container">
          <div className="login-data">
            <p className="login-heading">Welcome to Barclays Departmental Store</p>
            {/* form start  */}
            <form action="#" className="login-form">
              <div className="form">
                <input
                  type="text"
                  id="email"
                  className="form__input"
                  placeholder="Email or Phone"
                  name="emailId"
                  value={userLogin.emailId}
                  onChange={handleInput}
                />
              </div>
              <div className="form">
                <input
                  type="text"
                  id="pasword"
                  className="form__input"
                  placeholder="Password"
                  name="password"
                  value={userLogin.password}
                  onChange={handleInput}
                />
              </div>
              <div className="login-btn" ><button className="login-btn1" onClick={(e)=>handleLogin(userLogin,e)}>Login</button></div>
             </form>
            <p className="common-para">
              Don't have account yet? <Link to='/register' style={{color:"black"}}> Sign Up </Link>here
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;