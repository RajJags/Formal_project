const Web3 = require("web3");
const resContractJson = require("../../client/src/contracts/ResourceManagement.json");
const web3 = new Web3("http://localhost:7545");
const axios = require('axios');
const uploadFile = require('../../client/src/cloudstorage.js');

const resContract = new web3.eth.Contract(
    resContractJson.abi,
    "0xA7395d312f1b9258b1FaD9C26d27947D10AafF63"
);

const arg1 = process.argv[2];
const token = process.argv[3];

const file = "https://formalproject.blob.core.windows.net/userfiles/" + arg1; // append arg1 to this

const localFilePath = '../../client/Files/text.txt';

axios.get('http://localhost:3000/verify-jwt', {
    params: {
        token: token
    }
})
    .then(function (response) {
        const token = response.data;
        console.log(token);
        console.log("Access granted");
        // JWT is verified, execute the transaction
        resContract.methods.AddFiles(file).send({ from: "0x809DbEa3428a23889E9C03D20D631711b2EbC1ED", gas: 3000000 })
            .then(function (receipt) {
                console.log(receipt);
            })
            .catch(function (error) {
                console.log(error);
            });
        uploadFile.uploadFileToBlobStorage(localFilePath, "text")
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    })
    .catch(function (error) {
        console.log(error);
    });





