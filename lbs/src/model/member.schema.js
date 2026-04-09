 import mongoose from "mongoose";
 
 const userSchema = new mongoose.Schema({
     name: {
         type: String,
         required: true
     },
      membershipType: {
        type: String,
        enum: ["normal", "gold"],
        required: true
    },
     created_at:{
        type:Date,
        default : Date.now()
     }
 });
 
 const User = mongoose.model("User", userSchema);
 
 export default User;
