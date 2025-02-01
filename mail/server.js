const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

// Middleware
app.use(bodyParser.json());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email provider or SMTP server
    auth: {
        user: 'e26386610@gmail.com', // Replace with your email
        pass: '(Jayentity303)'  // Replace with your email password or app-specific password
    }
});

// Email endpoint
app.post('/send-email', (req, res) => {
    const { name, email, contact, product, unit, qty, rate, amount } = req.body;

    // Email options
    const mailOptions = {
        from: 'jaiplast2008@gmail.com', // Sender email
        to: email, // Recipient email
        subject: 'Order Confirmation',
        text: `Hello ${name},\n\nYour order for ${qty} ${unit} of ${product} has been confirmed.\nTotal Amount: $${amount}\n\nThank you!`,
        html: `<h1>Order Confirmation</h1>
               <p>Hello ${name},</p>
               <p>Your order for <strong>${qty} ${unit} of ${product}</strong> has been confirmed.</p>
               <p><strong>Total Amount:</strong> $${amount}</p>
               <p>Thank you!</p>`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send({ message: 'Error sending email' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send({ message: 'Email sent successfully!' });
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
