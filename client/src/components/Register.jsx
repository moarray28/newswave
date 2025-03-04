import React, { useState } from "react";
import axios from "axios";
import './Register.css';
import register from "../assets/signup.gif"; 
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function handleSubmit(e) {

  e.preventDefault();

  const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }


    axios
      .post("http://localhost:4515/register", { name, email, password })
      .then((res) => {
        navigate("/sign");
      })
      .catch((err) => console.log(err));
  }


  const backtomain = ()=>{
    navigate("/");
  }

   

  
  return (
    
    <div className="register">
  
        
      <button type="button" className='back' onClick={backtomain}> <ion-icon name="arrow-back-outline"></ion-icon>  </button>
      <div className="login">
         

        <div className="headname_reg">Registration</div>

        <div className="dataentry_reg">
            
          <span className="icons_reg">
            {" "}
            <ion-icon name="person"></ion-icon>
          </span>

          <input
            type="text"
            className="placeholder_reg"
            placeholder="Username"
            name="ntext"
            required={true}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="error">{errors.name}</span>}


   
          <span className="icons_reg">
            {" "}
            <ion-icon name="mail"></ion-icon>
          </span>

          <input
            type="email"
            className="placeholder_reg"
            placeholder="Email"
            required={true}
            name="etext"
            onChange={(e) => setEmail(e.target.value)}
          />
             {errors.email && <span className="error">{errors.email}</span>}

          <span className="icons_reg">
            {" "}
            <ion-icon name="lock-closed"></ion-icon>
          </span>
          <input
            type="password"
            name="ptext"
            required={true}
            placeholder="Password"
            className="placeholder_reg"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
 
        <button type="button" className="btn_reg" onClick={handleSubmit}>
          Submit
        </button>

        <div className="login-register">
          <p>
            Already have an account ?
          
             <a href="sign" className="register-link">
              {" "}
              Login
            </a> 
               {/**   <Link to="/sign"> Sign In</Link>    */}
          </p>
        </div>
      </div>
          
         <img src={register}  className='registerimage' alt="login...." />   
    </div>
  );
}
