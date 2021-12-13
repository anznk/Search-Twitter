import React, { useContext } from "react";
import "../assets/styles/result.scss"
import { TweetsContext} from '../Context/TweetsContext';

const SelectedTweets = () => {
  const { selectedTweets, deleteTweets } = useContext(TweetsContext);

  return (
    <ol className="feed">{
      selectedTweets && (
        selectedTweets.map((selectedTweet, i) => {
        return (
          <li key={ i } className="tweet" onClick={() => deleteTweets(i)}>
            <p className="tweet_name">{selectedTweet.user_name}</p>
            <p className="tweet_text">{ selectedTweet.text }</p>
            <p className="tweet_created_at">{selectedTweet.created_at}</p>
          </li>
        )
      })
      )
    }</ol>
  )
}

export default SelectedTweets