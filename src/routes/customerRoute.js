"use strict";

const express = require("express");
const router = express.Router();
const customerQueries = require('../database/customerQueries');

router.get('/get', async (req, res) =>
{
    try
    {
        let customers = await customerQueries.getAllCustomers()

        console.log("retrieving products");
        return res.status(200).json({ customers });
    } catch (e)
    {
        console.log(e);
        return res.status(500).json({ message: 'Internal server error', error: error.message, stack: error.stack });
    }
})

module.exports = router;
