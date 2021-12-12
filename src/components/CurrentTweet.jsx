import React, {useEffect, useState} from "react";


const CurrentTweet = (props) => {
    // console.log("props", props.selected);
    // let tweet = props.selected[0];
    // console.log("tweet", tweet);
  // const selectedTweets = props.selected;

  const [selectedTweets, setSelectedTweets] = useState([]);
  const [tweet, setTweet ] = useState([]);
  let timer;
  // const [count, setCount] = useState(0);
  let flg = false;

  const updateState = () => {
    flg = true;
    setInterval(() => {
      if(selectedTweets.length){
        console.log("inside updateState: selectedTweets", selectedTweets);
        setTweet(selectedTweets[0]);
        selectedTweets.splice(0, 1);
        setSelectedTweets([...selectedTweets, selectedTweets]);
        props.setSelectedTweets([...selectedTweets, selectedTweets]);
      }
      console.log("tweet", tweet);
    }, 10000)
  }

  useEffect(() => {
    if(!flg){
      setSelectedTweets(props.selected);
      setTweet(props.selected[0]);
      console.log("inside useEffect:selectedTweets",selectedTweets);
    }
    updateState();
    // if(flag === false){
    //   //first time
    //   setSelectedTweets(props.selected);
    //   setTweet(props.selected[0]);
    //   flag = true;
    //   return;
    // }
    // let index = 1;
    // const interval = setInterval(() => {
    //   // setSelectedTweets(props.selected);
    //   setTweet(props.selected[index]);
    //   selectedTweets.splice(index, 1);
    //   index++;
    //   // props.setSelectedTweets(...selectedTweets, selectedTweets)
    //   console.log("tweet", selectedTweets);
    // }, 1000);
    // return () => clearInterval(timer)
  }, [ tweet, props.selected]);

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