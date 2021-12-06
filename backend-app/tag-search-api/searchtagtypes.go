package main

type SearchTagBody struct {
	SearchTag string `json:"searchtag"`
}

type SearchTagResponse struct {
	SearchTag string `json:"searchtag"`
	Date string `json:"date"`
	Data string `json:"data"`
}

type TweetText struct {
	Text string `json:"text"`
	IDStr string `json:"id"`
	CreatedAt string `json:"created_at"`
	Username string `json:"user_name"`

}

type Tweets []TweetText
type SearchTagResponseList []SearchTagResponse

