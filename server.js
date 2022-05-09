const express = require("express");
const nodemailer = require("nodemailer");
const validator = require("validator");
const app = express();
require("dotenv").config();
const cors = require("cors");
const res = require("express/lib/response");

const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(express.static("public"));
app.use(express.json());

// app.get("/", (req, res) => {
//     console.log(req.body);
//     res.json("OK API");
// });

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 465,
    secure: true,
    logger: true,
    debug: true,
    ignoreTLS: true,

    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
});

transporter.verify(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Server is ready to take our message");
    }
});

app.post("/", (req, res) => {
    //

    let lastName = req.body.lastName;
    let firstName = req.body.firstName;
    let email = req.body.email;
    let subject = req.body.subject;
    let message = req.body.message;

    // res.json(req.body);
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: `Message de: ${email}, Objet: ${subject}`,
        text: `<p style="padding:2%">${message}</p>`,
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.log("error: " + error);
        } else if (!validator.isAlphanumeric(lastName)) {
            res.send("error last name");
        } else if (!validator.isAlphanumeric(firstName)) {
            res.send("error first name");
        } else if (!validator.isAlphanumeric(subject)) {
            res.send("error sujet");
        } else if (!validator.isEmail(email)) {
            res.send("error email");
        } else {
            res.send("success!!!");
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
