const fs = require('fs');
const path = require('path');
const currentDate = new Date();

module.exports = function invoiceDataFormatter(products, customerData, isDraft)
{
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-GB', options);

    const logoBuffer = fs.readFileSync(path.join(__dirname, '../assets/images/logo.png'));
    const logoBase64 = logoBuffer.toString('base64');

    // Path to the locally saved watermark image
    let watermarkBase64
    let watermarkBuffer

    if (isDraft)
    {
        watermarkBuffer = fs.readFileSync(path.join(__dirname, '../assets/images/watermark-draft.jpg'))
        watermarkBase64 = watermarkBuffer.toString('base64')
    } else watermarkBase64 = null

        console.log(watermarkBase64);
    return (data = {
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
        client: customerData,
        products: products,
        "bottom-notice": 'See you soon!',
    });
};
