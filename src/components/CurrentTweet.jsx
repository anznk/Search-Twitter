import React, { useContext } from "react";
import "../assets/styles/result.scss"
import { TweetsContext} from '../Context/TweetsContext';

const CurrentTweet = () => {
  const { currentTweet } = useContext(TweetsContext);
  return (
    <div className="currentTweet">
      {currentTweet ? (
        <>
        <p>{currentTweet.user_name}</p>
        <p>{currentTweet.text}</p>
        <p>{currentTweet.created_at}</p>
        </>
      ): <p>No</p>}
    </div>
  )
}

export default CurrentTweet;