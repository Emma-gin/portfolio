const express = require('express');
const nodemailer = require('nodemailer');
const validator = require('validator');
const app = express();
require("dotenv").config();


const PORT = process.env.PORT || 8080;


app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});


const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 587,
    secure: false,


    auth: {
        user:process.env.USER ,
        pass: process.env.PASS,
    },

    // host: "smtp.mailtrap.io",
    // port: 2525,

    // auth: {
    //     user: process.env.USER,
    //     pass: process.env.PASS,
    // },
});


transporter.verify(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Server is ready to take our message");
    }
});

app.post('/', (req, res) => {
    let lastName = req.body.lastName;
    let firstName = req.body.firstName;
    let email = req.body.email;
    let subject = req.body.subject;
    let message = req.body.message;



    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: `Message from ${email}: ${subject}`,
        text: message
    }

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.log('error: ' + error)
        } 
        else if (!validator.isAlphanumeric(lastName)) {
            res.send('error last name')
        }
        else if (!validator.isAlphanumeric(firstName)) {
            res.send('error first name')
        }
        else if (!validator.isAlphanumeric(subject)) {
            res.send('error sujet')
        }
        else if (!validator.isAlphanumeric(message)) {
            res.send('error message')
        }
        else if (!validator.isEmail(email)) {
            res.send('error email')
        
        } else {
            res.send('success!!!')
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})