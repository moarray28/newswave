import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Navbar from "./Navbar";
import { useUser } from './UserContext';
import Footer from "./Footer";
const Search = ({ show}) => {
  const [articles, setArticles] = useState([]);
  const [loader, setLoader] = useState(false);
  const [visible, setVisible] = useState(false);
  const[pageSize,setPagesize]=useState(90);
  const [query, setQuery] = useState("");
  const [message,setMessage]=useState(" ");

  const handleSearch = async () => {
  
    setLoader(true);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${query.replace(
          /\s+/g,
          "+"
        )}&pageSize=${pageSize+6}&language=en&apiKey=8ee5a885104245319972f63466feaee2`
      );
      const data = await response.json();    //if titles and description of the json data are [Removed ]
      const filteredArticles = data.articles.filter(article => {
        return article.title !== '[Removed]' &&  article.description !== '[Removed]';
      });


      const desiredarticle = pageSize;
      const slicedarticles = filteredArticles.slice(0,desiredarticle); 
      
      
      setArticles(slicedarticles);

     if( data.totalResults === 0  ){            // if newsapi results in nothing and response is ok       
                     setMessage("Oops ! No results." +" Try searching similar news . ");} // not tried yet
       else{   
        setMessage(" ");
        //setArticles(data.articles); 
       
          }  


    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setTimeout(() => {
        setLoader(false);       // timeout created for   loading spinner
      }, 1500);
    }
    
  };
  useEffect(() => {
  

    window.addEventListener("scroll", toggleVisibility);


    

  }, []);

  


  /*
  const handleSubmit = () =>{
  

  useEffect(() => {
     let url =`https://newsapi.org/v2/everything?q=${query.replace(/\s+/g,'+')}&pageSize=15&apiKey=8ee5a885104245319972f63466feaee2`;       // everyother n  
      
    fetch(url)
      .then((response) => response.json())
      .then((data) => setArticles(data.articles))
      .catch((err) => err.json())
      .finally(() => {
        setTimeout(() => {
          setLoader(false);
        }, 1500);
      });

    window.addEventListener("scroll", toggleVisibility);
  }, [])}; */



  // Function to scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,   // positioning of it
      behavior: "smooth", // for smooth scrolling
    });
  };
  const toggleVisibility = () => {
    if (window.scrollY > 370) {  //describes 370px height
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  return (
    <div className="searchpage ">
            <div className="topbar py-2 mb-2">
              <Navbar show={show}/>  
      <div className="heading pt-4" style={{ fontSize: "2.1em" }}>
        Search News
      </div>

      <div className="mx-auto my-5 search">
        <input type="text" className="search-tag" style={{color:'#00004a'}} value={query} placeholder="For example : mumbai news"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button className="search-icon " onClick={handleSearch}>
          <ion-icon name="search-outline"  style={{color:"cornsilk"}}></ion-icon>
        </button>
 {/**          <button className="search-icon " onClick={console.log("change sort ")}>
          <ion-icon name="funnel"  style={{color:"cornsilk"}}></ion-icon>
        </button>
*/}

      </div>



      </div>

      
      <div className={loader ? "templayout" : "anotherlayout"}>
        {loader ? (
          <div className="loader d-flex align-items-center justify-content-center">
            {" "}
          </div>
        ) : (
            <div>
                       <h2 className="heading">{message}</h2>       
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
                  show={show}
                  description={news.description}
                />
              );
            })}
          </div>
          </div>
        )}
   
        <div className="scroll-to-top"> 
          {visible && (
            <button onClick={scrollToTop}  className="scroll-button">
              <ion-icon name="arrow-up-outline"></ion-icon>
            </button>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Search;
