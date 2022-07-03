import React, { useState } from "react";
import { useDispatch , useSelector} from "react-redux";
import { RegisterUser } from "../../redux/actions/userActions";
import { Link } from 'react-router-dom'
import './Register.css'

const Register = () => {

  const dispatch= useDispatch();

  const users = useSelector((state)=> state.Users.users)

  const [userRegister, setUserRegister] = useState({
    emailId: "",
    phone: "",
    password: "",
    confirmpassword: "",
    location:"",
    latitude:"",
    longitude:""
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserRegister({ ...userRegister, [name]: value });
  };

  async function handleRegister(userRegister,e){
    e.preventDefault();
    /*Geocode.fromAddress(userRegister.location).then(
        (response) => {
            try{
          const { lat, lng } = response.results[0].geometry.location;
          console.log(lat, lng);
          setUserRegister({ ...userRegister, latitude: lat, longitude:lng })
            }
            catch(er){
                console.log(er);
            }
        },
        (error) => {
          console.error(error);
        }
      );*/
    if(userRegister.password !== userRegister.confirmpassword){
        alert("Password and ConfirmPassword does not match")
    }
    else{const hasUser = users.find((i) => i.emailId === userRegister.emailId)
    if(hasUser){
        alert("User is already registered !! Please use a different EmailId or Login");
    }
    else{
        // await fetch(`http://api.positionstack.com/v1/forward?access_key=9f6071fbb0438534bde92bc9d87cde9b&query=${userRegister.location}`)
        // .then((res)=>res.json())
        // .then(({ response }) => 
        // setUserRegister({...userRegister, latitude:JSON.parse(response.data[0].latitude),longitude:JSON.parse(response.data[0].longitude)}))
        // .then((response)=>console.log(response))
        // .catch((err)=>console.log(err));
       
        setUserRegister({...userRegister, latitude:"12.847810",longitude:"77.663193"})
        dispatch(RegisterUser(userRegister));
        setUserRegister({
        emailId: "",
        phone: "",
        password: "",
        confirmpassword: "",
        location:"",
        latitude:"",
        longitude:""
        })
        alert("User registered successfully ! Login Now")}
    }
  }

  return (
    <>
      <section className="mainsection">
        <div className="container">
          <div className="login-data">
            <p className="login-heading">Welcome to Barclays Departmental Store</p>
            {/* form start  */}
            <p className="bold-text">Create Your Account!</p>
            <form>
              <div className="form">
                <input
                  type="text"
                  id="email"
                  className="form__input"
                  placeholder="Email Address"
                  name="emailId"
                  value={userRegister.emailId}
                  onChange={handleInput}
                />
              </div>

              {/* for mobile number  */}
              <div className="form">
                <input
                  type="text"
                  id="phone"
                  className="form__input"
                  placeholder="Contact No."
                  name="phone"
                  value={userRegister.phone}
                  onChange={handleInput}
                />
              </div>

              <div className="form">
                <input
                  type="password"
                  id="password"
                  className="form__input"
                  placeholder="Pasword"
                  name="password"
                  value={userRegister.password}
                  onChange={handleInput}
                />
              </div>

              <div className="form">
                <input
                  type="password"
                  id="confirm password"
                  className="form__input"
                  placeholder="Confirm Password"
                  name="confirmpassword"
                  value={userRegister.confirmpassword}
                  onChange={handleInput}
                />
              </div>
              <div className="form">
                <input
                  type="text"
                  id="location"
                  className="form__input"
                  placeholder="Location"
                  name="location"
                  value={userRegister.location}
                  onChange={handleInput}
                />
              </div>

              <div className="register-btn" ><button className="register-btn1" onClick={(e)=>handleRegister(userRegister,e)}>Register</button> </div>
           
            </form>
            <p className="common-para">
              Already have an account with us? <Link to='/login'  style={{color:"black"}}>Login </Link> here
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;