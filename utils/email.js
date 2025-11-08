const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-specific-password'
    }
});

const sendEmail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER || 'your-email@gmail.com',
            to,
            subject,
            html
        });
        return true;
    } catch (error) {
        console.error('Email sending error:', error);
        return false;
    }
};

const sendOTPEmail = async (email, otp, purpose) => {
    let subject, html;

    if (purpose === 'verification') {
        subject = 'Email Verification OTP - Monick\'s Resume Builder';
        html = `
            <h1>Email Verification</h1>
            <p>Thank you for registering with Monick's Resume Builder!</p>
            <p>Your verification OTP is: <strong>${otp}</strong></p>
            <p>This OTP will expire in 10 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
        `;
    } else if (purpose === 'reset') {
        subject = 'Password Reset OTP - Monick\'s Resume Builder';
        html = `
            <h1>Password Reset Request</h1>
            <p>You requested to reset your password for Monick's Resume Builder.</p>
            <p>Your password reset OTP is: <strong>${otp}</strong></p>
            <p>This OTP will expire in 10 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
        `;
    }

    return await sendEmail(email, subject, html);
};

module.exports = {
    sendEmail,
    sendOTPEmail
};