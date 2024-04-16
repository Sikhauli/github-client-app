const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;
const axios = require('axios');

exports.getCallback = async (req, res) => {
    const { code } = req.query;

    try {
        // Exchange code for access token
        const response = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: code,
            redirect_uri: REDIRECT_URI,
        }, {
            headers: {
                Accept: 'application/json',
            },
        });
        const { access_token } = response.data;
        res.json({ access_token });
    } catch (error) {
        console.error('Error exchanging code for token:', error);
        res.status(500).json({ error: 'Failed to exchange code for token' });
    }
};