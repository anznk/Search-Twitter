import React from 'react';
import { Container, Grid, GridItem } from '@chakra-ui/react';
import TweetsProvider from "../context/TweetsContext"
import "../assets/styles/result.scss"
import {Tweets, SelectedTweets, CurrentTweet, StreamTweet} from "../components";

const Result = () => {
  return (
    <TweetsProvider>
    {/* <Header /> */}
    {/* <Search /> */}
    <Grid templateColumns="repeat(3, 1fr)" templateRows="repeat(5, 1fr)" mt="5">
      <GridItem rowSpan={4} colSpan={1}>
        <Tweets />
      </GridItem>
      <GridItem rowSpan={4} colSpan={1}>
        <SelectedTweets />
      </GridItem>
      <GridItem rowSpan={4} colSpan={1}>
        <CurrentTweet />
      </GridItem>
      <GridItem rowSpan={1} colSpan={3} pt={10}>
        <StreamTweet />
      </GridItem>
    </Grid>
  </TweetsProvider>
  )
}

export default Result