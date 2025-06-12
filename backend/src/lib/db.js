import mongoose from 'mongoose';
export const connectDB = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URL)
        console.log(`MongoDb connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Error in connecting to MongoDB");
        process.exit(1);
        
    }
}