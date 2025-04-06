import React, { useState, useEffect, useRef, createContext } from 'react';

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const languages = ["Русский", "Английский", "Немецкий", "Французский"];

  const handleLanguageClick = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <div style={{display: "flex",}}>
        <div style={{ 
                position: "fixed",
                top: 0,
                left: 0,
                width: "160px",
                height: "100vh",
                background: "rgba(0, 0, 0, 0.225)",
                padding: "20px",
                boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
                zIndex: "80",
            }}>

            <h1 style={{padding: "3px", textAlign: "center", fontSize: "27px", marginTop: "200px"}}>Выберите язык</h1>
            <div style={{ display: "flex", gap: "10px", flexDirection: "column",}}>
                {languages.map((language) => (
                    <a href="/" style={{textDecoration: "underline", fontSize: "21px", color: "#000", padding: "8px",}}>{language}</a>
                ))}
            </div>
        </div>
    </div>
    
  );
};

export default LanguageSelector;
