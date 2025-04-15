import React, { useEffect } from "react";
const Banner = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timer); 
    }, [onClose]);
    
    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            backgroundColor: "#ffcc00",
            color: "#000",
            padding: "10px",
            textAlign: "center",
            zIndex: 1000
        }}>
            <span>{message}</span>
            <button
                style={{
                    marginLeft: "20px",
                    padding: "5px 10px",
                    cursor: "pointer",
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    border: "none",
                    borderRadius: "3px"
                }}
                onClick={onClose}
            >
                Close
            </button>
        </div>
    );
};

export default Banner;
