import React, {useEffect, useState} from "react";


const CurrentTweet = (props) => {
    // console.log("props", props.selected[0]);
  // const selectedTweets = props.selected;
  const [selectedTweets, setSelectedTweets] = useState([]);
  const [tweet, setTweet ] = useState(selectedTweets[0]);
  let flag = false;

  useEffect(() => {

    console.log("useEffect");
    // if(flag === false){
    //   //first time
    //   setSelectedTweets(props.selected);
    //   setTweet(props.selected[0]);
    //   flag = true;
    //   return;
    // }
    let index = 1;
    const interval = setInterval(() => {
      // setSelectedTweets(props.selected);
      setTweet(props.selected[index]);
      selectedTweets.splice(index, 1);
      index++;
      // props.setSelectedTweets(...selectedTweets, selectedTweets)
      console.log("tweet", selectedTweets);
    }, 1000);
    return () => clearInterval(interval)
  }, [tweet]);

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