const Web3 = require("web3");
const Contract = require("@truffle/contract");
const resContractJson = require("../../client/src/contracts/ResourceManagement.json");
const web3 = new Web3("http://localhost:7545");
const axios = require('axios');

const resContract = new web3.eth.Contract(
    resContractJson.abi,
    "0xC3FB71fE8cA687fd6a5bf1aE66eB29dBB1fEcc6a"
);

const token = process.argv[2];

resContract.methods.AccessFiles("0x809DbEa3428a23889E9C03D20D631711b2EbC1ED").call()
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

