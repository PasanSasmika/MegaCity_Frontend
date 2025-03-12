import React, { useEffect, useState } from 'react'
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Header from '../../components/Header';
import Home from './Home';
import Page2 from './Page2';
import About from './About';
import Contact from './Contact';
import PreLoader from '../../components/PreLoader';
import Footer from '../../components/Footer';
import AboutUs from './AboutUs';
import Error from '../../components/Error';


function CustomerHome() {
  const location = useLocation();
     const [loading, setLoading] = useState(true)
      useEffect(()=>{
        setTimeout(() => {
          setLoading(false)
        }, 6200);
      },[])

      useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on route change
      }, [location]);
    

  return (
    <>
     {loading ? <PreLoader/>:
       <div className="w-full h-screen bg-primary">
       <div>
         <Routes>
           <Route
             path="/"
             element={
               <main>
                 <Header />
                 <Home />
                <Page2/>
                <AboutUs/>
                <About/>
                <Contact/>
                 <Footer/>
               </main>
             }
           />
          <Route path="/*" element= {<Error/>} />
          <Route path="/about" element= {<AboutUs/>} />
          <Route path="/contact" element= {<Contact/>} />
          <Route path="/service" element= {<About/>} />
         </Routes>
       </div>
     </div>
}
   
    </>
  )
}

export default CustomerHome