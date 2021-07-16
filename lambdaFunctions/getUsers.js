'use strict';
const AWS = require('aws-sdk');
const awsConfig = {
  region: 'us-east-2',
};
AWS.config.update(awsConfig);

exports.handler = async () => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: 'UserDB',
  };

  const data = await dynamodb.scan(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
