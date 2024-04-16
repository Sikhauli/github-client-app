const {
    getCallback
} = require("./controller");
const router = require("express").Router();

// GET request to fetch callbacks
router.get('/', getCallback);


module.exports = router;
