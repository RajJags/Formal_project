// // use cloud for contract variables
// const Web3 = require('web3');
// // const AWS = require('aws-sdk');

// // Connect to the Ethereum network
// const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

// // Load the ABI for the smart contract
// const contractABI = [
//     {
//       "inputs": [],
//       "stateMutability": "nonpayable",
//       "type": "constructor"
//     },
//     {
//       "inputs": [],
//       "name": "owner",
//       "outputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "string",
//           "name": "_username",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "_password",
//           "type": "string"
//         }
//       ],
//       "name": "register",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "string",
//           "name": "_username",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "_password",
//           "type": "string"
//         }
//       ],
//       "name": "login",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "_address",
//           "type": "address"
//         }
//       ],
//       "name": "checkIsUserLogged",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     }
//   ]; // Replace this with the actual ABI for your smart contract

// // Instantiate the smart contract object
// const contractAddress = "0x12468750A64Ca9Ce2419D090Ea667B9c8cF0930d"; // Replace this with the actual address of your smart contract
// const contract = new web3.eth.Contract(contractABI, contractAddress);

// // Get the user data from the smart contract
// const userId = 1; // Replace this with the ID of the user whose data you want to retrieve
// // const userData = await contract.methods.getUserData(userId).call();

// const userDetails = await contract.methods.getUserDetails(userAddress).call();

// // const userDetailObject = {
// //     addr: userDetails.addr,
// //     username: userDetails.username,
// //     password: userDetails.password,
// //     isUserLoggedIn: userDetails.isUserLoggedIn
// //   };

// // // Format the data
// // const formattedUserData = {
// //   name: userData.name,
// //   email: userData.email,
// //   address: userData.address,
// // // Format other data fields as needed
// // };

// // // Connect to the cloud storage service
// // const s3 = new AWS.S3({
// //   accessKeyId: 'YOUR_ACCESS_KEY_ID',
// //   secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
// // });

// // // Store the data in the cloud
// // const bucketName = 'my-bucket'; // Replace this with the name of your bucket
// // const key = `users/${userId}.json`;
// // const params = {
// //   Bucket: bucketName,
// //   Key: key,
// //   Body: JSON.stringify(userDetailObject),
// // };
// // await s3.putObject(params).promise();

// // console.log(`User data for user ${userId} stored in the cloud.`);

// /*
// const {Storage} = require('@google-cloud/storage');

// const storage = new Storage({
//   projectId: 'your-project-id',
//   keyFilename: '/path/to/keyfile.json'
// });

// const userDetails = {
//   addr: '0x1234567890123456789012345678901234567890',
//   username: 'John Doe',
//   password: 'mypassword',
//   isUserLoggedIn: true
// };

// const bucketName = 'your-bucket-name';
// const fileName = 'userDetails.json';

// const file = storage.bucket(bucketName).file(fileName);

// const json = JSON.stringify(userDetails);
// await file.save(json);
// */
// const { MongoClient } = require('mongodb');

// const uri = process.env.MONGODB_URI;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// async function storeUserDetails(userDetails) {
//   try {
//     await client.connect();
//     const database = client.db('your-database-name');
//     const collection = database.collection('userDetails');
//     await collection.insertOne(userDetails);
//     console.log('User details stored successfully');
//   } catch (err) {
//     console.error(err);
//   } finally {
//     await client.close();
//   }
// }

// const userDetailObject = {
//     addr: userDetails.addr,
//     username: userDetails.username,
//     password: userDetails.password,
//     isUserLoggedIn: userDetails.isUserLoggedIn
//   };

// storeUserDetails(userDetailObject);


const Web3 = require('web3');
const MongoClient = require('mongodb').MongoClient;

// set up web3 provider and contract address
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const contractAddress = '0x12468750A64Ca9Ce2419D090Ea667B9c8cF0930d';

// set up contract ABI
const contractABI = [
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_username",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_password",
        "type": "string"
      }
    ],
    "name": "register",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_username",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_password",
        "type": "string"
      }
    ],
    "name": "login",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "checkIsUserLogged",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// create contract instance
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

// set up MongoDB connection details
const mongoDBURI = process.env.MONGODB_URI;
const mongoDBDatabase = process.env.MONGODB_DATABASE;

// connect to MongoDB and insert user data
MongoClient.connect(mongoDBURI, (err, client) => {
  if (err) throw err;
  const db = client.db(mongoDBDatabase);
  const userDetails = contractInstance.methods.user(web3.eth.accounts[0]).call()
    .then((result) => {
      const userData = {
        username: result[1],
        password: result[2],
        isUserLoggedIn: result[3]
      };
      db.collection('userDetails').insertOne(userData, (err, res) => {
        if (err) throw err;
        console.log('User data inserted.');
        client.close();
      });
    })
    .catch((err) => {
      console.log(err);
      client.close();
    });
});
