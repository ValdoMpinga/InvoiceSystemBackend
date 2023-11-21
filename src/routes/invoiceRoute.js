"use strict";

const express = require("express");
const router = express.Router();
const easyinvoice = require('easyinvoice');
const fs = require('fs').promises;

const data = {
    documentTitle: 'Invoice',
    currency: 'USD',
    taxNotation: 'vat', // or gst
    marginTop: 25,
    marginRight: 25,
    marginLeft: 25,
    marginBottom: 25,
    // logo: 'path/to/your/logo', 
    sender: {
        company: 'Your Company',
        address: '123 Street',
        zip: '12345',
        city: 'City',
        country: 'Country',
    },
    client: {
        company: 'Client Company',
        address: '456 Street',
        zip: '54321',
        city: 'City',
        country: 'Country',
    },
    invoiceNumber: '2021001',
    invoiceDate: '01/01/2022',
    products: [
        { description: 'Product 1', quantity: 2, price: 10 },
        { description: 'Product 2', quantity: 1, price: 20 },
    ],
    bottomNotice: 'Thank you for your business!',
};


router.post('/create', async (req, res) =>
{
    const { a, b } = req.body;

    console.log(a);

    const result = await easyinvoice.createInvoice(data);

    // Save the PDF file in binary format
    const pdfFilePath = './invoice.pdf';
    const pdfBuffer = Buffer.from(result.pdf, 'base64');
    await fs.writeFile(pdfFilePath, pdfBuffer);
    console.log('Invoice PDF saved at:', pdfFilePath);

    return res.status(200).json({ message: 'Invoice created.' });
});

module.exports = router
