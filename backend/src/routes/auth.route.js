import express from 'express';
import { login, logout, signup } from '../controller/auth.controller.js';
const AuthRoute = express.Router();


AuthRoute.post('/signup', signup)
AuthRoute.post('/signin', login)
AuthRoute.post('/logout',logout);

export default AuthRoute; 