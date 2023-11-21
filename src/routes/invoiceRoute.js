"use strict";

const express = require("express");
const router = express.Router();
const easyinvoice = require('easyinvoice');
const fs = require('fs');

const supabase = require('../database/supabase'); // adjust the path based on your project structure
const invoiceDataFormatter = require('../util/invoiceDataFormatter');

router.post('/create', async (req, res) =>
{
    try
    {
        const { customer_id, products, is_payed } = req.body;

        let invoiceData = invoiceDataFormatter();
        // console.log(invoiceData);
        const result = await easyinvoice.createInvoice(invoiceData);

        // Save the PDF file in binary format
        const pdfFilePath = './invoice.pdf';
        const pdfBuffer = Buffer.from(result.pdf, 'base64');
        await fs.promises.writeFile(pdfFilePath, pdfBuffer);
        console.log('Invoice PDF saved at:', pdfFilePath);

        return res.status(200).json({ message: 'Invoice created.' });
    }catch (error)
    {
        console.error('Error creating invoice:', error.message);
        console.error('Stack trace:', error.stack);

        return res.status(500).json({ message: 'Internal server error', error: error.message, stack: error.stack });
    }

});

module.exports = router;
