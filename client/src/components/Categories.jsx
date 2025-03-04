import React, { useState } from 'react'

export default function Categories({category,setCategory,show}) {



  return (

   
        <>   



<nav className="navbar navbar-expand-lg mb-2 navbar-dark shadow-5-strong">

  <div className="container-fluid">
    
    
    
    

      <ul className="navbar-nav mx-auto weird" >
       
        
      <li className="nav-item mx-2" >
          <div className={category == 'general' ? "acategory nav-link":" "+ "nav-link"} onClick={()=>setCategory('general')}>General</div>
        </li>

        {show&&(
          <>
        <li className="nav-item mx-2 ">
          <div className={category == 'business' ? "nav-link acategory ":"nav-link"} onClick={()=>setCategory('business')}>Business</div>
        </li>

        <li className="nav-item mx-2 ">
          <div className={category == 'entertainment' ? "nav-link acategory ":"nav-link"} onClick={()=>setCategory('entertainment')} >Entertainment</div>
        </li>

        <li className="nav-item mx-2 ">
          <div className={category == 'health' ? "nav-link acategory ":"nav-link"} onClick={()=>setCategory('health')}>Health</div>
        </li>
        
        <li className="nav-item mx-2 ">
          <div className={category == 'science' ? "nav-link acategory ":"nav-link"} onClick={()=>setCategory('science')}>Science</div>
        </li>
       
        <li className="nav-item mx-2 ">
          <div className={category == 'sports' ? "nav-link acategory ":"nav-link"} onClick={()=>setCategory('sports')}>Sports</div>
        </li>
       
        <li className="nav-item mx-2 ">
          <div className={category == 'technology' ? "nav-link acategory ":"nav-link"} onClick={()=>setCategory('technology')}>Technology</div>
        </li>
        </>
        )}

       </ul>
        
          
</div>
      

</nav>





      
 

</>

  )
}
