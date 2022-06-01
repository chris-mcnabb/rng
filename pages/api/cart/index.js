import dbConnect from "../../../lib/mongo";
import Cart from "../../../models/Cart";

export default async function handler(req, res) {
    const {
        method,
        query: {cart},

    } = req;


    await dbConnect()

    if(method==="GET"){

        try {
            let carts;
            if (cart) {

                carts = await Cart.find(
                {userId: cart}
                );
            }else {
                carts = await Cart.find();
            }
            res.status(200).json(carts);
        }catch(err){
            res.status(500).json(err)
        }

    }
    if(method==="POST"){

        try{
            const cart = await Cart.create(req.body);
            res.status(201).json(cart)
        }catch(err){
            res.status(500).json(err);
        }
    }
    if(method === 'PUT'){
        const items = req.body
            console.log(items)

        try{
        const updatedCart = await Cart.findOneAndUpdate(
                {userId: cart},
                {$push: {items: {productId: items.productId, quantity: items.quantity, color: items.color,
                            size: items.size, name: items.name, modelId: items.modelId, img: items.img, price: items.price}}}
            )
            res.status(200).json(updatedCart)
        }catch(err){
            res.status(500).json(err);
        }
    }
}

