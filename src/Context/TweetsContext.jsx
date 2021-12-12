import axios from 'axios';
import { createContext, useState, useContext, useEffect } from 'react';

const TweetsContext = createContext();

export function useCountContext() {
  return useContext(TweetsContext);
}

export function TweetProvider({ children }) {
  const [searchTag, setSearchTag ] = useState();
  const [tweets, setTweets ] = useState([]);
  const [selectedTweets, setSelectedTweets ] = useState([]);

  async function fetchData() {
    // get Search word
    const res = await axios.get(`http://localhost:3000/results`, {mode: 'cors'});
    const items = res.data;
    if (items.length) {
      // sort
      const value = items.sort(function (a, b) {
        return b.date - a.date;
      });
      setSearchTag(value[0].searchtag);
    }
  }
  async function fetchTweets(keyword) {
    // console.log("keyword", keyword);
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

  useEffect(() => {
    fetchTweets("Vancouver");
  }, []);


  return (
    <TweetsContext.Provider
      value={{
        searchTag,
        tweets,
        selectedTweets
      }}
    >
    </TweetsContext.Provider>
  );
}