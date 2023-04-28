const nodemailer = require("nodemailer")

const msgTemplate = `
        <div>
            <h1>Welcome to XYZ Company</h1>
            <p>Dear User,</p>
            <p>
                We are thrilled to welcome you to XYZ Company As a valued customer,
                we want to make sure that you feel right at home from day one. We
                appreciate your trust in us and we're committed to providing you with
                excellent service and support.
            </p>
            <p>As a quick reminder, here are a few things you can expect from us:</p>
            <ul>
                <li>Quality products and services that meet your needs</li>
                <li>Clear and transparent communication</li>
                <li>Timely responses to your inquiries and concerns</li>
                <li>A friendly and knowledgeable team that is always here to help</li>
            </ul>
            <p>
                If you have any questions or concerns, please don't hesitate to reach out
                to us at <a href="mailto:example.com">xyz.com</a>. We're
                always happy to hear from you.
            </p>
            <p>
                Thank you for choosing us as your service provider.
                We look forward to serving you and building a long-lasting relationship
                with you.
            </p>
            <p>Best regards,</p>
            <p>xyz<br />xyz.com</p>
        </div>`


// async..await is not allowed in global scope, must use a wrapper
async function mailFunction(msgTemplate) {

    try {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL, // username
                pass: process.env.SMTP_PW, // password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `"Name here 👻" <${process.env.MAIL}>`, // from email must match mail from google smtp
            to: `${process.env.MAIL}`, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: msgTemplate, // html body
        });

        // console logs
        console.log("Message sent: %s", info.messageId);
        console.log("Message accepted", info.accepted);

    } catch (error) {
        console.group(error.message)
    }
}

const sendMail = async (req, res) => {
    // await mailFunction(msgTemplate)
    res.send('msg sent')
}

module.exports = { sendMail, mailFunction }