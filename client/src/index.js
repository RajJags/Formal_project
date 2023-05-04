const express = require('express');
const app = express();
const path = require('path');
const Web3 = require('web3');
const authContractJson = require('./contracts/Auth.json');
const jwt = require('jsonwebtoken');
const secretKey = 'mysecretkey';

// Set up web3
const web3 = new Web3('http://localhost:7545');
const authContract = new web3.eth.Contract(
  authContractJson.abi,
  '0x3Ed5384E30713C8b82714371C2581273dD484E3e'
);

// Serve static files
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Register user
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  try {
    const result = await authContract.methods
      .register(username, password)
      .send({ from: '0x68F73dDD106896fE876B265406FB6d95Fd843e92', gas: 3000000 });
    console.log(result);
    res.send('Registration successful');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering user');
  }
});

// Login user and return JWT
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  let loginJwt = '';

  try {
    const result = await authContract.methods
      .login(username, password)
      .send({ from: '0x68F73dDD106896fE876B265406FB6d95Fd843e92', gas: 3000000 });

    console.log(result);

    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];

    const payload = { address: address, username: username };
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    loginJwt = token;
  } catch (err) {
    console.error(err);
    res.status(500).send('Error logging in user');
    return;
  }

  res.json({ token: loginJwt });
});

// Verify JWT
app.get('/verify-jwt', (req, res) => {
  const token = req.query.token;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.status(401).send('Invalid token');
    } else {
      res.send(decoded);
    }
  });
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Start the server
app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
