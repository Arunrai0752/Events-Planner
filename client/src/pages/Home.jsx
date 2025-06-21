import React from "react";
import Hero from "../components/HomeHero";
import Journey from "../components/JourneyBegin";
import JourneyBegin from "../components/JourneyBegin";
import PhotoGallery from "../components/PhotoGallery";

const Home = () => {
  return (
    <>
      <Hero />
      <JourneyBegin />
      <PhotoGallery/>
    </>
  );
};

export default Home;
