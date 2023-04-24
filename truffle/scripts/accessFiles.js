const Web3 = require("web3");
const resContractJson = require("../../client/src/contracts/ResourceManagement.json");
const web3 = new Web3("http://localhost:7545");
const axios = require('axios');
const downloadFile = require('./cloudstorage.js');


const resContract = new web3.eth.Contract(
    resContractJson.abi,
    "0xA7395d312f1b9258b1FaD9C26d27947D10AafF63"
);

const token = process.argv[2];

resContract.methods.AccessFiles("0x68F73dDD106896fE876B265406FB6d95Fd843e92").call()
    .then(function (files) {
        console.log(files);
    })
    .then(axios.get('http://localhost:3000/verify-jwt', {
        params: {
            token: token
        }
    })
        .then(function (response) {
            const token = response.data;
            console.log(token);
            console.log("Access granted");
        })
        .catch(function (error) {
            console.log(error);
        }));

