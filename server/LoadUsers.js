const AWS = require('aws-sdk');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

AWS.config.update({
  region: 'us-east-2',
});
const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
console.log('Importing Users into DynamoDB. Please wait.');
const allUsers = JSON.parse(fs.readFileSync('./seed.json', 'utf8'));
allUsers.forEach((user) => {
  const params = {
    TableName: 'UserDB',
    Item: {
      id: uuidv4(),
      Users: user.Users,
      createdAt: user.createdAt,
      email: user.email,
      phone: user.phone,
      address: user.address,
    },
  };
  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error(
        'Unable to add user',
        user.Users,
        '. Error JSON:',
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log('PutItem succeeded:', user.Users);
    }
  });
});
