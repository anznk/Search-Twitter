package main

type SearchTagBody struct {
	SearchTag string `json:"searchtag"`
}

type SearchTagResponse struct {
	SearchTag string `json:"searchtag"`
	Date string `json:"date"`
	Data string `json:"data"`
}

type SearchTagResponseList []SearchTagResponse

