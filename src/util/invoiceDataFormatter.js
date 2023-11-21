const fs = require('fs');
const path = require('path');
const currentDate = new Date();

module.exports = function invoiceDataFormatter(products,customerData )
{
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-GB', options);
    const logoBuffer = fs.readFileSync(path.join(__dirname, '../assets/images/logo.png'));
    const logoBase64 = logoBuffer.toString('base64');

    return  data = {
        documentTitle: 'You Eat Ltd.',
        // marginTop: 25,
        // marginRight: 25,
        // marginLeft: 25,
        // marginBottom: 25,
        images: {
            logo: logoBase64,
        },
        information: {
            date: formattedDate
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
    };

}
