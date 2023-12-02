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


router.get('/get-products-count', async (req, res) =>
{
    let productsCount = await productQueries.getProductsCount()

    return res.status(200).json({ "count": productsCount });
})


router.post('/create', async (req, res) =>
{ 
    let { name, description, unit_price, url, postProductObject } = req.body
    

    productQueries.createProduct({
        name: name,
        description: description,
        unit_price: unit_price,
        url: url
    })

    return res.status(200).json({ "response": "ok" });

})
module.exports = router;
