import React, { useState, useEffect } from "react";
import countryData from "../resources/countryData.json";
import "./Searchbox.css";

function SearchBox() {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    const filteredSuggestions = countryData.filter((country) =>
      country.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
    setShowSuggestions(searchText !== "" && filteredSuggestions.length > 0);
  }, [searchText]);

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
      />

      {showSuggestions && (
        <ul>
          {suggestions.map((country, index) => (
            <li key={index}>{country.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBox;
