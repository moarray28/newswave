import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import NewsItem from "./NewsItem";
import { useUser } from "./UserContext";
import Footer from "./Footer";
const Profile = ({ show }) => {
 
  const { user } = useUser();
  const [articles, setArticles] = useState([]);
  const [tooltip, setTooltip] = useState(false);
  const [bookmarkmsg, setbookmarkmsg] = useState(false);
  const [loader, setLoader] = useState(false);
  const [visible, setVisible] = useState(false);
  const [location, setLocation] = useState('in');
  const [pageSize, setPageSize] = useState(7);
  const [bk,setbk]=useState(true);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:4515/getprofile')
      .then(response => {
        // Set the state with the fetched data
        setLocation(response.data.location);
        setPageSize(response.data.pagesize);
      })
      .catch(error => {
        console.error('Error fetching user preferences:', error);
      });
  }, []); // Empty dependency array to run only on component mount
  





  const handlechangeforloc = (event) => {
    const selectedLocation = event.target.value;
    setLocation(selectedLocation);
  
    // Update the profile after location change
    axios.post('http://localhost:4515/updateprofile', {
      location: selectedLocation,
      pagesize: pageSize
    })
    .then(response => {
      console.log('Profile updated:', response.data);
    })
    .catch(error => {
      console.error('Error updating profile:', error);
    });
  };
  const handlechangeforsize = (event) => {
    const selectedsize = Number(event.target.value);
    setPageSize(selectedsize);
  
    // Update the profile after location change
    axios.post('http://localhost:4515/updateprofile', {
      location: location,
      pagesize: selectedsize
    })
    .then(response => {
      console.log('Profile updated:', response.data);
    })
    .catch(error => {
      console.error('Error updating profile:', error);
    });
  };
 

  
  useEffect(() => {

    const fetchBookmarks = async () => {
      try {
        const response = await axios.get(`http://localhost:4515/getbookmarks`);
        setArticles(response.data);
        setbookmarkmsg(false);
      } catch (error) {
        console.error("Error fetching bookmark data:", error);
      }
    };



    console.log("user found and loading bookmark and data");
    fetchBookmarks();

    const userdata = async () => {
      try {
        const response = await axios.get(`http://localhost:4515/getprofile`);
        setLocation(response.data.location);
        setPageSize(response.data.pagesize);

      }
      catch (error) {
        console.log("error while  fetching location and pagezie");
      }
    };

    userdata();


  }, []);

  

  const scrollToTop = () => {
    window.scrollTo({
      top: 0, // positioning of it
      behavior: "smooth", // for smooth scrolling
    });
  };
  const toggleVisibility = () => {
    if (window.scrollY > 370) {
      //describes 370px height
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  return (
    <>
      <div className="weird profile mx-auto py-2">
        <Navbar show={show} />
        <div className="container card profilesection">  
        <div className="row mx-5  ">
          <h1> Welcome,{user.name}!</h1>
          <hr />
          
          <h4 > Email:{user.email}</h4>
          </div>

          <div className="row mx-5  ">
          <div
            className="userchoices d-flex "
            style={{ color: "var(--primary)" }}
          >
            <h4 className=""> Location </h4>

            <select
              className="dropdown"
              style={{ color: "var(--primary)" }}
              name="Location"
              value={location}
              onChange={handlechangeforloc}

            >
              <option value="ae">UAE</option>
              <option value="ar">Argentina</option>
              <option value="at">Austria</option>
              <option value="au">Australia</option>
              <option value="be">Belgium</option>
              <option value="bg">Bulgaria</option>
              <option value="br">Brazil</option>
              <option value="ca">Canada</option>
              <option value="ch">Switzerland</option>
              <option value="cn">China</option>
              <option value="co">Colombia</option>
              <option value="cu">Cuba</option>
              <option value="cz">Czech Republic</option>
              <option value="de">Germany</option>
              <option value="eg">Egypt</option>
              <option value="fr">France</option>
              <option value="gb">United Kingdom</option>
              <option value="gr">Greece</option>
              <option value="hk">Hong Kong</option>
              <option value="hu">Hungary</option>
              <option value="id">Indonesia</option>
              <option value="ie">Ireland</option>
              <option value="il">Israel</option>
              <option value="in">India</option>
              <option value="it">Italy</option>
              <option value="jp">Japan</option>
              <option value="kr">Korea</option>
              <option value="lt">Lithuania</option>
              <option value="lv">Latvia</option>
              <option value="ma">Morocco</option>
              <option value="mx">Mexico</option>
              <option value="my">Malaysia</option>
              <option value="ng">Nigeria</option>
              <option value="nl">Netherlands</option>
              <option value="no">Norway</option>
              <option value="nz">New Zealand</option>
              <option value="ph">Philippines</option>
              <option value="pl">Poland</option>
              <option value="pt">Portugal</option>
              <option value="ro">Romania</option>
              <option value="rs">Serbia</option>
              <option value="ru">Russia</option>
              <option value="sa">Saudi Arabia</option>
              <option value="se">Sweden</option>
              <option value="sg">Singapore</option>
              <option value="si">Slovenia</option>
              <option value="sk">Slovakia</option>
              <option value="th">Thailand</option>
              <option value="tr">Turkey</option>
              <option value="tw">Taiwan</option>
              <option value="ua">Ukraine</option>
              <option value="us">United States</option>
              <option value="ve">Venezuela</option>
              <option value="za">South Africa</option>
            </select>
            <span
              title="It allows the user to select their respective country."
              className="info-icon"
            >
              <ion-icon name="information-circle"></ion-icon>
            </span>
          </div>
    </div>
          <div
            className="userchoices mx-5"
            style={{ color: "var(--primary)" }}
          >
            <h4 className="mx-2">NewsSize </h4>
            <input
              type="range"
              placeholder="newssize"
              min="5" // Set the minimum value
              max="15" // Set the maximum value
              value={pageSize} // Bind the input value to your component's state
              onChange={handlechangeforsize}
               // Update state when the slider is moved
            />
            <p>{pageSize}</p>
            <span
              title="It is number of rows feed page can have to read the news."
              className="info-icon"
            >
              <ion-icon name="information-circle"></ion-icon>
            </span>
          
          </div>
       </div>



        <div className="heading pt-4" style={{ fontSize: "2.1em" }}>
          Bookmarked Content
        </div>

        {bookmarkmsg ? (
          <h3 className="heading pt-4">No Bookmark </h3>
        ) : (
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
                        url={news.link}
                        author={news.author}
                        title={news.title}
                        src={news.imagesrc}
                        description={news.description}
                  
                        bk={bk}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            <div className="scroll-to-top">
              {visible && (
                <button onClick={scrollToTop} className="scroll-button">
                  <ion-icon name="arrow-up-outline"></ion-icon>
                </button>
              )}
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default Profile;
