import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Hero.css";
import AllProperties from "./components/properties/AllProperties";
import RentalTranslations from "./RentalTranslations"; // Import the RentalTranslations component

export default function Hero() {
  return (
    <main className="container" id="home">
      {/* Header Section */}
      <header className="header">
        <div className="header-title">Sri Lakshmi Ganapathi Rentals</div>
        <div className="header-links">
          <Link to="/login" className="link-default">Login</Link>
          <Link to="/reg" className="link-default">Register</Link>
          <a href="#not" className="link-default">See Properties ↓</a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        {/* Dynamic Title from RentalTranslations */}
        {/* <h3 className="hero-title"> */}
          <RentalTranslations />
        {/* </h3> */}
        <p className="hero-subtitle">
          Sri Lakshmi Ganapathi Rentals:<br />
          <b>Not NATIONAL, It's INTERNATIONAL!</b><br />
          Thaggede Le! 😎
        </p>

        {/* Call-to-Action Buttons */}
        <div className="button-group">
          <a href="#not" className="btn-primary">See Properties ↓</a>
          <Link to="/reg" className="btn-secondary">Register</Link>
        </div>
        <p className="hero-footer">
          Design Resource trusted by over 1,00,000++ customers 😂🤣
        </p>

        {/* Preview Images */}
        <div className="preview-images">
          <div className="image-wrapper">
            <img
              src="https://dvcrentalstore.com/wp-content/uploads/2019/07/image_153420037.jpeg"
              alt="Property 1"
              className="image"
            />
          </div>
          <div className="image-wrapper">
            <img
              src="https://tse2.mm.bing.net/th/id/OIP.uIMPvMRhXXG3rGddF6gxFgHaE8?w=1024&h=683&rs=1&pid=ImgDetMain"
              alt="Property 2"
              className="image"
            />
          </div>
          <div className="image-wrapper">
            <img
              src="https://www.siestakeyluxuryrentalproperties.com/wp-content/uploads/2020/10/60-Unit95Messina-3.jpg"
              alt="Property 3"
              className="image"
            />
          </div>
        </div>

        {/* All Properties Section */}
        <div id="not">
          <AllProperties />
          <a href="#home"><button style={{position: 'fixed', right: '10px', margin:'10px', bottom:'10px' ,fontSize:"30px"}}>↑</button></a>

        </div>
      </section>
    </main>
  );
}
