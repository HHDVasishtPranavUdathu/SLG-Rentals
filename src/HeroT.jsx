import React from "react";
import { Link } from "react-router-dom"; 
import "./Hero.css";
import AllProperties from "./components/properties/AllProperties";
import AvailablePropsTen from "./components/properties/AvailablePropsTen";

export default function HeroT() {
  return (
    <main className="container">
      <header className="header">
        <div className="header-title">Sri Lakshmi Ganapathi Rentals</div>
        <div className="header-links">
          <Link to="/login" className="link-default" onClick={() => {
                  localStorage.removeItem("user_id");
                  localStorage.removeItem("token");
              }}>Logout</Link>
          <Link to="/reg" className="link-default">Register</Link>
          <a href="#not" className="link-default">See Properties ↓</a>
        </div>
      </header>

      <section className="hero">
        <h1 className="hero-title">SLG Rentals</h1>
        <p className="hero-subtitle">
          Find the best rental properties tailored to your needs!
        </p>

        <div className="button-group">
           <a href="#not" className="btn-primary">See Properties ↓</a>
          <Link to="/reg" className="btn-secondary">Register</Link>
        </div>

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
      <div id="not">
        
        <AvailablePropsTen/>
        
        </div>
      </section>
    </main>
  );
}
