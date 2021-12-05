package main

import (
	"errors"
	// "fmt"
	// "io/ioutil"
	// "net/http"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

var (
	// DefaultHTTPGetAddress Default Address
	DefaultHTTPGetAddress = "https://checkip.amazonaws.com"

	// ErrNoIP No IP found in response
	ErrNoIP = errors.New("No IP in HTTP response")

	// ErrNon200Response non 200 status code in response
	ErrNon200Response = errors.New("Non 200 Response found")
)

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {

	var body, statusCode = SimpleRouter(request)
	return events.APIGatewayProxyResponse{
		Body: body,
		StatusCode: statusCode,
		Headers: map[string]string{
			"Content-Type": "application/json",
			"Cross-Origin-Allow-Origin": "*",
			"Access-Control-Allow-Origin": "*",
		},
	}, nil
}

func main() {
	lambda.Start(handler)
}
