"use strict";

const express = require("express");
const router = express.Router();
const easyinvoice = require('easyinvoice');
const fs = require('fs');

const invoiceDataFormatter = require('../util/invoiceDataFormatter');

const invoiceLineQueries = require('../database/invoiceLineQueries');
const invoiceQueries = require('../database/invoiceQueries');
const productQueries = require('../database/productQueries');
const customerQueries = require('../database/customerQueries');

router.post('/create', async (req, res) =>
{
    try
    {
        const { customer_id, products, is_payed } = req.body;
        let invoiceProducts = [];

        // Use map to create an array of promises
        const productPromises = products.map(async (product) =>
        {
            const { data, error } = await productQueries.getProductById(product.product_id);

            if (data && data.length > 0)
            {
                const productData = {
                    description: data[0].name,
                    quantity: product.product_quantity,
                    price: data[0].unit_price,
                    "tax-rate": 17
                };
                invoiceProducts.push(productData);
            }
        });

        // Use Promise.all to wait for all promises to resolve
        await Promise.all(productPromises);

        const { data, error } = await customerQueries.getCustomerById(customer_id);

        let customerData = data[0]
        delete customerData.id
        delete customerData.created_at

        // console.log(customerData);

        // Continue with the rest of your code...
        let invoiceData = invoiceDataFormatter(invoiceProducts,customerData);
        const result = await easyinvoice.createInvoice(invoiceData);

        // Save the PDF file in binary format
        const pdfFilePath = './invoice.pdf';
        const pdfBuffer = Buffer.from(result.pdf, 'base64');
        await fs.promises.writeFile(pdfFilePath, pdfBuffer);
        console.log('Invoice PDF saved at:', pdfFilePath);

        return res.status(200).json({ message: 'Invoice created.' });
    } catch (error)
    {
        console.error('Error creating invoice:', error.message);
        console.error('Stack trace:', error.stack);

        return res.status(500).json({ message: 'Internal server error', error: error.message, stack: error.stack });
    }
});

module.exports = router;
