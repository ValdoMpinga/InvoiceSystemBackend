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

router.post('/get-by-id', async (req, res) =>
{
    try
    {
        const { customer_id } = req.body;

        let customer = await customerQueries.getCustomerById(customer_id)

        console.log("retrieving single customer by id");

        return res.status(200).json({ customer });
    } catch (e)
    {
        console.log(e);
        return res.status(500).json({ message: 'Internal server error', error: error.message, stack: error.stack });
    }
})

router.get('/get-customers-count', async (req, res) =>
{ 
    let customerCount = await customerQueries.getNumberOfCustomers()

    return res.status(200).json({ "count": customerCount });
})



module.exports = router;
