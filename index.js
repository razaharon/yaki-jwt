require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const jwtMiddleware = require('./jwt.middleware');

const app = express();
app.use(express.json())


app.post('/register', (req, res) => {
    const { email, password } = req.body;
    const token = jwt.sign({ id: Date.now(), email, password }, process.env.SECRET);
    return res.send({ token });
})

app.use(jwtMiddleware);

app.get('/login', (req, res) => {
    return res.send(req.user);
});

app.listen(3000, () => console.log('listening on port 3000'));