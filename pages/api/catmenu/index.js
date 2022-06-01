import dbConnect from "../../../lib/mongo";
import CatMenu from "../../../models/CatMenu";
import clientPromise from '../../../lib/mongodb'
mongoose = require("mongoose")
export default async function handler(req, res) {
    const {
        method,
        query: {category}
    } = req;


    await clientPromise

    if(method==="GET"){
        try {
            let categories;
            if (category) {

                categories = await CatMenu.find({name: category})
              ;
            } else {
                categories = await CatMenu.find();
            }
            res.status(200).json(categories);
        }catch(err){
            res.status(500).json(err)
        }

    }
    if(method==="POST"){

        try{
            const category = await CatMenu.create(req.body);
            res.status(201).json(category)
        }catch(err){
            res.status(500).json(err);
        }
    }
}
