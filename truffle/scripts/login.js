const Web3 = require("web3");
const Contract = require("@truffle/contract");
const authContractJson = require("C:/Users/rajag/formal_project/client/src/contracts/Auth.json");
const web3 = new Web3("http://localhost:7545");
const axios = require('axios');

const authContract = new web3.eth.Contract(
    authContractJson.abi,
    "0x582f649089a13E40C8e7fa360257C204540A4CF0"
);

let address;

web3.eth.getAccounts()
    .then(accounts => {
        address = accounts[0];
    })

const username = process.argv[2];
const password = process.argv[3];

let loginJwt = "0";

authContract.methods.login(username, password).send({ from: "0x809DbEa3428a23889E9C03D20D631711b2EbC1ED" })
   /* .then(function (receipt) {
        console.log(receipt);
    })*/
    .then(axios.get('http://localhost:3000/generate-jwt', {
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

