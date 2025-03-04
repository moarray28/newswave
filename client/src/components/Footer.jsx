import React from 'react'
import news from "../assets/news.svg";
const Footer = () => {
  return (
    <>
      <footer className="footer-div text-center text-lg-start">

<div className="container p-4">

  <div className="row-lg-6">
  
    
      
      <img src={news} className="img-fluid footerimage" alt="Search Page Image"/>
      <h5 className="text-b">newsWave</h5>
      <p>
         newsWave is a web platform created with MERN stack ,to give user a high end experience and get informed time to time. 
    <span className='myname d-flex'></span>
    
      </p>
      <br />
    </div>
    <h6>About Us</h6>
    <h6>Contact Us</h6>
    <h6>Privacy Policy</h6>
   </div>


</footer>


    </>
  )
}

export default Footer
