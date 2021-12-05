import axios from 'axios';
import { useEffect, useState } from 'react';

const Result = () => {
  return (
    <div>
      <h1>Result</h1>
    </div>
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