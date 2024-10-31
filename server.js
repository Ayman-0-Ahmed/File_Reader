const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
let pythonMessages = [];
let webpageMessages = [];

app.use(express.static('public'));
app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    res.json({ message: 'File uploaded successfully!', filename: req.file.filename });
    console.log('Received from Python:', req.file.filename);
});


app.post('/receive-data-from-python', (req, res) => {
    const receivedMessage = req.body.message;
    console.log(receivedMessage);
    pythonMessages.push(receivedMessage);
    res.json({ message: 'Python message received successfully!' });
});

app.get('/get-python-messages', (req, res) => {
    res.json({ messages: pythonMessages });
});

app.post('/clear-python-messages', (req, res) => {
    pythonMessages = [];
    res.json({ message: 'Python messages cleared.' });
});

app.post('/send-to-python', async (req, res) => {
    const messageFromWebpage = req.body.message;
    console.log('Received from Webpage:', messageFromWebpage);
    webpageMessages.push(messageFromWebpage);

    res.json({ message: 'Message from webpage received successfully!' });
});

app.get('/get-webpage-messages', (req, res) => {
    res.json({ messages: webpageMessages });
});

app.post('/clear-webpage-messages', (req, res) => {
    webpageMessages = [];
    res.json({ message: 'Webpage messages cleared.' });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Node.js server running at http://localhost:${port}`);
});
