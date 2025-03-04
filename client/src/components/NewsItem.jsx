import React, { useState,useEffect } from "react";
import image from "../assets/news.png";
import axios from 'axios';
import { useUser } from './UserContext';

const NewsItem = ({ title, description, url, src, author ,show ,bk}) => {

    const[bookmark,setBookmark]=useState(false);
    const { user } = useUser();
     
    
axios.defaults.withCredentials=true;



const deletebookmark =async()=>{
  try {
    const response = await axios.delete('http://localhost:4515/deletebookmark',{
     data:{ name:user.name,
      title:title,
      author:author,
      link:url}}); 
    console.log(response.data)
    alert("bookmark deleted");
  } catch (error) {
    console.error('Error deleting bookmark:', error);
  }
}

  const saveBookmark  = async ()=>{
         
         if(bookmark == false)
       { 
        setBookmark(!bookmark);

        try {
          const response = await axios.post('http://localhost:4515/insbookmark', {
              name:user.name,
              title:title,
              author:author,
              imagesrc:src,
              description:description,
              link:url
          });

          console.log(response.data);
      } catch (error) {
          console.error(error);
      }

        ;
      }
  else{
   
    console.log("bookmark false");
    setBookmark(!bookmark);
  }


      }
 

  return (
    
             
      <div
      className="card cardin weird-2 d-inline-block my-4 mx-5 px-2 py-2 justify-content-center h-100 text-aligned-justify align-items-center"
        //className="card mb-2 weird mx-3 my-3 d-inline-block align-items-center justify-content-center px-2 py-2"
      // className="card justify-content-center weird-2 h-100 mx-5 my-4 col px-2 py-2 d-inline-block align-items-center"
        style={{ maxWidth:"330px"}}              //original :330                                  //col
      >
        <img
          className="card-img-top rounded mx-1 my-1"
          style={{ height: "200px", width: "300px" }}
          src={src?src:image}
          alt="Card image cap"
        />                                          
        <div className="card-body text-start">
          <h5 className="card-title text-start formargin">{title ?title.slice(0,40)+"....": "Title not found"}</h5>
          <h6 className="card-subtitle text-start formargin ">
            Author : {author ? author.slice(0,18)+". . ." : "Anonymous"}
          </h6>
          <p className="card-text text-start formargin ">
            {description ? description.slice(0,85)+"...." : "Description not found. Please click Read More for complete description of news."}
          </p>


          <a href={url} target="_blank" className="btn readmore">
            Read More
          </a>
          {bk&&(
          <button className="bookmark" onClick={deletebookmark}><ion-icon name="close-circle"></ion-icon></button>)}


          {show&&(
          <button className="bookmark" onClick={saveBookmark}><ion-icon name={bookmark ?"bookmark":"bookmark-outline"}></ion-icon></button>)}


          {/** logic for the above bookmark would be
           *         
           *      bookmark ?              //it should be either true or false ,useState woul be required
           *                   "bookmark-filled" 
           *               :    
           *                   "bookmark-outline"
           * 
           * 
           */}
       
        </div>
      </div>
    
  
  );
};

export default NewsItem;
