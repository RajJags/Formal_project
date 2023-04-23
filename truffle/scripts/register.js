const Web3 = require("web3");
const authContractJson = require("C:/Users/rajag/formal_project/client/src/contracts/Auth.json");
const web3 = new Web3("http://localhost:7545");

const authContract = new web3.eth.Contract(
    authContractJson.abi,
    "0x582f649089a13E40C8e7fa360257C204540A4CF0"
);

const username = process.argv[2];
const password = process.argv[3];


authContract.methods.register(username, password).send({ from: "0x809DbEa3428a23889E9C03D20D631711b2EbC1ED" })
    .then(function (receipt) {
        console.log(receipt);
    });

