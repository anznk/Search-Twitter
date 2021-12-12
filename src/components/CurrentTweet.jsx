import React, {useEffect, useState} from "react";


const CurrentTweet = (props) => {

  const [tweet, setTweet ] = useState();
  const [tweetIndex, setTweetIndex] = useState(0);
  
  useEffect(() => {
    let interval = setInterval(() => {
      setTweetIndex(tweetIndex + 1);
      }, 10000);

    setTweet(props.selected[tweetIndex % props.selected.length]);
    return () => clearInterval(interval);

  }, [props, tweetIndex]);

  return (
    <div className="currentTweet">
    {tweet ? (
      <>
      <p>{tweet.user_name}</p>
      <p>{tweet.text}</p>
      <p>{tweet.created_at}</p>
      </>
    ): <p>No</p>}

    </div>
  )
}

export default CurrentTweet