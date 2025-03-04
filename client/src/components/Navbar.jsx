import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import  axios from 'axios';
export default function Navbar({show}) {
    const navigate = useNavigate();
 
    const [log,setlog]=useState(false);
    
    const logout =()=>{
            setlog(true);
    }
  useEffect(()=>{

    if(log){
      try {
          // Remove local storage items
          sessionStorage.setItem('show',false);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          // Expire the token cookie (set expiration date to the past)
          document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          // Wait for local storage changes to complete
          
          // Navigate to the home page
 
          navigate('/');
          window.location.reload(); 
        } catch (error) {
          console.error('Error during logout:', error);
        }
      }
    
  })
      
    /*
  axios.defaults.withCredentials=true;
  useEffect(()=>{

    axios.get("http://localhost:4515/hello")
    .then(res => {
          const newuser = res.data;
          console.log(newuser)
          setUser(newuser.name)
          setUseremail(newuser.email)
        console.log("name : "+ (newuser.name));
        console.log("email : "+newuser.email);
          //console.log(user)
          setShow(true)
        
    })
    .catch(err => console.log(err))  
      setShow(false)

      },[user]) 
*/
    const gotosign = () => {
        navigate("/sign");
    }
    return (
        <>  
            <nav className="navbar navbar-expand-lg navbar-dark shadow-5-strong">

                <div className="container-fluid">

                    <div className="logo "><h1 className='heading'>newsWave</h1></div>

                    <div className="collapse navit navbar-collapse justify-content-end" id="navbarSupportedContent">

                         
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item mx-3 ">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item mx-3">
                                    <Link className="nav-link" to="/feed">Feed</Link>
                                </li>
                                <li className="nav-item mx-3">
                                    <Link className="nav-link" to="/search">Search</Link>
                                </li>
                                {show?(<li className="nav-item mx-3">
                                    <Link className="nav-link" to="/profile">Profile</Link>
                                </li>):" "}
                            </ul>

                            {show? (<button className="mx-2 btn-login"onClick={logout}>Logout</button>):" "}
                            {/**      {show? "" : (
                            <button className="mx-2 btn-login"onClick={gotosign}><Link to={"/sign"}></Link>login</button>)}
                         */}
                          {!show &&(
                            <button className="mx-2 btn-login"onClick={gotosign}><Link to={"/sign"}></Link>Login</button>)}
                      
                           </div>

                </div>
            </nav>

            </>
    )
}
