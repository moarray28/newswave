import React from 'react';
import { useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import searchpng from "../assets/searchpng.png";
import feedpng from "../assets/feedpng.png";
export default function Home({ show }) {

  const navigate= useNavigate();
  
  
  return (
    <div className="home">

      <Navbar show={show} />


      <div className="welcome">
        <h1 className='welcome-text'>Welcome to newsWave</h1>
      </div>






      <div className="images">
        {/**<img src={news}  className='registerimage' alt="login...." />  */}


      </div>

        

    <div className="container newswave d-flex align-items-center justify-content-center">
        <div className="firstdesc">
                <h1>What is Newswave?</h1>
                <br />
                <p style={{fontSize:'1.1em'}}>Newswave is platform that provides users with a comprehensive and up-to-date source of news.
                  It seeks to provide efficient access to credible news, enhance user engagement, and empower users in a digital era.  </p>
            </div>
    </div>
      <div className="container my-5 ">
    <div className="row align-items-center">
        
        <div className="col-md-6 mt-3 ">
            <img src={feedpng} className="img-fluid feedimage" alt="Search Page Image"/>
        </div>

        <div className="col-md-6">
            <div >
                <h1 className='weird'>Feed Page</h1>
                <p className='py-2 weird' style={{fontSize:'1.1em'}} > 
                    Feed page lets the user know and experience the news in short card format with a image and small description.
                  
              
                </p>
              
            </div>
        </div>
    </div>
</div>

      <div className="container my-5">
    <div className="row align-items-center">
        <div className="col-md-6 ">
            <div >
                <h1 className='weird'>Search Page</h1>
                <p className='py-2 weird'   > 
                    In the search page, you can access news from all over the world. Simply provide us with a query, and we will return news as per your request.
                  
              
                </p>
              
            </div>
        </div>

        <div className="col-md-6 mt-3">
            <img src={searchpng} className="img-fluid searchimage" alt="Feed Page Image"/>
        </div>
      
    </div>
    
 

</div>

        
      <Footer />
    </div>


  )
}
