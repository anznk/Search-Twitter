import axios from 'axios';
import React, { useState, createContext, useEffect } from 'react';

// Create Context object and export
export const TweetsContext = createContext();

function useInternval(callback, delay) {
  const timeoutRef = React.useRef();
  const callbackRef = React.useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (typeof delay === 'number') {
      timeoutRef.current = window.setInterval(() => callbackRef.current(), delay);

      // Clear timeout if the components is unmounted or the delay changes:
      return () => window.clearTimeout(timeoutRef.current);
    }
  }, [delay]);

  return timeoutRef;
}

const TweetsProvider = props => {
  const [tweets, setTweets ] = useState([]);
  const [selectedTweets, setSelectedTweets ] = useState([]);
  const [currentTweet, setCurrentTweet ] = useState({});
  async function fetchTweets(keyword) {
    // get tweet with search word
    const tweets = await axios.get('https://gf9kxpm6x4.execute-api.us-west-2.amazonaws.com/Prod/searchtweets?searchtag='+keyword, {
      // query URL without using browser cache
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
        'x-api-key': process.env.REACT_APP_API_KEY
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

  useInternval(() => {
    if(selectedTweets.length > 0){
      let tweet = selectedTweets.splice(0, 1)[0];
      setCurrentTweet(tweet);
      setCounter(10);
    }
    },10000);

  useEffect(() => {
    fetchTweets("Vancouver");
  }, []);

  return (
    <TweetsContext.Provider value={{tweets, selectedTweets, currentTweet, addTweets, deleteTweets}}>
      {props.children}
    </TweetsContext.Provider>
  );
};
export default TweetsProvider;