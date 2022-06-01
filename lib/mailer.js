

const nodemailer = require('nodemailer');

exports.sendConfirmationEmail = function({toUser, id, userRequest}){
    return new Promise((res, rej)=>{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GOOGLE_USER,
                pass: process.env.GOOGLE_PASSWORD,
            }
        })
        let message;
        if(userRequest === 'register'){
            message = {
                from: process.env.GOOGLE_USER,
                to:  process.env.GOOGLE_USER,
                //to: toUser.email---inProduction
                subject: 'Your Account has been activated',
                html: `
                <h3>Hello ${toUser}</h3>
                <p>Thank you for registering your account. Just one more step...</p>
                <p>To activate your account, please follow on this link:</p> <a target="'_" href='${process.env.VERCEL_URL}/api/users/activate/${id}'>Activate Account</a>
                <p>Bedankt,</p>
                <p>RnG Diving</p>
            
            `
            }
        }
        if(userRequest === 'password'){
            message = {
                from: process.env.GOOGLE_USER,
                to:  process.env.GOOGLE_USER,
                //to: toUser.email---inProduction
                subject: 'Follow this link to reset your password',
                html: `
                <h3>Hello ${toUser}</h3>
                
                <a>To reset your password, please follow on this link: </p><a target="'_" href='${process.env.VERCEL_URL}/reset/password/${id}'>Reset Password</a>
                <p>Bedankt,</p>
                <p>RnG Diving</p>
            
            `
            }
        }
        if(userRequest === 'username'){
            message = {
                from: process.env.GOOGLE_USER,
                to:  process.env.GOOGLE_USER,
                //to: toUser.email---inProduction
                subject: 'Follow this link to retrieve your username',
                html: `
                <h3>Hello ${toUser}</h3>
                
                <a>To retrieve your username, please follow on this link:</p> <a target="'_" href='${process.env.VERCEL_URL}/reset/username/${id}'>Retrieve Username</a>
                <p>Bedankt,</p>
                <p>RnG Diving</p>
            
            `
            }
        }
        if(userRequest === 'order'){
            message = {
                from: process.env.GOOGLE_USER,
                to:  process.env.GOOGLE_USER,
                //to: toUser.email---inProduction
                subject:`Confirmation Order Number: ${id}`,
                html: `
                <h3>Hello ${toUser}</h3>
                
                <a>Thank you for your recent order.  You can track your order progress by following the link: </p>
                <a target="'_" href='${process.env.VERCEL_URL}/order/${id}'>Order Status</a>
                <p>Bedankt,</p>
                <p>RnG Diving</p>
            
            `
            }
        }
        transporter.sendMail(message, function(err, info){
            if(err){
                rej(err)
            }else{
                res(info)
            }
        })
    })
}
