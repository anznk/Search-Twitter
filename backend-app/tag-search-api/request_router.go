package main

import (
		"fmt"
		"github.com/aws/aws-lambda-go/events"
)


func SimpleRouter(request events.APIGatewayProxyRequest){
	if request.Resource == "/results" {
		// GET VERB
		var body = request.Body
		fmt.Println(body)

	}else if request.Resource == "/register" {
		// POST VERB
		var body = request.Body
		fmt.Println(body)
	}else if request.Resource == "/test" {
		TestQuery()
	}
}
