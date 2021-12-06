package main

import (
	"fmt"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

var DDB_ENDPOINT = "http://192.168.1.5:8000"
var REGION = "us-west-2"

func SimpleDynamoDBQuery() {
	fmt.Println("SimpleDynamoDBQuery")
}

func GetResults() (SearchTagResponseList, string, int) {
	sess, err := session.NewSession(&aws.Config{
		Endpoint: aws.String(DDB_ENDPOINT),
		Region:   aws.String(REGION),
	})

	svc := dynamodb.New(sess)

	result, err := svc.Scan(&dynamodb.ScanInput{
		TableName: aws.String("SearchTags"),
	})

	if err != nil {
		fmt.Println(err.Error())
		return nil, "error calling Scan - " + err.Error(), 400
	}

	searchTagResponseList := []SearchTagResponse{}

	for _, i := range result.Items {
		searchTagResponse := SearchTagResponse{}
		searchTagResponse.SearchTag = *i["searchtag"].S
		searchTagResponse.Date = *i["date"].S
		searchTagResponse.Data = *i["data"].S

		searchTagResponseList = append(searchTagResponseList, searchTagResponse)
	}

	return searchTagResponseList, "success", 200

}

func AddSearchTag(searchtag SearchTagBody, date string, data string) (string, int) {
	sess, err := session.NewSession(&aws.Config{
		Endpoint: aws.String(DDB_ENDPOINT),
		Region:   aws.String(REGION),
	})

	svc := dynamodb.New(sess)
	input := &dynamodb.PutItemInput{
		Item: map[string]*dynamodb.AttributeValue{
			"searchtag": {
				S: aws.String(searchtag.SearchTag),
			},
			"date": {
				S: aws.String(date),
			},
			"data": {
				S: aws.String(data),
			},
		},
		TableName: aws.String("SearchTags"),
	}
	_, err = svc.PutItem(input)

	if err != nil {
		fmt.Println(err.Error())
		return "error calling NewSession - " + err.Error(), 400
	}
	return "", 0
}

func InitialiseTable() (string, int) {
	sess, err := session.NewSession(&aws.Config{
		Endpoint: aws.String(DDB_ENDPOINT),
		Region:   aws.String(REGION),
	})

	// Create DynamoDB client
	svc := dynamodb.New(sess)

	// Create SearchTag table
	input := &dynamodb.CreateTableInput{
		AttributeDefinitions: []*dynamodb.AttributeDefinition{
			{
				AttributeName: aws.String("date"),
				AttributeType: aws.String("S"),
			},
			{
				AttributeName: aws.String("searchtag"),
				AttributeType: aws.String("S"),
			},
		},
		KeySchema: []*dynamodb.KeySchemaElement{
			{
				AttributeName: aws.String("date"),
				KeyType:       aws.String("HASH"),
			},
			{
				AttributeName: aws.String("searchtag"),
				KeyType:       aws.String("RANGE"),
			},
		},
		ProvisionedThroughput: &dynamodb.ProvisionedThroughput{
			ReadCapacityUnits:  aws.Int64(10),
			WriteCapacityUnits: aws.Int64(10),
		},
		TableName: aws.String("SearchTags"),
	}

	_, err = svc.CreateTable(input)

	if err != nil {
		fmt.Println(err.Error())
		return "error calling CreateTable - " + err.Error(), 400
	}
	return "success", 200

}
