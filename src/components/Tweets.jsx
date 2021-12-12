import React, { useContext } from "react";
import "../assets/styles/result.scss"
import { TweetsContext} from '../Context/TweetsContext';

const Tweets = () => {
  const { tweets, addTweets } = useContext(TweetsContext);
  return (
    <ol className="feed">{
      tweets && (
      tweets.map((tweet, i) => {
        return (
          <li key={ i } className="tweet" onClick={() => addTweets(i)}>
            <p className="tweet_name">@{tweet.user_name}</p>
            <p className="tweet_text">{ tweet.text }</p>
            <p className="tweet_created_at">{tweet.created_at}</p>
          </li>
        )
      })
      )
    }</ol>
  )
}

export default Tweets;