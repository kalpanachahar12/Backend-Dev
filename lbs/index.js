import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import router from "./src/router/memberroute.js";
dotenv.config()
const app= express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

let port = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/library")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api", router);

app.listen(port,()=>{
    console.log("connections");
})