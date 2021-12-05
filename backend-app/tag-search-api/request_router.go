package main

import (
		"github.com/aws/aws-lambda-go/events"
		"encoding/json"
		"time"
		"fmt"
)

func SimpleRouter(request events.APIGatewayProxyRequest)(message string, statusCode int) {
	if request.Resource == "/results" {
		searchTagResponseList, body, statusCode := GetResults()
		fmt.Println(searchTagResponseList)
		if searchTagResponseList == nil {
			// Something went wrong, return body string and statusCode
			return body, statusCode
		}
		jsonString, _ := json.Marshal(searchTagResponseList)
		fmt.Println(string(jsonString))
		return string(jsonString), statusCode

	}else if request.Resource == "/register" {
		currentTime := time.Now().Unix()
		var searchTag SearchTagBody

		json.Unmarshal([]byte(request.Body), &searchTag)

		body, statusCode := AddSearchTag(searchTag, fmt.Sprint(currentTime), "")
		return body, statusCode
	}else if request.Resource == "/initialise" {
		var body, statusCode = TestQuery()
		return body, statusCode
	}
	return "", 404
}
