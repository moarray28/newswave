import React, { useEffect, useState,useContext } from "react";
import NewsItem from "./NewsItem";
import username from './Navbar';
import PageSizeContext from "./PageSizeContext";
import axios from "axios";

const NewsBoard = ({category,show }) => {
  const [articles, setArticles] = useState([]);
  const [loader, setLoader] = useState(true);
  const [visible, setVisible] = useState(false);
  const[location,setLocation]=useState(show? '' :'in');

  const [pageSize, setPageSize] =useState(5);
  axios.defaults.withCredentials = true;

  useEffect(()=>{
    
    const userdata = async() =>{
      if(show){
      try{
        const response = await axios.get(`http://localhost:4515/getprofile`);
        setLocation(response.data.location);
        console.log(response.data.location);
        setPageSize(response.data.pagesize);
  
      }
      catch(error){
            console.log("error while  fetching location and pagezie");
      }}else{
        console.log('anonymous user')
      }
  };
  
  userdata();
  
  


  },[]);


  
// const fetchNews = () => {
//   setLoader(true); // Show loader while fetching data

// //  const url = `http://localhost:4515/api/news?location=${location}&category=${category}&pageSize=${(pageSize * 3) + 6}`; // Dynamic URL with params

//   const url = `http://localhost:4515/api/news?location=in&category=technology&pageSize=${(pageSize * 3) + 6}`; // Dynamic URL with params


//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       // Slice the articles array based on the desired number of articles (pageSize * 3)
//       //const desiredArticleCount = pageSize * 3;  // Adjust the number based on your pageSize
//       //const slicedArticles = data.articles.slice(0, desiredArticleCount); // Slice the array based on pageSize
      
//       // Set the sliced articles to state
//       //setArticles(slicedArticles);
//       setArticles(data.articles);
//     })
//     .catch((error) => {
//       console.error('Error fetching news:', error);
//     })
//     .finally(() => {
//       // Set loader to false after the fetch operation is complete
//       setTimeout(() => {
//         setLoader(false);
//       }, 1500); // Optional timeout for the loader (you can adjust the time as needed)
//     });
// };




const fetchNews = () => {
  setLoader(true); // Show loader while fetching data

  //const url = `http://localhost:4515/api/news?location=in&category=technology&pageSize=${(pageSize * 3) + 6}`;

  const url =`http://localhost:4515/api/news?location=us&category=technology&pageSize=5`;
  console.log('Fetching data from URL:', url);

  // Make the Axios GET request
  axios.get(url)
    .then((response) => {
      console.log('Fetched data:', response.data); // Log the data from the server

      // Check if articles exist in the response
      if (response.data && response.data.articles && response.data.articles.length > 0) {
        setArticles(response.data.articles); // Set the articles to state
      } else {
        console.log('No articles found or empty data returned');
        setArticles([]); // If no articles, clear the state
      }
    })
    .catch((error) => {
      console.error('Error fetching news:', error);
    })
    .finally(() => {
      setTimeout(() => {
        setLoader(false); // Hide loader after the request completes
      }, 1500); // Optional timeout for the loader
    });
};


  useEffect(() => {
    fetchNews();
  }, [category, location, pageSize]);

  useEffect(() =>
   {


    const userdata = async() =>{
      if(show){
      try{
        const response = await axios.get(`http://localhost:4515/getprofile`);
        setLocation(response.data.location);
        console.log(response.data.location);
        setPageSize(response.data.pagesize);
  
      }
      catch(error){
            console.log("error while  fetching location and pagezie");
      }}else{
        console.log('anonymous user')
      }
  };
  
  userdata();
  
    window.addEventListener("scroll", toggleVisibility);

    {/**** 
      const url = `https://newsdata.io/api/1/latest?country=${location}&category=${category}&apikey=`;
    
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // Check if 'data.articles' exists and is an array
          
            setArticles(data.results);  // Set articles directly
                  })
        .catch((error) => {
          console.error("Error fetching news:", error);
          setArticles([]); // Set an empty array on error
        })
        .finally(() => {
          setTimeout(() => {
            setLoader(false);  // Hide the loader after fetching
          }, 1500);
        });
     // Run this effect when category or location changes
    
    
 */}

     //new approach : 



      
      
  }, [category,location]);


  // Function to scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smooth scrolling
    });
  };
  const toggleVisibility = () => {
    if (window.scrollY > 370) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  return (

    <div className="py-4 my-4">

      
      <div className={loader ? "templayout" : ""}>
        {loader ? (
          <div className="loader d-flex align-items-center justify-content-center">
            {" "}
          </div>
        ) : (
            <div>

               
               <div className="newscard mx-3">
            {articles.map((news, i) => {
              return (
                <NewsItem
                  key={i}
                  id={news.source.id}
                  url={news.url}
                  author={news.author}
                  title={news.title}
                  src={news.urlToImage}
                  description={news.description}
                  show={show}
                />
              );
            })}
          </div>
          

                {


              /*** 
               * 
               * using data.io 
               * 
               * 
<div className="newscard mx-3">
            {articles.map((news, i) => {
              return (
                <NewsItem
                  key={i}
                  id={news.article_id}
                  url={news.source_url}
                  author={news.creator}
                  title={news.title}
                  src={news.image_url}
                  description={news.description}
                  show={show}
                />
              );
            })}
          </div>
          

               * 
               * 
              */}

          </div>
        )}
   {/** 

   <div className="pagination-controls">
  {currentPage > 1 && (
    <button className="mx-5 pagebutton" style={{float:'left'}} onClick={() => setCurrentPage(currentPage - 1)}>
      Previous
    </button>
  )}
  {((pageSize*3)+6) && (
    <button className="mx-5 pagebutton" style={{float:'right'}} onClick={() => setCurrentPage(currentPage + 1)}>
      Next
    </button>
  )}
</div>
 */}
 
        <div className="scroll-to-top"> 
          {visible && (
            <button onClick={scrollToTop}  className="scroll-button">
              <ion-icon name="arrow-up-outline"></ion-icon>
            </button>
          )}
        </div>

      </div>

     
      
    </div>

  );

    
   




};

export default NewsBoard;
