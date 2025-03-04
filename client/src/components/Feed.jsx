import React from 'react'
import { useState } from 'react';
import Categories from './Categories';
import NewsBoard from './NewsBoard';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Feed({show}) {
    //const [category,setCategory]=useState('general');

    const [category,setCategory]=useState('top');
 
    return (
    <div className='feedpage'>
     
     <div className="topbar">  
      <Navbar show={show}/>
      <div className="mx-3 top-design py-2 mb-4">  
      <div className="headingfeed" ><h2>News Feed</h2></div>
      <Categories  show={show} category={category} setCategory={setCategory} />
      </div>
      </div>
      <NewsBoard category={category} show={show}/>
       <Footer/> 
    </div>
  )
}
