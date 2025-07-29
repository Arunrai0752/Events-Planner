import nodemailer from 'nodemailer';

const sendEmail = async(to, subject, mailbody) => {
    try {
        const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSCODE,
        },
        });
    
        const mailOptions = { 
        from: process.env.GMAIL_USER,
        to: to,
        subject: subject,
        html: mailbody,
        };
    
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}