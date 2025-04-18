import React, { useState, useEffect } from "react";

const RentalTranslations = () => {
  const translations = [
    "SLG Rentals", // English (Original)
    "SLG Rentals", // English (Original)
    "ఎస్.ఎల్.జి. రెంటల్స్", // Telugu
    "எஸ்.எல்.ஜி. ரெண்டல்ஸ்", // Tamil (Common usage in Chennai)
    "एसएलजी रेंटल्स", // Hindi
    "SLG Uthyrning", // Swedish
    "ಎಸ್ಎಲ್ಜಿ ರೆಂಟಲ್ಸ್", // Kannada
    "एसएलजी भाड्याने", // Marathi
    "এসএলজি রেন্টালস", // Bengali
    "एसएलजी भाड़ा", // Nepali
    "എസ്എൽജി റെന്റൽസ്", // Malayalam
    "SLG Rentas", // Spanish
    "SLG Locations de voitures", // French
    "SLG Vermietungen", // German
    "SLG Affitti", // Italian
    "SLG Alugueis", // Portuguese
    "SLG Huur", // Dutch
    "SLG Vuokraus", // Finnish
    "SLG Wynajem", // Polish
  ];

  const [currentIndex, setCurrentIndex] = useState(0); // Keeps track of the current array index

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % translations.length); // Cycles through the array
    }, 900);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [translations.length]); // Runs once after the initial render

  return (
    <div style={{ fontSize: "28px"}}>
      <h3>{translations[currentIndex]}</h3> {/* Displays the current translation */}
    </div>
  );
};

export default RentalTranslations;
