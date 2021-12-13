import React, { useState} from "react";
import axios from 'axios';

const Search = () => {
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  
  const handleChange = event => {
    setSearch(event.target.value);
  }
  const handleSubmit = event => {
    event.preventDefault();
    axios.post(`https://gf9kxpm6x4.execute-api.us-west-2.amazonaws.com/Prod/register`, 
    {"searchtag": search},
    {headers: 
      {'x-api-key': process.env.REACT_APP_API_KEY}})
      .then(res => {
        console.log("res", res);
        console.log("res.data", res.data);
        if(res.status === 200){
          setMessage("Thank you");
        }
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
          autoComplete="off"
          value={search}
        />
        <button type="submit" className="button">
          Submit
        </button>
      </form>
      <p>{message}</p>
    </div>
  )
}

export default Search