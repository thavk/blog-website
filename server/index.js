// 1. Load Express library
const express = require('express');

// 2. Create a new Express app (your server)
const app = express();

// 3. Define a route /ping that sends back JSON { message: "pong" }
app.get('/ping', (req, res) => {
  res.json({ message: "pong" });
});

// 4. Start listening on port 5000

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
