const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const chatbotRouter = require('./router.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve UI files (ui.html, style.css, embed.js) under /chatbot/*
app.use('/chatbot', express.static(path.join(__dirname)));

// Register chatbot API routes
chatbotRouter(app);

app.get('/health', (req, res) => res.json({status:'ok'}));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Chatbot API listening on port ${PORT}`);
});
