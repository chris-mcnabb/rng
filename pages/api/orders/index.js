import dbConnect from "../../../lib/mongo";
import Order from "../../../models/Order";

import Product from "../../../models/Product";
import {sendConfirmationEmail} from "../../../lib/mailer";
const handler = async(req,res) => {

    const {method} = req;

    await dbConnect()

        if (method === "GET") {
            try {
                const orders = await Order.find()
                res.status(200).json(orders)
            } catch (err) {
                res.status(500).json(err)
            }
        }
        if (method === "POST") {

            try {
                const order = await Order.create(req.body)
                await sendConfirmationEmail({toUser: order.customer.firstName, id: order._id, userRequest: 'order'})
                res.status(201).json(order)
            } catch (err) {
                res.status(500).json(err)
            }
        }
        if (method === "PUT") {
            const items = req.body
            console.log(items)
            //{$inc: {stock: -item.quantity}, new: true}
          try {
             items.products.map(item=> {
                  const newUpdate = Product.findByIdAndUpdate({_id: item.productID}, {$inc: {stock: -item.quantity}, new: true})
                 res.status(201).json(newUpdate)
                  })
            } catch (err) {
                res.status(500).json(err.message)
            }

        }

}

export default handler;

