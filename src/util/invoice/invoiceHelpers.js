// invoiceHelpers.js
const easyinvoice = require('easyinvoice');
const fs = require('fs');
const path = require('path');
const currentDate = new Date();

function saveInvoicePDF(pdfData, filePath)
{
    
    const pdfBuffer = Buffer.from(pdfData, 'base64');
    fs.writeFileSync(filePath, pdfBuffer);
    console.log('Invoice PDF saved at:', filePath);
}

async function createAndSaveInvoicePDF(invoiceData, filePath)
{
    const result = await easyinvoice.createInvoice(invoiceData);
    saveInvoicePDF(result.pdf, filePath);
}


function invoiceTotal(products)
{
    if (!Array.isArray(products))
    {
        throw new Error('Input must be an array of products');
    }

    // Calculate the total amount by summing the product of quantity and price for each item
    const totalAmount = products.reduce((total, product) =>
    {
        const itemTotal = product.quantity * product.price;
        return total + itemTotal;
    }, 0);

    return totalAmount;
}

function invoiceDataFormatter(products, customerData, isDraft)
{
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-GB', options);

    const logoBuffer = fs.readFileSync(path.join(__dirname, '../../assets/images/logo.png'));
    const logoBase64 = logoBuffer.toString('base64');

    let organizedCustomerData = {
        company: customerData.name,
        address: customerData.address,
        zip: customerData.zip,
        city: customerData.city,
        country: customerData.country,
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone,
    }
    // Path to the locally saved watermark image
    let watermarkBase64
    let watermarkBuffer

    if (isDraft)
    {
        watermarkBuffer = fs.readFileSync(path.join(__dirname, '../../assets/images/watermark-draft.jpg'))
        watermarkBase64 = watermarkBuffer.toString('base64')
    } else watermarkBase64 = null

    let invoiceData = {
        documentTitle: 'You Eat Ltd.',
        images: {
            logo: logoBase64,
            background: watermarkBase64, // Add the watermark image
        },
        information: {
            date: formattedDate,
        },
        sender: {
            company: 'Your Eat Ltd',
            address: '456 Avenue',
            zip: '4900-567',
            city: 'Viana Do Castelo',
            country: 'Portugal',
        },
        settings: { locale: 'de-DE', currency: 'EUR' },
        client: organizedCustomerData,
        products: products,
        "bottom-notice": 'See you soon!',
    };

    console.log(invoiceData);
    return invoiceData
};

module.exports = {
    saveInvoicePDF,
    createAndSaveInvoicePDF,
    invoiceTotal,
    invoiceDataFormatter
};
