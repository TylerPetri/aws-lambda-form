const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const awsConfig = {
  region: 'us-east-2',
  endpoint: 'http://localhost:8000',
};
AWS.config.update(awsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();
const table = 'Users';

router.get('/users', (req, res) => {
  const params = {
    TableName: table,
  };
  dynamodb.scan(params, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(data.Items);
    }
  });
});

router.post('/users', (req, res) => {
  const params = {
    TableName: table,
    Item: {
      Users: req.body.username,
      createdAt: Date.now(),
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
    },
  };
  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error(
        'Unable to add item. Error JSON:',
        JSON.stringify(err, null, 2)
      );
      res.status(500).json(err);
    } else {
      console.log('Added item:', JSON.stringify(data, null, 2));
      res.json({ Added: JSON.stringify(data, null, 2) });
    }
  });
});

module.exports = router;
