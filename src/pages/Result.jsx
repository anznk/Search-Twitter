import axios from 'axios';
import { useEffect, useState } from 'react';

const Result = () => {
    const [tweets, setTweets ] = useState([]);
    const [searchTag, setSearchTag ] = useState();
    
    let flag = false;
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
        // console.log(value[0].searchtag);
        // console.log("value[0].searchtag", searchTag);
      }
      // if(searchTag != "" && searchTag != null){
      //   fetchTweets(searchTag);
      // }
    }

    async function fetchTweets(keyword) {
      console.log("keyword", keyword);
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
      console.log("data", data);
      if(data){
        setTweets(data);
      }
    }

  useEffect(() => {
    // if (tweets.length > 0) {
    //   return;
    // }
    // fetchData();
    // if(searchTag !== undefined){
    //   fetchTweets(searchTag);
    // }
    if(flag == false){
      // first time
      fetchData();
      if(searchTag !== undefined){
        fetchTweets(searchTag);
      }
      flag = true;
      return;
    }

    const interval = setInterval(() => {
      console.log("timer");
      fetchData();
      if(searchTag !== undefined){
        fetchTweets(searchTag);
      }
    }, 10000);
    return () => clearInterval(interval)
  }, [tweets, searchTag]);

  return (
    <div>
      <h1>Result for searchtag: {searchTag}</h1>
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