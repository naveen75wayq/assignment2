
import nodemailer from 'nodemailer';
import { EMAIL, PASSWORD } from '../configs/loadEnv';

export const sendMail = (email: string, subject: string, title: string, description: string, deadLine: string) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    });

    var mailOptions = {
        from: EMAIL,
        to: email,
        subject: subject,
        html: `<h1>Task added successfully</h1><h2>
        Title: ${title}</h2><br/>
            <p>Description: ${description}</p
        <h3>DeadLine: ${deadLine}</h3>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}