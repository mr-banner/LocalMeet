"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY ;
const secretKey = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async ()=> {
    const user = await currentUser();

    if(!user) throw new Error("User not found");
    if(!apiKey) throw new Error("Stream API Key is not defined");
    if(!secretKey) throw new Error("Stream Secret Key is not defined");

    const client = new StreamClient(apiKey, secretKey);

    const expirationTime = Math.floor(Date.now() / 1000) + 3600;
    const issued = Math.floor(Date.now() / 1000) - 60;

    const token = client.generateUserToken({user_id:user.id,validity_in_seconds: expirationTime, issued_at: issued});

    return token;
}