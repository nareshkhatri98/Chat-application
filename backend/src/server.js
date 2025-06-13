import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './lib/db.js';
import AuthRoute from './routes/auth.route.js';
import chatRoute from './routes/chat.route.js';
import userRoute from './routes/user.route.js';
dotenv.config();



const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth",AuthRoute );
app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);


app.listen(PORT, ()=>{
    console.log(`server running in ${PORT}`)
    connectDB();
})