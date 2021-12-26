
import React, { useState, createContext, useEffect, useRef } from 'react';
import axios from 'axios';

// Create Context object and export

export const TweetsContext = createContext();

const useInternval = (callback, delay) => {
  const timeoutRef = React.useRef();
  const callbackRef = React.useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (typeof delay === 'number') {
      timeoutRef.current = window.setInterval(
        () => callbackRef.current(),
        delay
      );
      return () => window.clearTimeout(timeoutRef.current);
    }
  }, [delay]);

  return timeoutRef;
};

const TweetsProvider = (props) => {
  // const [text, setText] = useState('');
  const [hashTag, setHashTag] = useState('');
  const [tweets, setTweets] = useState([]);
  const [selectedTweets, setSelectedTweets] = useState([]);
  const [currentTweetProfileImage, setCurrentTweetProfileImage] = useState('');
  const [currentTweetUserName, setCurrentTweetUserName] = useState('');
  const [currentTweetUserScreenName, setCurrentTweetUserScreenName] =
    useState('');
  const [currentTweetText, setCurrentTweetText] = useState('');
  const [stopFlg, setStopFlg] = useState(false);
  const [fetchFlg, setFetchFlg] = useState(true);
  const [firstStreamFlg, setFirstStreamFlg] = useState(true);

    async function fetchTweets(keyword) {
      // get tweet with search word
      const tweets = await axios.get('http://localhost:3000/searchtweets?searchtag='+keyword, {
        // query URL without using browser cache
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
      const data = tweets.data;
      // console.log("data", data);
      if(data){
        setTweets(data);
        setHashTag(keyword);
        setFetchFlg(false);
      }
    }


  const addTweets = (index) => {
    setSelectedTweets([...selectedTweets, tweets[index]]);
    const tempTweets = [...tweets];
    tempTweets.splice(index, 1);
    setTweets(tempTweets);
  };
  const deleteTweets = (index) => {
    // 選択したtweetをtweetListに格納
    setTweets([...tweets, selectedTweets[index]]);
    // 選択したtweetをselectedTweetから削除
    const temp = [...selectedTweets];
    temp.splice(index, 1);
    setSelectedTweets(temp);
  };
  // const handleClick = () => {
  //   // fetchTweets();
  //   // setHashTag(text);
  // };
  // const handleChange = (event) => {
  //   setText(() => event.target.value);
  // };

  const StreamStart = () => {
    //ストリーム再生を開始
    setStopFlg(true);
    setFirstStreamFlg(true);
  };
  const StreamStop = () => {
    // ストリーム再生を停止
    setStopFlg(false);
  };

  const UpdateTweet = () => {
    // 更新ボタン押下後、再度feetchする
    fetchTweets('Vancouver');
  };

  useInternval(() => {
    // 10秒間隔でツイートを表示する
    if (selectedTweets.length > 0 && stopFlg) {
      let tweet = selectedTweets.splice(0, 1)[0];
      setCurrentTweetProfileImage(tweet.user.profile_image_url);
      setCurrentTweetUserName(tweet.user.name);
      setCurrentTweetUserScreenName(tweet.user.screen_name);
      setCurrentTweetText(tweet.text);
    }
  }, 10000);

  useEffect(() => {
    if (fetchFlg) {
      fetchTweets('Vancouver');
      // setHashTag(text);
    }
    // //ボタン押下後、初回のみすぐ表示
    if (firstStreamFlg) {
      if (selectedTweets.length > 0) {
        let tweet = selectedTweets.splice(0, 1)[0];
        setCurrentTweetProfileImage(tweet.user.profile_image_url);
        setCurrentTweetUserName(tweet.user.name);
        setCurrentTweetUserScreenName(tweet.user.screen_name);
        setCurrentTweetText(tweet.text);
      }
      setFirstStreamFlg(false);
    }
  }, [fetchFlg, firstStreamFlg, selectedTweets]);

  return (
    <TweetsContext.Provider
      value={{
        // text,
        hashTag,
        tweets,
        selectedTweets,
        currentTweetProfileImage,
        currentTweetUserName,
        currentTweetUserScreenName,
        currentTweetText,
        stopFlg,
        // handleChange,
        // handleClick,
        addTweets,
        deleteTweets,
        StreamStart,
        StreamStop,
        UpdateTweet,
      }}
    >
      {props.children}
    </TweetsContext.Provider>
  );
};
export default TweetsProvider;
