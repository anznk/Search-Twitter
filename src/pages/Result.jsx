import axios from 'axios';
import { useEffect, useState } from 'react';

const Result = () => {
    const [tweets, setTweets ] = useState([]);
  useEffect(async () => {
    if (tweets.length) {
      return;
    }
    const { data } = await axios.get(`http://localhost:3000/results`, {mode: 'cors'});
    console.log("1111111", data);
    if (data.length) {
      setTweets(data);
    }
  }, [tweets]);
  return (
    <ol>{
      tweets.map((tweet, i) => {
        return (
          <li key={ i }>{ tweet.searchtag }</li>
        )
      })
    }</ol>
  )
}

export default Result

// export default function Result() {
//   const [tweets, setTweets ] = useState([]);

//   useEffect(async () => {
//     if (tweets.length) {
//       return;
//     }

//     const q = 'Vancouver';
//     const { data } = await axios.get(`/api/tweets?q=${ encodeURIComponent(q) }`);

//     if (data.length) {
//       setTweets(data);
//     }
//   }, [tweets]);

//   return (
//     <ol>{
//       tweets.map((tweet, i) => {
//         return (
//           <li key={ i }>{ tweet.text }</li>
//         )
//       })
//     }</ol>
//   )
// }

// export default Result