import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './lib/db.js';
import AuthRoute from './routes/auth.route.js';
dotenv.config();



const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.use("/api/auth",AuthRoute )


app.listen(PORT, ()=>{
    console.log(`server running in ${PORT}`)
    connectDB();
})