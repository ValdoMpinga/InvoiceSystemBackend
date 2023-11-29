"use strict";

const express = require("express");
const router = express.Router();
const path = require('path');

const invoiceLineQueries = require('../database/invoiceLineQueries');
const invoiceQueries = require('../database/invoiceQueries');
const productQueries = require('../database/productQueries');
const customerQueries = require('../database/customerQueries');
const { STATUS_ID } = require('../util/constants');
const { sendInvoiceEmail } = require('../util/mailer')

const fs = require('fs');
const {
    invoiceDataFormatter,
    invoiceTotal,
    createAndSaveInvoicePDF,
    invoicePdfDeleter
} = require('../util/invoice/invoiceHelpers');
const { log } = require("console");

router.post('/create', async (req, res) =>
{
    try
    {
        const { customer_email, products } = req.body;
        const invoiceProducts = await Promise.all(products.map(async (product) =>
        {
            const data = await productQueries.getProductById(product.product_id);
            if (data)
            {
                const { name, unit_price } = data;
                return {
                    product_id: product.product_id,
                    description: name,
                    quantity: product.product_quantity,
                    price: unit_price,
                    "tax-rate": 17
                };
            }
        }));

        let customerData = await customerQueries.getCustomerByEmail(customer_email);

        const insertedInvoiceId = await invoiceQueries.createInvoice({
            customer_id: customerData.id,
            status_id: STATUS_ID.PAID,
            total_amount: invoiceTotal(invoiceProducts)
        });


        await Promise.all(invoiceProducts.map((product) =>
            invoiceLineQueries.createInvoiceLine({
                quantity: product.quantity,
                unit_price: product.price,
                invoice_id: insertedInvoiceId,
                product_id: product.product_id
            })
        ));

        let filePath = path.join(__dirname, `../../invoice/${customer_email}_invoice.pdf`);

        const invoiceData = await invoiceDataFormatter(invoiceProducts, customerData, false);
        await createAndSaveInvoicePDF(invoiceData, filePath);

        
        let email_subject = "You Eat Ltd. Invoice!"
        let email_text = "Hello dear customer, recieve this invoice with the items you have bought!"
        let email_recipient = process.env.RECIEVER_EMAIL

        sendInvoiceEmail(filePath, email_recipient, email_subject, email_text).then(() =>
        {
            console.log("Email sent successfully to ", email_recipient);
            invoicePdfDeleter(filePath)
        })

        return res.status(200).json({ inserted_invoice_id: insertedInvoiceId });

    } catch (error)
    {
        console.error('Error retrieving invoice:', error.message);
        console.error('Stack trace:', error.stack);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
            stack: error.stack
        });
    }
});

router.post('/get', async (req, res) =>
{
    try
    {
        const { invoice_id } = req.body;
        let products = [];
        let invoiceCustomerData;
        let customer;
        let product;


        let invoice = await invoiceQueries.getInvoiceById(invoice_id);
        let invoiceLines = await invoiceLineQueries.getInvoiceLineById(invoice_id);
        // console.log(invoiceLines);

        for (const [index, line] of invoiceLines.entries())
        {

            customer = await customerQueries.getCustomerById(invoice.customer_id);
            product = await productQueries.getProductById(line.product_id);

            products.push({
                "description": product.name,
                "quantity": line.quantity,
                "price": line.unit_price,
                'tax-rate': 17
            });
        }

        console.log(customer);
        invoiceCustomerData = {
            company: customer.name,
            address: customer.address,
            zip: customer.zip,
            country: customer.country,
            email: customer.email,
            phone: customer.phone,
            city: customer.city,
        };

        let filePath = path.join(__dirname, `../../invoice/${customer.email}_invoice.pdf`);

        const invoiceData = await invoiceDataFormatter(products, invoiceCustomerData, false);
        await createAndSaveInvoicePDF(invoiceData, filePath);


        // Read the file into a buffer
        const fileBuffer = fs.readFileSync(filePath);

        // Convert the buffer to a base64 string
        const base64String = fileBuffer.toString('base64');

        // Send the base64 string in the response
        res.send(base64String);

        invoicePdfDeleter(filePath)

    } catch (error)
    {
        console.error('Error fetching invoice:', error.message);
        console.error('Stack trace:', error.stack);
        return res.status(500).json({ message: 'Internal server error', error: error.message, stack: error.stack });
    }
});



module.exports = router;
