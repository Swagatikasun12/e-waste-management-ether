const express = require("express");
const router = new express.Router();

router.post("/api/verify", (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", "*");

    console.log("Received Verification Payload", req.body.payload);

    res.status(200).send({
        message: "Verification Successful!",
        status: true,
    });
});

module.exports = router;
