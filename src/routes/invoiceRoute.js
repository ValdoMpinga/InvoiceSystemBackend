"use strict";

const express = require("express");
const router = express.Router();

const invoiceLineQueries = require('../database/invoiceLineQueries');
const invoiceQueries = require('../database/invoiceQueries');
const productQueries = require('../database/productQueries');
const customerQueries = require('../database/customerQueries');
const { STATUS_ID } = require('../util/constants');

const { 
    saveInvoicePDF,
    invoiceDataFormatter,
    invoiceTotal,
    createAndSaveInvoicePDF,
} = require('../util/invoice/invoiceHelpers');

router.post('/create', async (req, res) =>
{
    try
    {
        const { customer_id, products } = req.body;
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

        const { data } = await customerQueries.getCustomerById(customer_id);
        const customerData = { ...data };
        delete customerData.id;
        delete customerData.created_at;

        const insertedInvoiceId = await invoiceQueries.createInvoice({
            customer_id,
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

        const invoiceData = await invoiceDataFormatter(invoiceProducts, customerData, true);
        await createAndSaveInvoicePDF(invoiceData, true);

        return res.status(200).json({ message: 'Invoice created.' });
    } catch (error)
    {
        console.error('Error creating invoice:', error.message);
        console.error('Stack trace:', error.stack);
        return res.status(500).json({ message: 'Internal server error', error: error.message, stack: error.stack });
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

        invoiceCustomerData = {
            name: customer.name,
            email: customer[0].email,
            phone: customer[0].email,
            address: customer[0].address,
            zip: customer[0].zip,
            city: customer[0].city,
            country: customer[0].country
        };

        const invoiceData = await invoiceDataFormatter(products, invoiceCustomerData, false);
        await createAndSaveInvoicePDF(invoiceData, false);

        return res.status(200).json({ message: 'Invoice fetched.' });
    } catch (error)
    {
        console.error('Error fetching invoice:', error.message);
        console.error('Stack trace:', error.stack);
        return res.status(500).json({ message: 'Internal server error', error: error.message, stack: error.stack });
    }
});


module.exports = router;
