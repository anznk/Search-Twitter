import React, {useEffect, useState} from "react";


const CurrentTweet = (props) => {

  const [tweet, setTweet ] = useState();

  useEffect(() => {
    setTweet(props.tweet);
  }, [props.tweet]);

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