package main

import (
	"fmt"
	"github.com/dghubble/go-twitter/twitter"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/clientcredentials"
	// "encoding/json"
)

func TweetSearch(query string) (Tweets, string, int) {

	// oauth2 configures a client that uses app credentials to keep a fresh token
	config := &clientcredentials.Config{
		ClientID:     "Zow9qZu0JXiSb8euXeDbsjEV4",
		ClientSecret: "lcbZcg2bMmSIpCnfJAt11Uz9ImKW98t3hl3HdQdFN3BbzwFkSp",
		TokenURL:     "https://api.twitter.com/oauth2/token",
	}
	// http.Client will automatically authorize Requests
	httpClient := config.Client(oauth2.NoContext)

	// Twitter client
	client := twitter.NewClient(httpClient)

	search, _, err := client.Search.Tweets(&twitter.SearchTweetParams{
		Query: query,
		Count: 100,
	})

	if err != nil {
		fmt.Println(err.Error())
		return nil,"error", 400
	}

	tweets := []TweetText{}

	for _, tweet := range search.Statuses {
		TweetText := TweetText{
			Text: tweet.Text,
			IDStr: tweet.IDStr,
			CreatedAt: tweet.CreatedAt,
			Username: tweet.User.ScreenName,
		}
		tweets = append(tweets, TweetText)
	}

	
	return tweets, "success", 200
}