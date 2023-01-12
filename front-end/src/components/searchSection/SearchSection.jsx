// SearchSection.js
import React from 'react';
import './searchSection.css';
import { useState } from 'react';

const SearchSection = () => {
const [searchType,setSearchType]=useState("doctor")
const [searchTerm,setSearchTerm]=useState("")
const[results, setResults] = useState([]);
const[error, setError] = useState('');
  const handleSubmit = (event) => {

    event.preventDefault();
    console.log(searchType,searchTerm)

    // Validate form values
    

    // Send request to backend to search for doctors or hospitals
    // fetch('/api/search', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ searchType, searchTerm }),
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error('Error searching');
    //     }
    //     return response.json();
    //   })
    //   .then((results) => {
    //     // Display search results to the user
    //     setResults(results);
    //   })
    //   .catch((error) => {
    //     setError(error.message);
    //   });
  };

  return (
    <div className="search-section">
      <h2>Search for Doctors or Hospitals</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search-type">
          Search By:
          <select id="search-type" name="searchType" onChange={(e)=> setSearchType(e.target.value)}>
          
            <option value="doctor">Doctor</option>
            <option value="hospital">Hospital</option>
            <option value="city">City</option>
          </select>
        </label>
        <label htmlFor="search-term">
          Search Term:
          <input type="text" id="search-term" name="searchTerm"  onChange={(e)=> setSearchTerm(e.target.value)} />
        </label>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchSection;
