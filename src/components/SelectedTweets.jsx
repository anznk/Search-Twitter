import React, {useState} from "react";
// import "../assets/styles/result.scss"

const SelectedTweets = (props) => {
  console.log("props",props.selected);
  const [selectedTweets, setSelectedTweets] = useState(props.selected);

  console.log("selectedTweets",selectedTweets);

  const deleteTweets = event => {
    selectedTweets.splice(event, 1);  
    setSelectedTweets([...selectedTweets, selectedTweets]);
    props.setSelectedTweets([...selectedTweets, selectedTweets]);
    // console.log("selectedTweets", selectedTweets);
  }


  return (
    <div className="selectedtweets">
      <ol>{
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

    </div>
  )
}

export default SelectedTweets