var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.render('index', { title: 'TruView' });
});

// to fetch data from internet in faq page
router.get("/faq", function(req, res, next) {
    res.send("respond with a resource");
});

// to send data to internet from form page
router.post("/form", function(req, res, next) {
    res.send(req);
});

module.exports = router;