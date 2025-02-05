const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// In-memory stores (use a database in production)
const otpStore = {};
const userStore = {};

const app = express();
app.use(bodyParser.json());

// Configure Nodemailer transporter (update with your credentials)
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your-email@gmail.com',       // replace with your email
    pass: 'your-email-password'           // replace with your email password or app password
  }
});

// Signup Endpoint
app.post('/api/signup', (req, res) => {
  const { fullName, contact, password } = req.body;
  if (userStore[contact]) {
    return res.json({ success: false, message: 'User already exists.' });
  }
  
  // Save user (note: in production, hash the password)
  userStore[contact] = { fullName, password, verified: false };

  // Check if the contact is an email or mobile number
  if (contact.includes('@')) {
    // Generate email verification token
    const token = crypto.randomBytes(20).toString('hex');
    userStore[contact].verificationToken = token;

    // Create verification link (adjust the domain as needed)
    const verificationLink = `http://localhost:3000/api/verify-email?contact=${contact}&token=${token}`;
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: contact,
      subject: 'Email Verification',
      text: `Hello ${fullName}, please verify your email by clicking on the following link: ${verificationLink}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.json({ success: false, message: 'Error sending verification email.' });
      }
      return res.json({ success: true, message: 'Signup successful! Verification email sent.' });
    });
  } else {
    // Assume mobile: generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[contact] = otp;
    console.log(`OTP for ${contact}: ${otp}`);
    // Integrate with an SMS gateway (e.g., Twilio) to send the OTP in production.
    return res.json({ success: true, message: 'Signup successful! OTP sent to your mobile.', otpSent: true });
  }
});

// Email Verification Endpoint
app.get('/api/verify-email', (req, res) => {
  const { contact, token } = req.query;
  if (userStore[contact] && userStore[contact].verificationToken === token) {
    userStore[contact].verified = true;
    delete userStore[contact].verificationToken;
    return res.send('Email verified successfully!');
  }
  return res.send('Email verification failed.');
});

// OTP Verification Endpoint
app.post('/api/verify-otp', (req, res) => {
  const { contact, otp } = req.body;
  if (otpStore[contact] && otpStore[contact] === otp) {
    if (userStore[contact]) {
      userStore[contact].verified = true;
    }
    delete otpStore[contact];
    return res.json({ success: true, message: 'Mobile OTP verified successfully.' });
  }
  return res.json({ success: false, message: 'Invalid OTP.' });
});

// Login Endpoint
app.post('/api/login', (req, res) => {
  const { contact, password } = req.body;
  const user = userStore[contact];
  if (!user) {
    return res.json({ success: false, message: 'User not found.' });
  }
  if (user.password !== password) {
    return res.json({ success: false, message: 'Incorrect password.' });
  }
  if (!user.verified) {
    return res.json({ success: false, message: 'User not verified.' });
  }
  // In production, generate and return a JWT token.
  return res.json({ success: true, message: 'Login successful!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
