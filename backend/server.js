const express = require('express');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');

const app = express();
const CLIENT_ID = '365690865739-3mf2s21thpv3kn2c1c3nit5496h0cjns.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

app.use(bodyParser.json());

// Verify ID token sent from the frontend
app.post('/verify', async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        });

        const payload = ticket.getPayload();
        console.log('User verified:', payload);

        // Respond with user information
        res.status(200).json({
            message: 'User verified successfully',
            user: payload,
        });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ message: 'Unauthorized' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
