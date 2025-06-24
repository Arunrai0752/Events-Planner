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

const App = () => {
  return (
    <BrowserRouter>
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
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;