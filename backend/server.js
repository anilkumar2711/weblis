const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');

const app = express();
const PORT = 5000;
const client = new OAuth2Client("YOUR_GOOGLE_CLIENT_ID");

app.use(cors());
app.use(bodyParser.json());

let users = [];

app.post('/api/signup', (req, res) => {
    const {username,phone, email, password} = req.body;
    if (users.find(user => user.email === email)) {
        return res.status(400).json({ error: 'User already exists' });
    }
    users.push({username,phone, email, password});
    res.json({ message: 'User registered successfully' });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.post('/api/google-login', async (req, res) => {
  const { token } = req.body;
  try {
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: "YOUR_GOOGLE_CLIENT_ID"
      });
      const { email, name } = ticket.getPayload();
      
      let user = users.find(user => user.email === email);
      if (!user) {
          user = { username: name, email, phone: '', password: '' };
          users.push(user);
      }
      
      res.json({ message: 'Google login successful', user });
  } catch (error) {
      res.status(400).json({ error: 'Invalid Google token' });
  }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});