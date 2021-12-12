package main

import (
	"encoding/base64"
	"fmt"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/secretsmanager"
	"github.com/dghubble/go-twitter/twitter"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/clientcredentials"
	// "encoding/json"
)

func getSecret() (string, string) {
	secretName := "prod/twitterkeys"
	region := "us-west-2"

	//Create a Secrets Manager client
	sess, err := session.NewSession()
	if err != nil {
		// Handle session creation error
		fmt.Println(err.Error())
		return "error", "error"
	}
	svc := secretsmanager.New(sess,
		aws.NewConfig().WithRegion(region))
	input := &secretsmanager.GetSecretValueInput{
		SecretId:     aws.String(secretName),
		VersionStage: aws.String("AWSCURRENT"), // VersionStage defaults to AWSCURRENT if unspecified
	}

	result, err := svc.GetSecretValue(input)
	if err != nil {
		if aerr, ok := err.(awserr.Error); ok {
			switch aerr.Code() {
			case secretsmanager.ErrCodeDecryptionFailure:
				fmt.Println(secretsmanager.ErrCodeDecryptionFailure, aerr.Error())
			case secretsmanager.ErrCodeInternalServiceError:
				fmt.Println(secretsmanager.ErrCodeInternalServiceError, aerr.Error())
			case secretsmanager.ErrCodeInvalidParameterException:
				fmt.Println(secretsmanager.ErrCodeInvalidParameterException, aerr.Error())
			case secretsmanager.ErrCodeInvalidRequestException:
				fmt.Println(secretsmanager.ErrCodeInvalidRequestException, aerr.Error())

			case secretsmanager.ErrCodeResourceNotFoundException:
				fmt.Println(secretsmanager.ErrCodeResourceNotFoundException, aerr.Error())
			}
		} else {

			fmt.Println(err.Error())
		}
		return "error", "error"
	}

	var secretString, decodedBinarySecret string
	if result.SecretString != nil {
		secretString = *result.SecretString
	} else {
		decodedBinarySecretBytes := make([]byte, base64.StdEncoding.DecodedLen(len(result.SecretBinary)))
		len, err := base64.StdEncoding.Decode(decodedBinarySecretBytes, result.SecretBinary)
		if err != nil {
			fmt.Println("Base64 Decode Error:", err)
			return "error", "error"
		}
		decodedBinarySecret = string(decodedBinarySecretBytes[:len])
	}

	return secretString, decodedBinarySecret
}

func TweetSearch(query string) (Tweets, string, int) {

	// secretString, _ := getSecret()
	// if secretString == "error" {
	// 	return nil, "error", 400
	// }

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
		return nil, "error", 400
	}

	tweets := []TweetText{}

	for _, tweet := range search.Statuses {
		TweetText := TweetText{
			Text:      tweet.Text,
			IDStr:     tweet.IDStr,
			CreatedAt: tweet.CreatedAt,
			Username:  tweet.User.ScreenName,
		}
		tweets = append(tweets, TweetText)
	}

	return tweets, "success", 200
}
