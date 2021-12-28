import React, { useContext } from 'react';
import { TweetsContext } from '../context/TweetsContext';
import { Container, Text, Box } from '@chakra-ui/react';
import Marquee from 'react-fast-marquee';
// import Marquee from 'react-double-marquee';
import { FaTwitter } from 'react-icons/fa';

const StreamTweet = () => {
  const {
    currentTweetUserName,
    currentTweetUserScreenName,
    currentTweetText,
    hashTag,
  } = useContext(TweetsContext);
  return (
    <Container maxW="100%" display="flex">
      {/* <FaTwitter size={30} color={'#white'} /> */}
      <Text
        mr="10"
        w="280px"
        fontWeight="bold"
        borderRadius="30px"
        backgroundColor="#1DA1F2"
        lineHeight="60px"
        h="60px"
        color="white"
        textAlign="center"
      >
        #{hashTag}でツイート募集中!!
      </Text>

      {currentTweetUserScreenName && (
        <Box w="80%">
          <Box display="flex">
            <Text fontWeight="semibold" mr="1">
              {currentTweetUserName}
            </Text>
            <Text color="gray.500">@{currentTweetUserScreenName}</Text>
          </Box>
          {currentTweetUserName && (
            <Box w="80%" whiteSpace="nowrap">
              <Marquee>{currentTweetText}</Marquee>
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
};

export default StreamTweet;