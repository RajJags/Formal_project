const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

// Secret key for signing JWTs
const secretKey = 'mysecretkey';

//Generate-JWT
app.get('/generate-jwt', (req, res) => {
    const { address, username } = req.query;
    const payload = { address: address, username: username };
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
    res.send(token);
})

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

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
