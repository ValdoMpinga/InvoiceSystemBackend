"use strict";

const express = require("express");
const router = express.Router();
const productQueries = require('../database/productQueries');


router.get('/get', async (req, res) =>
{
    try
    {
        console.log("in");

        let products = await productQueries.getAllProducts()

        console.log("retrieving products");
        return res.status(200).json({ products });
    } catch (e)
    {
        console.log(e);
        return res.status(500).json({ message: 'Internal server error', error: error.message, stack: error.stack });

    }
})

module.exports = router;
