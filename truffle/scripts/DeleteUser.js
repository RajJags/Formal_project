const Web3 = require("web3");
const authContractJson = require("C:/Users/rajag/formal_project/client/src/contracts/Auth.json");
const web3 = new Web3("http://localhost:7545");

const authContract = new web3.eth.Contract(
    authContractJson.abi,
    "0x3Ed5384E30713C8b82714371C2581273dD484E3e"
);

authContract.methods.deactivateAccount("0x68F73dDD106896fE876B265406FB6d95Fd843e92").send({ from: "0x809DbEa3428a23889E9C03D20D631711b2EbC1ED", gas: 3000000 })
    .then(function (receipt) {
        console.log(receipt);
    })
    .catch(function (error) {
        console.log(error);
    });
