'use strict';
const AWS = require('aws-sdk');
const awsConfig = {
  region: 'us-east-2',
};
AWS.config.update(awsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  // console.log(JSON.parse(event.body))
  // return(event)

  let body;
  let statusCode = '200';
  const headers = {
    'Content-Type': 'application/json',
  };

  body = JSON.parse(event.body);

  const params = {
    TableName: 'UserDB',
    Item: {
      id: body.id,
      Users: body.name,
      createdAt: Date.now(),
      email: body.email,
      phone: body.phone,
      address: body.address,
    },
  };

  try {
    body = await dynamodb.put(params).promise();
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
