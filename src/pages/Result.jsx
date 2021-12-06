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
        console.log("value[0].searchtag", value[0].searchtag);
      }
      if(searchTag){
        fetchTweets(searchTag);
      }
    }
    async function fetchTweets(keyword) {
      console.log("keyword", keyword);
      // get tweet with search word
      const tweets = await axios.get('http://localhost:3000/searchtweets?searchtag='+'${keyword}');
      const data = tweets.data;
      console.log("data", data);
      if(data){
        setTweets(data);
      }
    }

  useEffect(() => {
    if (tweets.length) {
      return;
    }
    fetchData();
  }, [tweets]);
  return (
    <ol>{
      tweets.map((tweet, i) => {
        return (
          <li key={ i }>{ tweet.text }</li>
        )
      })
    }</ol>
  )
}

export default Result

