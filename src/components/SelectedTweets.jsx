import React, {useEffect, useState} from "react";
// import "../assets/styles/result.scss"

const SelectedTweets = (props) => {

  const [selectedTweets, setSelectedTweets] = useState([]);

  useEffect(() => {
    setSelectedTweets(props.selected);
  },[props.selected])

  const deleteTweets = event => {
    console.log("selectedTweets",selectedTweets);
    // set the selectedTweets to temp variable
    const temp = [...selectedTweets];
    // delete tweet from temp(selectedTweets) list
    temp.splice(event, 1);
    setSelectedTweets(temp);
    // return to the Result component
    props.setSelectedTweets(temp);
  }

  return (
    <div className="selectedtweets">
      <ol>{
        props.selected && (
          props.selected.map((selectedTweet, i) => {
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

    </div>
  )
}

export default SelectedTweets