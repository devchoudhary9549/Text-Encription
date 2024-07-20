'use strict';

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { encrypt, decrypt } = require('./encryption');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Debugging: Log the ENCRYPTION_KEY
console.log('ENCRYPTION_KEY:', process.env.ENCRYPTION_KEY);

app.get('/', (req, res) => {
    res.send(`
        <h1>Text Encryption</h1>
        <form action="/encrypt" method="post">
            <label for="text">Text to encrypt:</label>
            <input type="text" id="text" name="text">
            <button type="submit">Encrypt</button>
        </form>
        <form action="/decrypt" method="post">
            <label for="text">Text to decrypt:</label>
            <input type="text" id="text" name="text">
            <button type="submit">Decrypt</button>
        </form>
    `);
});

app.post('/encrypt', (req, res) => {
    const { text } = req.body;
    const encryptedText = encrypt(text);
    res.send(`Encrypted Text: ${encryptedText} <br> <a href="/">Back</a>`);
});

app.post('/decrypt', (req, res) => {
    const { text } = req.body;
    const decryptedText = decrypt(text);
    res.send(`Decrypted Text: ${decryptedText} <br> <a href="/">Back</a>`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
