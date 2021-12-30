import React, { useContext } from 'react';
import { TweetsContext } from '../context/TweetsContext';
import { Container, Box, Text, Image, Button } from '@chakra-ui/react';
import { FaPlay, FaPause } from 'react-icons/fa';

const CurrentTweet= () => {
  const {
    currentTweetProfileImage,
    currentTweetUserName,
    currentTweetUserScreenName,
    currentTweetText,
    stopFlg,
    StreamStart,
    StreamStop,
  } = useContext(TweetsContext);

  return (
    <Container>
      <Box display="flex" mb="5" h="8">
        <Text fontWeight="bold" pt="2">
          再生中
        </Text>
        {stopFlg ? (
          <Button onClick={StreamStop} ml="6">
            <FaPause />
            <Box ml={2}>一時停止</Box>
          </Button>
        ) : (
          <Button variant="outline" onClick={StreamStart} ml="6">
            <FaPlay />
            <Box ml={2}>再生開始</Box>
          </Button>
        )}
      </Box>
      {currentTweetUserName && (
        <Box display="flex" borderWidth="1px" borderRadius="lg" w="100%" p={4}>
          <Box minW="15%">
            <Image
              borderRadius="full"
              boxSize="50px"
              src={currentTweetProfileImage}
              alt={'[Get User Picture]'}
            />
          </Box>
          <Box>
            <Box display="flex">
              <Text fontSize="15px" fontWeight="semibold" mr="1">
                {currentTweetUserName}
              </Text>
              <Text color="gray.500">@{currentTweetUserScreenName}</Text>
            </Box>
            <Text>{currentTweetText}</Text>
          </Box>
        </Box>
      )}
    </Container>
  );
};
export default CurrentTweet;