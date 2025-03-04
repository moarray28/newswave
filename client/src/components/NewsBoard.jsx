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

  useEffect(() =>
   {

     //let url ='https://newsapi.org/v2/everything?q=world+news&language=hi&pageSize=15&apiKey=8ee5a885104245319972f63466feaee2';       // everyother news
      /**
       * attribute country is not applicable in everything endpoint ,so it will be better to use everthing in the search section of the news
       * 
       
       *   
       */
    //let url ="https://newsapi.org/v2/top-headlines?country="+country+"&category="+category+"&pageSize="+pageSize+"&apiKey=8ee5a885104245319972f63466feaee2"; //getting news from india

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
  
/** Similarly,it will be better to use top-headline section for the country 
     * top-headline does not allow to select the language even if is selected i have to remove the country attribute from it 
    */

   // const url =`https://newsapi.org/v2/top-headlines?country=${location}&category=${category}&pageSize=${(pageSize*3)+6}&apiKey=8ee5a885104245319972f63466feaee2`;
   /** 
   const url = `https://newsdata.io/api/1/latest?country=${location}&category=${category}&apikey=pub_726990cb19aa30a6fd34ec15b15cc99778e59`;

fetch(url)
  .then((response) => response.json())
  //.then((data) => {
    // Simply slice the articles array based on the desired number of articles
   // const desiredArticleCount = pageSize * 3;  // Adjust the number based on your pageSize
    //const slicedArticles = data.articles.slice(0, desiredArticleCount); 
    
    // Set the articles to state without any filtering
    //setArticles(slicedArticles);
  //.})
  .then((data) => {
    setArticles(data.articles);
  })
  .catch((error) => console.log(error))
  .finally(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1500);
  });

**/

    window.addEventListener("scroll", toggleVisibility);

    
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

               {/***  for newssapi.org
                * 
                * <div className="newscard mx-3">
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
          
                * 
                */}

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
