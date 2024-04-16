const {
    getAllCommits,
    createCommit
} = require("./commitController");
const router = require("express").Router();

// GET request to fetch all commits on DB
router.get('/all', getAllCommits);

// POST request to mark commit as read
router.post('/status', createCommit);


module.exports = router;
