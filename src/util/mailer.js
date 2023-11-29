const nodemailer = require('nodemailer');
const fs = require('fs');

const sendInvoiceEmail = async (pdfFilePath, recipientEmail, subject, text) =>
{
    console.log(process.env.SENDER_EMAIL);
    console.log(process.env.SENDER_EMAIL_PASSWORD);

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_EMAIL_PASSWORD,
        },
    });

    // Read the PDF file
    const pdfAttachment = {
        filename: `${recipientEmail}_invoice.pdf`,
        content: fs.createReadStream(pdfFilePath),
    };

    // Email configuration
    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: process.env.RECIEVER_EMAIL,
        subject: "You Eat Ltd. Invoice!",
        text: "Hello dear customer, recieve this invoice with the items you have bought!",
        attachments: [pdfAttachment],
    };

    try
    {
        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error)
    {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = {
    sendInvoiceEmail
};
