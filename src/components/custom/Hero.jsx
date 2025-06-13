import React from "react";
import { Button } from "../ui/button";
import beachVid from "../../../public/beachVid.mp4";
import { Link } from "react-router-dom";
import { ReactTyped } from "react-typed";
// import Bg2.jpg from "../../assets/Bg2.jpg"

function Hero() {
  return (
    // <div className='flex flex-col items-center mx-50 gap-9'>
    //   <h1
    //   className='font-extrabold text-[40px] text-center mt-16 leading-tight'
    //   > <span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips</h1>

    //   <p className='text-xl text-gray-500 text-center '>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
    //   <Link to={'/create-trip'}>
    //     <Button>Get Started, It's Free</Button>
    //   </Link>

    // </div>

    <div className="w-full h-screen relative">
      <video
        className="w-full h-full object-cover"
        src={beachVid}
        autoPlay
        loop
        muted
      />
      {/* <img className="w-full h-full object-cover" src="Bg2.jpg" alt="" /> */}
      <div className="absolute w-full h-full top-0 left-0 bg-gray-900/50"></div>
      <div className="absolute top-0 w-full h-full flex flex-col justify-center text-center text-white p-4">
        <h2 className="text-3xl font-bold font-[Poppins]">Discover Your Next Adventure with AI:</h2>
        <div className="flex justify-center">
          <h2 className="text-green-400 text-3xl font-bold font-[Poppins]">Personalized Itineraries for Your </h2>
          <ReactTyped
            className="text-3xl ml-2 font-bold font-[Poppins] text-green-400"
            strings={["Travel..", "Hotels..", "Stay.."]}
            typeSpeed={120}
            backSpeed={100}
            loop
          />
        </div>
        <h3 className="text-xl font-bold">
          Your personal trip planner and travel curator, creating custom
          itineraries tailored to your interests and budget.
        </h3>
        <div className="p-4">
           <Link to={'/create-trip'}>
          <button className="opacity-80 font-medium hover:opacity-100 hover:font-bold p-3 border  text-white rounded-md cursor-pointer">
            Get Started
          </button>
           </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
