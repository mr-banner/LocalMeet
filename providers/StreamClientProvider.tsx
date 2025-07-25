"use client";
import { useUser } from "@clerk/nextjs";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";
import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/Loader";


const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoaded } = useUser();

  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!apiKey) throw new Error("Stream API Key is not defined");

    const client = new StreamVideoClient({
        apiKey,
        user: {
          id: user?.id,
          name: user?.fullName || user?.id,
          image: user?.imageUrl,
        },
        tokenProvider,
      });
      setVideoClient(client);
  },[isLoaded,user]);

  if (!videoClient) return <Loader />;
  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
