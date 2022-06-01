import dbConnect from "../../../lib/mongo";
import User from "../../../models/User";
import {sendConfirmationEmail} from "../../../lib/mailer";

export default async function handler(req, res) {
    const {
        method,

    } = req;
    await dbConnect()

    if(method === 'POST'){
        const {email, request} = req.body
        console.log(request)
     try{
                const user = await User.findOne({'personal.email': email})
            await sendConfirmationEmail({toUser: user.firstName, id: user._id, userRequest: request})

                res.status(201).json('Please check your email to activate account.')
            }catch(err){
                res.status(400).json('User not Found')
            }
    }

}


