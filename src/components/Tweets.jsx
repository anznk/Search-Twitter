import React, { useContext } from 'react';
import { TweetsContext } from '../context/TweetsContext';
import { Box, Container, Image, Text, Button } from '@chakra-ui/react';
import { FaSyncAlt, FaPlusCircle } from 'react-icons/fa';

const Tweets= () => {
  const { tweets, addTweets, hashTag, UpdateTweet } = useContext(TweetsContext);

  return (
    <Container>
      <Box display="flex" h="8">
        <Text fontWeight="bold" pt="2">
          #{hashTag}
        </Text>
        <Button variant="outline" onClick={UpdateTweet} ml="6">
          <FaSyncAlt />
          <Box ml={2}>更新</Box>
        </Button>
      </Box>

      <Box h="70vh" overflowY="auto" borderWidth="1" borderRadius="lg" mt="5">
        {tweets &&
          tweets.map((tweet, i) => {
            return (
              <Box
                position="relative"
                display="flex"
                borderWidth="1px"
                borderRadius="lg"
                w="100%"
                p={4}
                key={i}
                // _hover={{ bg: '#D3D3D3' }}
                onClick={() => addTweets(i)}
              >
                <Box minW="15%">
                  <Image
                    borderRadius="full"
                    boxSize="50px"
                    src={tweet.user.profile_image_url}
                    alt={'[Get User Picture]'}
                    mr="2"
                  />
                </Box>
                <Box>
                  <Box display="flex">
                    <Text fontWeight="semibold" mr="1">
                      {tweet.user.name}
                    </Text>
                    <Text color="gray.500">@{tweet.user.screen_name}</Text>
                  </Box>
                  <Text>{tweet.text}</Text>
                </Box>
                <Container
                  position="absolute"
                  left="85%"
                  bottom="10%"
                  cursor="pointer"
                >
                  <FaPlusCircle size={40} color={'#DCDCDC'} />
                </Container>
              </Box>
            );
          })}
      </Box>
    </Container>
  );
};

export default Tweets;