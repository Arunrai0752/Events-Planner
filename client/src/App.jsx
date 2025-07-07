import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/HomeHero";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Services from "./pages/Services";
import Stories from "./pages/Stories";
import Loginpage from "./pages/Loginpage";
import Register from "./pages/Register";
import {Toaster} from "react-hot-toast"
import UserDashboard from "./pages/userDashboard";

const App = () => {
  return (
    <BrowserRouter>
    <Toaster/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/services" element={<Services />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/login" element={<Loginpage/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/UserDashboard" element={<UserDashboard/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;