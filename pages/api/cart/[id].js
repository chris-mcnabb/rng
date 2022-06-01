import dbConnect from "../../../lib/mongo";
import Cart from "../../../models/Cart";

export default async function handler(req, res) {
    const {
        method,
        query: {id},

    } = req;


    await dbConnect()

    if (method === "GET") {

        try {
            const cart = await Cart.findById(id);

            res.status(200).json(cart);
        } catch (err) {
            res.status(500).json(err)
        }

    }
    if(method === 'PUT'){
        const{quant, productId, deleteId, newStatus}=req.body
        console.log('----->', newStatus)
        if(productId){
          try{
           const updatedCart = await Cart.findOneAndUpdate(
               id,
               {$set: {[`items.$[outer].quantity`]: quant}},
               { "arrayFilters": [{ "outer.productId": productId}], new: true}
           )
           res.status(200).json(updatedCart)
       }catch(err){
           res.status(500).json(err);
       }
        }
        if(newStatus){
            try{
                const updatedOrder = await Cart.findOneAndUpdate(
                    id,
                    {$set: {[`status`]:  (newStatus)}},

                )
                res.status(200).json(updatedOrder)
            }catch(err){
                res.status(500).json(err);
            }
        }
       if(deleteId){

           try{
               const deleteCartItem = await Cart.updateOne(
                   {_id: id},
                   {$pull: {
                           items: {_id: deleteId}
                       }},
                   {safe: true}

               )
               res.status(200).json(deleteCartItem)
           }catch(err){
               res.status(500).json(err);
           }
       }
    }
    if(method === 'DELETE'){
        try{
            await Cart.findByIdAndDelete(id)
            res.status(200).json("Cart has been deleted...")
        }catch(err){
            res.status(500).json(err)
        }
    }

}
