import axios from 'axios';
import { useEffect, useState } from 'react';

const Result = () => {
    const [tweets, setTweets ] = useState([]);
    const [searchTag, setSearchTag ] = useState();
    
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
      const URLBASE = 'http://localhost:3000/searchtweets?searchtag='+keyword;
      console.log("URLBASE", URLBASE);
      // get tweet with search word
      const tweets = await axios.get(URLBASE);
      const data = tweets.data;
      if(data){
        setTweets(data);
      }
    }

  useEffect(() => {
    if (tweets.length) {
      return;
    }
    fetchData();
    if(searchTag){
      fetchTweets(searchTag);
    }

  }, [tweets, searchTag]);
  return (
    <div>
      {/* <p>{searchTag}</p> */}
      
      <ol>{
        tweets.map((tweet, i) => {
          return (
            <li key={ i }>{ tweet.text }</li>
          )
        })
      }</ol>
    </div>
  )
}

export default Result

