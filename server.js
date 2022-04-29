const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
require("dotenv").config();


const PORT = process.env.PORT || 5000;


app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});

app.post('/', (req, res) => {
    console.log(req.body)
    lastName = req.body.lastName;
    firstName = req.body.firstName;
    email = req.body.email;
    subject = req.body.subject;
    message = req.body.message;

    const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,

        // service: "gmail",
    
        auth: {
            user: "contact@emma-dufrenay.com",
            pass: process.env.PASSWORD,
        },
    })

    const mailOptions = {
        from:req.body.email,
        to: 'contact@emma-dufrenay.com',
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('error: ' + error)
        } else {
            console.log('Email sent: ' + info)
            res.send('success')
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})