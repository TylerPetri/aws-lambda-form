const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const awsConfig = {
  region: 'us-east-2',
};
AWS.config.update(awsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();
const table = 'UserDB';

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

router.get('/users/:id', (req, res) => {
  const params = {
    TableName: table,
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
      ':id': req.params.id,
    },
    ScanIndexForward: false,
  };
  dynamodb.query(params, (err, data) => {
    if (err) {
      console.error('Unable to query. Error:', JSON.stringify(err, null, 2));
      res.status(500).json(err);
    } else {
      console.log('Query succeeded.');
      res.json(data.Items);
    }
  });
});

router.post('/users', (req, res) => {
  const params = {
    TableName: table,
    Item: {
      id: uuidv4(),
      Users: req.body.name,
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

router.post('/users/:createdAt/:id', (req, res) => {
  const params = {
    TableName: table,
    Key: {
      id: req.params.id,
      createdAt: parseFloat(req.params.createdAt),
    },
    UpdateExpression: 'set email = :email, phone = :phone, address = :address',
    ExpressionAttributeValues: {
      ':email': req.body.email,
      ':phone': req.body.phone,
      ':address': req.body.address,
    },
  };
  dynamodb.update(params, (err, data) => {
    if (err) {
      console.error(
        'Unable to update item. Error JSON:',
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log('UpdateItem succeeded:', JSON.stringify(data, null, 2));
    }
  });
});

router.delete('/users/:createdAt/:id', (req, res) => {
  const params = {
    TableName: table,
    Key: {
      id: req.params.id,
      createdAt: parseFloat(req.params.createdAt),
    },
  };
  dynamodb.delete(params, (err, data) => {
    if (err) {
      console.error(
        'Unable to delete item. Error JSON:',
        JSON.stringify(err, null, 2)
      );
      res.status(500).json(err);
    } else {
      console.log('Deleted item:', JSON.stringify(data, null, 2));
      res.json({ Deleted: JSON.stringify(data, null, 2) });
    }
  });
});

module.exports = router;
