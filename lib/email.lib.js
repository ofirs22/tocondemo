require('dotenv').config();

const email_welcome = (data) => {
    const email = ``
    return email
}

const forgot_password = (data) => {
    const email = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Forgot Password</title>
    </head>
    
    <body style="font-family: 'Arial', sans-serif;">
    
        <h2>Forgot Your Password?</h2>
        <p>Hello ${data.adminName},</p>
        <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
        <p>To reset your password, click the link below:</p>
        <p><a href="https://admin.tocon.io/admin/password?token=${data.resetLinkToken}">Reset Password</a></p>
        <p>If the link doesn't work, copy and paste the following URL into your browser: https://admin.tocon.io/admin/password?token=${data.resetLinkToken}</p>
        <p>This link will expire in 15 minutes.</p>
        <p>Thank you,<br>Your Company Name</p>
    
    </body>
    
    </html>
    `
    return email;
}
const createCode = (data) => {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Create Password</title>
    </head>
    
    <body style="font-family: 'Arial', sans-serif">
    
        <h2>Welcome to Tocon.io!</h2><br>
        <p>Hello ${data.userName},</p><br>
        <p>Thank you for creating an account with us. To set up your password and complete the registration process, copy the code below and paste it in the designated place:</p>
        <br>
        <h2 style = "color:blue">${data.loginCode}</h2>
    
    </body>
    
    </html>
    `

}
const reset_password = (data) => {
    const email = ``
    return email;
}

exports.sendEmail = async(emailOptions) => {
    const transporter = require('../config/mail.config.js');
    try {
        let emailTransporter = await transporter.createTransporter();

        const result = await emailTransporter.sendMail(emailOptions);
        console.log(result, "result");

    } catch (err) {
       return err;
    }

};

exports.getEmailTemplate = function(templateName, data) {
    switch (templateName) {
        case 'email_welcome':
            return email_welcome(data);
            break;
        case 'forgot_password':
            return forgot_password(data);
            break;
        case 'reset_password':
            return reset_password(data);
            break;
        case 'init_admin':
            return createCode(data);
            break;
        default:
            return null;
    }
}