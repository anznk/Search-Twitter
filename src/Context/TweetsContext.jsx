import axios from 'axios';
import React, { useState, createContext, useEffect } from 'react';

// Create Context object and export
export const TweetsContext = createContext();

const TweetsProvider = props => {
  const [tweets, setTweets ] = useState([]);
  const [selectedTweets, setSelectedTweets ] = useState([]);
  const [currentTweet, setCurrentTweet ] = useState({});

  async function fetchTweets(keyword) {
    // get tweet with search word
    const tweets = await axios.get('http://localhost:3000/searchtweets?searchtag='+keyword, {
      // query URL without using browser cache
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
    const data = tweets.data;
    // console.log("data", data);
    if(data){
      setTweets(data);
    }
  }
  const addTweets = event => {
    setSelectedTweets([...selectedTweets, tweets[event]]);   
    const tempTweets = [...tweets];
    tempTweets.splice(event, 1);
    tempTweets.splice(event, 1);
    setTweets(tempTweets);  

  }
  const deleteTweets = event => {
    // add selected tweet to tweets list
    setTweets([...tweets, selectedTweets[event]]);  
    // set the selectedTweets to temp variable
    const temp = [...selectedTweets];
    // delete tweet from temp(selectedTweets) list
    temp.splice(event, 1);
    setSelectedTweets(temp);

  }

  useEffect(() => {
    fetchTweets("Vancouver");

    let interval = setInterval(() => {
      if(selectedTweets.length > 0){
        let tweet = selectedTweets.splice(0, 1)[0];
        setCurrentTweet(tweet);
      }
    }, 10000);
    return () => clearInterval(interval);

  }, [selectedTweets]);

  return (
    <TweetsContext.Provider value={{tweets, selectedTweets, currentTweet, addTweets, deleteTweets}}>
      {props.children}
    </TweetsContext.Provider>
  );
};
export default TweetsProvider;