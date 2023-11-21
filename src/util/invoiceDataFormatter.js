const fs = require('fs');
const path = require('path');
const currentDate = new Date();

module.exports = function invoiceDataFormatter()
{
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-GB', options);
    const logoBuffer = fs.readFileSync(path.join(__dirname, '../assets/images/logo.png'));
    const logoBase64 = logoBuffer.toString('base64');

    return  data = {
        documentTitle: 'You Eat Ltd.',
        currency: 'EUR',
        taxNotation: 'vat',
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
        client: {
            name: "John Doe",
            email: 'email',
            phone: '9111111',
            zip: '12345',
            city: 'Viana Do Castelo',
            country: 'Portugal',
        },
        products: [
            { description: 'Product 1', quantity: 2, price: 10 },
            { description: 'Product 2', quantity: 1, price: 20 },
        ],
        "bottom-notice": 'See you soon!',
    };

}
