 import mongoose from "mongoose";
 
 const bookSchema = new mongoose.Schema({
     title: {
         type: String,
         required: true
     },
     author: {
         type: String,
         required: true
     },
     price: {
         type: Number,
         required: true
     },
     created_at:{
        type:Date,
        default : Date.now()
     }
 });
 
 const book = mongoose.model("book", bookSchema);
 
 export default book;
