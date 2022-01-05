import React, { useEffect, useState} from "react";
import axios from 'axios';
import TextMover from "../components/TextMover";
import { Box } from '@chakra-ui/react';

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

  let [textList, setTextList] = useState([]);
  setTextList(['Hello world, this is just a little bit longer; no it needs to be just a little bit longer'])
  // useEffect(() => {
  //   let interval = setInterval(() => {

  //   },10000);
  //   return () => clearInterval(interval);
  // }, []);


  return (
    <Box w="40%" whiteSpace="nowrap">
    {/* <Marquee value={currentTweetText}>{currentTweetText}</Marquee> */}
    <TextMover text={textList[0]}/>
  </Box>
  )
}

export default Search