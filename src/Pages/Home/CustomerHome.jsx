import React, { useEffect, useState } from 'react'
import { Link, Route, Routes } from "react-router-dom";
import Header from '../../components/Header';
import Home from './Home';
import Page2 from './Page2';
import About from './About';
import Contact from './Contact';
import PreLoader from '../../components/PreLoader';
import Footer from '../../components/Footer';


function CustomerHome() {
     const [loading, setLoading] = useState(true)
      useEffect(()=>{
        setTimeout(() => {
          setLoading(false)
        }, 6200);
      },[])

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
                <About/>
                <Contact/>
                 <Footer/>
               </main>
             }
           />
           {/* <Route path="/products" element={<Products />} />
           <Route path="/productInfo/:id" element={<ProductOverview />} />
           <Route path="/products/:category" element={<Category/>} />
           <Route path="/cart" element={<Cart />} />
           <Route path="/aboutus" element={<AboutUs/>} />
           <Route path="/blogs" element={<Blogs/>} />
           <Route path="/blogdata" element={<BlogInfo/>} />
           <Route path="/faq" element={<Faq/>} />
           <Route path="/shipping" element={<Shipping/>} />
           <Route path="/contact" element={<Contact/>} />
           <Route path="/profile" element={<MyProfile/>} />
           <Route path="/review" element={<AddReview/>} />
           <Route path="/*" element={<Error/>} /> */}
         </Routes>
       </div>
     </div>
}
   
    </>
  )
}

export default CustomerHome