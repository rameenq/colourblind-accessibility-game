const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(express.json());

app.post('/submit', (req, res) => {
  const entry = req.body;
  const dataPath = path.join(__dirname, 'data', 'scores.json');

  // Create data directory if it doesn't exist
  if (!fs.existsSync(path.dirname(dataPath))) {
    fs.mkdirSync(path.dirname(dataPath));
  }

  const scores = fs.existsSync(dataPath)
    ? JSON.parse(fs.readFileSync(dataPath, 'utf8'))
    : [];

  scores.push(entry);
  fs.writeFileSync(dataPath, JSON.stringify(scores, null, 2));
  res.json({ status: 'success' });
});

app.get('/submissions', (req, res) => {
  const dataPath = path.join(__dirname, 'data', 'scores.json');
  const scores = fs.existsSync(dataPath)
    ? JSON.parse(fs.readFileSync(dataPath, 'utf8'))
    : [];

  res.json(scores);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

