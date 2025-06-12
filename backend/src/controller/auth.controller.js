import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { upsertStreamUser } from '../lib/stream.js';
import User from "../models/User.js";

export const signup = async (req, res) => {
  const { email, password, fullName } = req.body;
  try {
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 character." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }
    // check if user is exist or not
    const existUSer = await User.findOne({ email });
    if(existUSer){
        return res.status(400).json({message:"email already exist used different email."})
    }
    // for profile to calculate the idex to use free api..
    const idx = Math.floor(Math.random()*100) +1; //generate a random number between 1-100;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    // now create a new user..
    const newUser = await User.create({
        email,
        password,
        fullName,
        profilePic:randomAvatar,
    })
    // create user in stream-chat
    try {
        await upsertStreamUser({
            id:newUser._id,
            name:newUser.fullName,
            image:newUser.profilePic || ""
        });
        console.log(`Stream user crate ${newUser.fullName}`);
    } catch (error) {
        console.log(error)
    }
    // now generate jwt token
    const token = jwt.sign({userId:newUser._id}, process.env.JWT_SECRET_KEY,{
        expiresIn:'7d'
    });
    // set cookie
    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true, //prevent XSS attack
        sameSite:"strict",  // prevent CSRF attacks
        secure: process.env.NODE_ENV === "production"
    })
    res.status(201).json({success:true, user:newUser})
  } catch (error) {
    console.log("Error in signup controller",error);
    res.status(500).json({message:"Internal server Error"});
  }
};
export const login = async(req, res)=> {
  try {
    const {email, password} = req.body;
    if(!email || !password){return res.status(400).json({message:"Please filled the all fields."})}
    // check email or password is valid or not
    const user = await User.findOne({email});
    if(!user){return res.status(401).json({message:"Invalid email or password"})}
    const isCorrectPassword = await bcrypt.compare(password, user.password);
     if(!isCorrectPassword){return res.status(401).json({message:"Invalid email or password"})}
     const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET_KEY,{
        expiresIn:'7d'
    });
    // set cookie
    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true, //prevent XSS attack
        sameSite:"strict",  // prevent CSRF attacks
        secure: process.env.NODE_ENV === "production"
    });
    res.status(200).json({success:true, user})
    
  } catch (error) {
    console.log("Error in auth controller", error.message);
    res.status(500).json({message:"Internal server error"})    
  }
}

export const logout =(req, res)=> {
  res.clearCookie("jwt");
  res.status(200).json({success:true, message:"Logout Successful"});
}
