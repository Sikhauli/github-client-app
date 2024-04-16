const Commit = require('./model');

exports.getAllCommits = async (req, res) => {
    try {
        const { name } = req.query;
        const commits = await Commit.find({ name });
        res.json(commits);
    } catch (error) {
        console.error('Error fetching commits:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.createCommit = async (req, res) => {
    console.log(req.body)
    try {
        const newCommit = new Commit(req.body);
        await newCommit.save();
        res.json(newCommit);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create commit' });
    }
};


