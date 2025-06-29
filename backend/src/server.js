import cookieParser from 'cookie-parser';
import cors from 'cors';
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
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true, // allowed to frontend to send cookies
}))

app.use("/api/auth",AuthRoute );
app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);


app.listen(PORT, ()=>{
    console.log(`server running in ${PORT}`)
    connectDB();
})