"use strict";

const express = require("express");
const router = express.Router();

router.post('/create', async (req, res) =>
{
    const { a, b } = req.body;

    console.log(a);

    return res.status(200).json({ message: 'Invoice created.' });
});

module.exports = router
