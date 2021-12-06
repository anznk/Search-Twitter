import React, { useState} from "react";
import axios from 'axios';

const Search = () => {
  const [search, setSearch] = useState("Vancouver");
  const handleChange = event => {
    setSearch(event.target.value);
  }
  const handleSubmit = event => {
    console.log("seach word", search);
    event.preventDefault();
    axios.post(`http://localhost:3000/register`, { "searchtag": search},{mode: 'cors'})
      .then(res => {
        console.log("res", res);
        console.log("res.data", res.data);
      })

  }
  
  return (
    <div className="searchbox">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => handleChange(e)}
          type="text"
          className="search_container"
          id="search"
          placeholder="Hash Tag"
          name="search"
          autocomplete="off"
        />
        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Search