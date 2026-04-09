import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

let app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.set('view engine','ejs');

let port = process.env.PORT
app.get("/",(req,res)=>{
    res.render('index',{image: "./images/2.jpg"});
})
app.listen(port,()=>{
    console.log("Server Connected");
});