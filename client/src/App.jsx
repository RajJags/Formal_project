import { useState } from "react";
import axios from 'axios';
import Web3 from "web3";
import authContractJson from "C:/Users/rajag/formal_project/client/src/contracts/Auth.json";
import "./styles.css";
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const web3 = new Web3("http://localhost:7545");

    const authContract = new web3.eth.Contract(
      authContractJson.abi,
      "0x3Ed5384E30713C8b82714371C2581273dD484E3e"
    );

    authContract.methods
      .register(username, password)
      .send({
        from: "0x68F73dDD106896fE876B265406FB6d95Fd843e92",
        gas: 3000000,
      })
      .then(function (receipt) {
        console.log("Registration successful!");
        console.log("Transaction hash:", receipt.transactionHash);
        console.log("Block number:", receipt.blockNumber);
        console.log(receipt);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
  );
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const web3 = new Web3("http://localhost:7545");

    const authContract = new web3.eth.Contract(
      authContractJson.abi,
      "0x3Ed5384E30713C8b82714371C2581273dD484E3e"
    );

    const address = "0x68F73dDD106896fE876B265406FB6d95Fd843e92";

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
            navigate('/files', { state: { token: token } });
          })
          .catch(function (error) {
            console.log(error);
          }));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Login</button>
      <br />
      <span>{message}</span>
    </form>
  );
}

function DeleteAccount() {
  function handleSubmit(event) {
    event.preventDefault();

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
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Delete Account</button>
    </form>
  );
}



function App() {
  return (
    <div>
      <RegistrationForm />
      <Login />
      <DeleteAccount />
    </div>
  );
}

export default App;
