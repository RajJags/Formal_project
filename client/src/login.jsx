import { useState, useEffect } from "react";
import axios from "axios";
import Web3 from "web3";
import authContractJson from "C:/Users/rajag/formal_project/client/src/contracts/Auth.json";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function login() {
      const web3 = new Web3("http://localhost:7545");
      const authContract = new web3.eth.Contract(
        authContractJson.abi,
        "0x3Ed5384E30713C8b82714371C2581273dD484E3e"
      );

      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];

      try {
        const receipt = await authContract.methods
          .login(username, password)
          .send({ from: address, gas: 3000000 });

        axios
          .get("http://localhost:3000/generate-jwt", {
            params: {
              address: address,
              username: username,
            },
          })
          .then((response) => {
            const token = response.data;
            console.log(token);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
        setMessage("Invalid username or password");
      }
    }

    if (username && password) {
      login();
    }
  }, [username, password]);

  function handleSubmit(event) {
    event.preventDefault();
    setUsername("");
    setPassword("");
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;
