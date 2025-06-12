import dotenv from 'dotenv';
import express from 'express';
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.get('/api/auth/signup', (req,res)=>{
    res.send("Signup Route");
})
app.get('/api/auth/signin', (req,res)=>{
    res.send("SignIn Route");
})

app.get('/api/auth/logout', (req,res)=>{
    res.send("Signup Route");
});


app.listen(PORT, ()=>{
    console.log(`server running in ${PORT}`)
})