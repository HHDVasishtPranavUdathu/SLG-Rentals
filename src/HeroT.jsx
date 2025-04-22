import {React, useState} from "react";
import { Link } from "react-router-dom"; 
import "./Hero.css";
import AvailablePropsTen from "./components/properties/AvailablePropsTen";
import NotiBtn from "./components/notification/NotiBtn";

export default function HeroT() {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State to manage dropdown visibility
  
    const toggleDropdown = () => {
      setIsDropdownVisible((prev) => !prev); // Toggle dropdown visibility
    };
  
    const handleLogout = () => {
      localStorage.removeItem("user_id");
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirect to login after logout
    };
  return (
    <main className="container">
      <header className="header">
        <div className="header-title">Sri Lakshmi Ganapathi Rentals</div>
        <div className="header-links">
          <Link to="/lease/tenant" className="link-default">Lease</Link>
          <Link to="/GetProperties" className="link-primary">All Properties ↓</Link>
          <Link to="/postpayment" className="link-primary">Payment</Link>
          <NotiBtn/>
          {/* Profile Section with Dropdown */}
          <div className="profile-section" style={{ position: "relative", cursor: "pointer" }}>
            <img
              src="https://github.com/HHDVasishtPranavUdathu/SLG-Rentals/blob/main/src/components/user_12533276.png?raw=true"
              alt="me"
              onMouseEnter={toggleDropdown} 
              style={{ width: "20px", height: "20px", borderRadius: "50%" }}
            />
            {/* Dropdown Menu */}
            {isDropdownVisible && (
              <div
                className="dropdown-menu"
                style={{
                  position: "absolute",
                  top: "60px",
                  right: "0",
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  zIndex: "1000",
                  width: "150px",
                }}
              >
                <Link
                  to="/me"
                  className="dropdown-item"
                  style={{
                    display: "block",
                    padding: "10px",
                    textDecoration: "none",
                    color: "#333",
                    borderBottom: "1px solid #ddd",
                  }}
                  onClick={() => setIsDropdownVisible(false)} // Close dropdown after clicking
                >
                  My Account
                </Link>
                <button
                  className="dropdown-item"
                  onClick={handleLogout} // Handle logout
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "10px",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    color: "#333",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <section className="hero">
        <h1 className="hero-title">SLG Rentals</h1>
        <p className="hero-subtitle">
          Find the best rental properties tailored to your needs!
        </p>

        <div className="button-group">
           <a href="#not" className="btn-primary">See All Properties ↓</a>
          <Link to="/lease/tenant" className="btn-secondary">Lease</Link>
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
