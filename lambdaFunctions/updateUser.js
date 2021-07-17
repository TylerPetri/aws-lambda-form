'use strict';
const AWS = require('aws-sdk');
const awsConfig = {
  region: 'us-east-2',
};
AWS.config.update(awsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  //   console.log(JSON.parse(event.body))

  let body;
  let statusCode = '200';
  const headers = {
    'Content-Type': 'application/json',
  };

  body = JSON.parse(event.body);

  const params = {
    TableName: 'UserDB',
    Key: {
      id: body.id,
      createdAt: body.createdAt,
    },
    UpdateExpression: 'set email = :email, phone = :phone, address = :address',
    ExpressionAttributeValues: {
      ':email': body.email,
      ':phone': body.phone,
      ':address': body.address,
    },
  };

  try {
    body = await dynamodb.update(params).promise();
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
