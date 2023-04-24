const Web3 = require("web3");
const Contract = require("@truffle/contract");
const authContractJson = require("C:/Users/rajag/formal_project/client/src/contracts/Auth.json");
const web3 = new Web3("http://localhost:7545");
const axios = require('axios');

const authContract = new web3.eth.Contract(
    authContractJson.abi,
    "0x3Ed5384E30713C8b82714371C2581273dD484E3e"
);

let address;

web3.eth.getAccounts()
    .then(accounts => {
        address = accounts[0];
    })

const username = process.argv[2];
const password = process.argv[3];

let loginJwt = "0";

authContract.methods.login(username, password).send({ from: "0x68F73dDD106896fE876B265406FB6d95Fd843e92", gas: 3000000 })
    .then(function (receipt) {
        console.log(receipt);
        (axios.get('http://localhost:3000/generate-jwt', {
            params: {
                address: address,
                username: username
            }
        })
            .then(function (response) {
                const token = response.data;
                console.log(token);
            })
            .catch(function (error) {
                console.log(error);
            }));
    })
    .catch(function (error) {
        console.log(error);
    });

