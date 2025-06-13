import dotenv from 'dotenv';
import { StreamChat } from 'stream-chat';
dotenv.config();

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("Stream API key or secret missing");
}

const serverClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await serverClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("Error upserting Stream user", error);
  }
};

export const generateStreamToken = (userId) => {
  try {
    // ensure the user id string
    const userIdStr = userId.toString();
    const token = serverClient.createToken(userIdStr);
    return token;
  } catch (error) {
    console.error("Error generating Stream token", error);
  }
};
