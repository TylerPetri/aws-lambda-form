'use strict';
const AWS = require('aws-sdk');
const awsConfig = {
  region: 'us-east-2',
};
AWS.config.update(awsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  // console.log(event.queryStringParameters)

  let body;
  let statusCode = '200';
  const headers = {
    'Content-Type': 'application/json',
  };

  const params = {
    TableName: 'UserDB',
    Key: {
      id: event.queryStringParameters.id,
      createdAt: parseFloat(event.queryStringParameters.ca),
    },
  };

  try {
    body = await dynamodb.delete(params).promise();
  } catch (err) {
    statusCode = '400';
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};
