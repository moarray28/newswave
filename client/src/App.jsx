import { useEffect, useState } from "react";
import "./App.css";
import NewsBoard from "./components/NewsBoard";
import Categories from "./components/Categories";
import Search from "./components/Search";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Feed from "./components/Feed";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sign from "./components/Sign";
import Home from "./components/Home";
import axios from "axios";
//import AuthProvider from './provider/authProvider';
import { UserProvider } from "./components/UserContext";
import Navbar from "./components/Navbar";

function App() {
  const [show, setShow] = useState(JSON.parse(sessionStorage.getItem('show')) || false);
  
  useEffect(() => {
    sessionStorage.setItem('show', show);
      

      
    

  }, [show]);

  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home show={show} />} />
            <Route path="/profile" element={show ? (<Profile show={show} />) : (<Sign setShow={setShow} />) }/>
            <Route path="/feed" element={<Feed show={show} />} />
            <Route path="/sign" element={<Sign setShow={setShow} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={show ? (<Search show={show} />) : (<Sign setShow={setShow} />)} />
          </Routes>
        </BrowserRouter>
      </UserProvider>

      {/* Rest of your app components */}
    </>
  );
}
export default App;
