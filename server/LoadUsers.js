const AWS = require('aws-sdk');
const fs = require('fs');
AWS.config.update({
  region: 'us-east-2',
  endpoint: 'http://localhost:8000',
});
const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
console.log('Importing Users into DynamoDB. Please wait.');
const allUsers = JSON.parse(fs.readFileSync('./seed.json', 'utf8'));
allUsers.forEach((user) => {
  const params = {
    TableName: 'Users',
    Item: {
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
