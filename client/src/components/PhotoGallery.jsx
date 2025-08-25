import React from "react";
import { GrGallery } from "react-icons/gr";
import img1 from "../assets/gallery-1.jpg";
import img2 from "../assets/gallery-2.jpg";
import img3 from "../assets/gallery-3.jpg";
import img4 from "../assets/gallery-4.jpg";
import img5 from "../assets/gallery-5.jpg";
import img6 from "../assets/gallery-6.jpg";

const PhotoGallery = () => {
  return (
    <>
      <main className="bg-base-200 w-screen p-20">
        <div className="bg-transparent w-screen text-center leading-30 p-20 grid gap-8 justify-center items-center">
          <p className="text-7xl text-center text-primary relative left-60">
            <GrGallery />
          </p>
          <h1 className="text-5xl text-secondary font-extrabold">Photo Gallery</h1>
          <p className="text-base-content text-2xl">
            Purus velit at volutpat sapien ullamcorper rhoncus.
          </p>
        </div>

        <div className="grid gap-8">
          <div className="flex gap-8 justify-center">
            <img src={img1} alt="" className="h-175 w-115" />
            <img src={img2} alt="" className="h-175 w-115" />
            <img src={img3} alt="" className="h-175 w-115" />
          </div>

          <div className="flex gap-8 justify-center">
            <img src={img4} alt="" className="h-175 w-115" />
            <img src={img5} alt="" className="h-175 w-115" />
            <img src={img6} alt="" className="h-175 w-115" />
          </div>
        </div>
      </main>
    </>
  );
};

export default PhotoGallery;
