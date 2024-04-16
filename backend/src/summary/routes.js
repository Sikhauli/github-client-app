const {
    getReposSum
} = require("./controller");
const router = require("express").Router();

// GET request to fetch all repos summary
router.get('/', getReposSum);


module.exports = router;
