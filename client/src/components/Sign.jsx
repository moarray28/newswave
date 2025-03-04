
import React,{useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import  axios from 'axios'; 
import  { jwtDecode } from 'jwt-decode';
import App from '../App'
import './Sign.css';
import login from '../assets/signin.gif';
import { useUser } from './UserContext';
import Navbar from './Navbar';
import Footer from './Footer';
export default function Sign({setShow}) {

  //const[name,setName] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { setUser } = useUser();
   const navigate = useNavigate();
  
  axios.defaults.withCredentials= true;

  

  function handleSubmit(e) {
    e.preventDefault();
  
    // Validation errors
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
  
    // If there are errors, set them and stop the function
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    // Post request to login
    axios.post("http://localhost:4515/login", { email, password })
      .then((res) => {
        // Assuming res.data contains the token and user info
       
        const {token }= res.data;
         if(res.status){
          setShow(true);
          localStorage.setItem('token', token); // Store the token in local storage
          const decodedToken = jwtDecode(token); // Decode the token to get user data
          setUser({ name: decodedToken.name, email: decodedToken.email })
          localStorage.setItem('user', JSON.stringify(token));

         navigate('/profile')
          
         }
         else  {
          setShow(false);
            navigate('/sign')
           
         }
        // Navigate to profile only after state has been updated
        /*setUser(tokendata.user); // Set user with new data
        setShow(true); // Show profile
        console.log("user :"+ user);
        console.log("tokendata  status :"+ tokendata) */ 
        // Navigate to profile
      })
      .catch((err) => {
        console.log(err);
        // Handle errors, such as showing a login error message
        setErrors({ login: 'Login failed. Please try again.' });
      });


      

    }
    
    
    
  
  




  /*   function handleSubmit(e) {
    e.preventDefault()

    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (password.length  < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

      axios
      .post("http://localhost:4515/login", { email, password })
      .then((res) => {
                 navigate('/profile')
              const tokendata = res.data;
              console.log(res.data.status)
              
            
         })
      .catch((err) => {
        console.log(err)
  
      });
  
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }}
 */

  const backtomain = ()=>{
    navigate("/");
  }
 

  
  
  return (
       <div className="sign">
        <div>  
        <button type="button" className='back' onClick={backtomain}> <ion-icon name="arrow-back-outline"></ion-icon>  </button> 
 

      <div className="signup">
        <div className="headname">Login</div>

        <div className="dataentry">


          <span className="icons">
            {" "}
            <ion-icon name="mail"></ion-icon>
          </span>
        

          <input
            type="email"
            className="placeholder_sign"
            placeholder="Email"
            name="etext"
            required={true}
            onChange={(e)=> setEmail(e.target.value)}
      
          />
           {errors.email && <span className="error">{errors.email}</span>}

          <span className="icons">
            {" "}
            <ion-icon name="lock-closed"></ion-icon>
          </span>
          <input
            type="password"
            name="ptext"
            required={true}
            placeholder="password"
            className="placeholder_sign"
            onChange={(e) => setPassword(e.target.value)}

          />
              {errors.password && <span className="error">{errors.password}</span>}
          {/**     <Link to="/forgot"><h6 className='forgotpassword'>Forgot Password</h6></Link> */}
        </div>
             
        <button type="button" className="btn_sign" onClick={handleSubmit}>
          Login
        </button>

        <div className="login-signin">
          <p>
            Don't have an account ? 
            <a href="register" className="register-link">
              {" "}
              Register
            </a> 
           {/**   <Link to="/register">Register</Link> */}   
          </p>
        </div>
      </div>

       
             <img src={login}  className='loginimage' alt="login...." /> 
             </div>
       
            
      </div>

  )
}
