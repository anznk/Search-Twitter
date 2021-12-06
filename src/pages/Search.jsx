import React, { useState} from "react";
import axios from 'axios';

const Search = () => {
  const [search, setSearch] = useState("");
  
  const handleChange = event => {
    setSearch(event.target.value);
  }
  const handleSubmit = event => {
    event.preventDefault();
    axios.post(`http://localhost:3000/register`, { "searchtag": search},{mode: 'cors'})
      .then(res => {
        console.log("res", res);
        console.log("res.data", res.data);
      })

    // clear input box value
    setSearch("");

  }
  
  return (
    <div className="searchbox">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => handleChange(e)}
          type="text"
          className="search_container"
          id="search"
          placeholder="search word"
          name="search"
          autocomplete="off"
          value={search}
        />
        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Search