import React, { useContext } from 'react';
import { TweetsContext } from '../context/TweetsContext';
import { Box, Container, Image, Text } from '@chakra-ui/react';
import { FaMinusCircle } from 'react-icons/fa';

const SelectedTweets = () => {
  const { selectedTweets, deleteTweets } = useContext(TweetsContext);

  return (
    <Container>
      <Box h="8">
        <Text fontWeight="bold" pt="2">
          待機中
        </Text>
      </Box>
      <Box h="70vh" overflowY="auto" borderWidth="1" borderRadius="lg" mt="5">
        {selectedTweets &&
          selectedTweets.map((selectedTweet,i) => {
            return (
              <Box
                position="relative"
                display="flex"
                borderWidth="1px"
                borderRadius="lg"
                w="100%"
                p={4}
                key={i}
                onClick={() => deleteTweets(i)}
              >
                <Box minW="15%">
                  <Image
                    borderRadius="full"
                    boxSize="50px"
                    src={selectedTweet.user.profile_image_url}
                    alt={'[Get User Picture]'}
                  />
                </Box>
                <Box>
                  <Box display="flex">
                    <Text fontWeight="semibold" mr="1">
                      {selectedTweet.user.name}
                    </Text>
                    <Text color="gray.500">
                      @{selectedTweet.user.screen_name}
                    </Text>
                  </Box>
                  <Text>{selectedTweet.text}</Text>
                </Box>
                <Container
                  position="absolute"
                  left="85%"
                  bottom="10%"
                  cursor="pointer"
                >
                  <FaMinusCircle size={40} color={'#DCDCDC'} />
                </Container>
              </Box>
            );
          })}
      </Box>
    </Container>
  );
};

export default SelectedTweets;