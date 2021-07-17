'use strict';
const AWS = require('aws-sdk');
const awsConfig = {
  region: 'us-east-2',
};
AWS.config.update(awsConfig);

exports.handler = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  let id = '';

  if (event.queryStringParameters && event.queryStringParameters.id) {
    console.log('Received id: ' + event.queryStringParameters.id);
    id = event.queryStringParameters.id;
  }

  const params = {
    TableName: 'UserDB',
    ProjectionExpression: '#ca, #un, #em, #ph, #ad, #id',
    KeyConditionExpression: '#id = :id',
    ExpressionAttributeNames: {
      '#id': 'id',
      '#un': 'Users',
      '#ca': 'createdAt',
      '#em': 'email',
      '#ph': 'phone',
      '#ad': 'address',
    },
    ExpressionAttributeValues: {
      ':id': id,
    },
    ScanIndexForward: false,
  };

  const res = await dynamodb.query(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(res),
  };
};
