const axios = require('axios');

exports.getReposSum = async (req, res) => {
    try {
        // Retrieve repositories data
        const reposResponse = await axios.get('https://api.github.com/user/repos', {
            headers: {
                Authorization: `token ${req.headers.token}`,
            },
        });
        const repositories = reposResponse.data;

        // Retrieve starred repositories
        const starredResponse = await axios.get('https://api.github.com/user/starred', {
            headers: {
                Authorization: `token ${req.headers.token}`,
            },
        });
        const starredRepos = starredResponse.data;

        // Retrieve user followers and following
        const userResponse = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `token ${req.headers.token}`,
            },
        });
        const user = userResponse.data;

        // Construct response object
        const userData = {
            repositories,
            starredRepos,
            followers: user.followers,
            following: user.following,
            totalRepos: repositories.length,
        };

        // Send response
        res.json(userData);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};