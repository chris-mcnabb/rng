import dbConnect from "../../../lib/mongo";
import Favorite from "../../../models/Favorite";

export default async function handler(req, res) {
    const {
        method,
        query: {id},

    } = req;


    await dbConnect()

    if (method === "GET") {

        try {
            const favorite = await Favorite.findById(id);

            res.status(200).json(favorite);
        } catch (err) {
            res.status(500).json(err)
        }

    }
    if(method === 'PUT'){
        const{quant, productId, deleteId}=req.body
        console.log('id--->',deleteId)

        /*if(productId){
          try{
           const updatedFavorite = await Favorite.findOneAndUpdate(
               id,
               {$set: {[`items.$[outer].quantity`]: quant}},
               { "arrayFilters": [{ "outer.productId": productId}], new: true}
           )
           res.status(200).json(updatedFavorite)
       }catch(err){
           res.status(500).json(err);
       }
        }
       if(deleteId){
           try{
               const deleteFavoriteItem = await Favorite.updateOne(
                   {_id: id},
                   {$pull: {
                           items: {_id: deleteId}
                       }},
                   {safe: true}

               )
               res.status(200).json(deleteFavoriteItem)
           }catch(err){
               res.status(500).json(err);
           }
       }*/
    }
    if(method === 'DELETE'){
        try{
            await Favorite.findByIdAndDelete(id)
            res.status(200).json("Favorite has been deleted...")
        }catch(err){
            res.status(500).json(err)
        }
    }

}
