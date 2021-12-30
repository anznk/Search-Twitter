import React from 'react';

import TweetsProvider from "../Context/TweetsContext"
import "../assets/styles/result.scss"
import {Tweets, SelectedTweets, CurrentTweet} from "../components";

const Result = () => {

  return (
    <div className="main">
      <TweetsProvider>
        <Tweets />
        <SelectedTweets />
        <CurrentTweet />
      </TweetsProvider>
    </div>
  )
}

export default Result