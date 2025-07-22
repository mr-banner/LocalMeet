import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const MeetingSetup = ({setIsSetupComplete} : {setIsSetupComplete:(value:boolean)=>void}) => {
  const [isMicCamToggeldOn, setIsMicCamToggeldOn] = useState(false);
  const call = useCall();
  useEffect(() => {
    if (isMicCamToggeldOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggeldOn, call?.microphone, call?.camera]);
  
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-2xl font-bold">Preview your call set up</h1>
      <VideoPreview className="max-h-[670px] max-w-[670px] rounded-lg"/>
      <div className="flex items-center justify-center gap-3 h-16">
        <label className="flex items-center justify-center gap-2 font-medium cursor-pointer">
          <input
          type="checkbox"
          checked={isMicCamToggeldOn}
          onChange={(e)=>setIsMicCamToggeldOn(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings/>
      </div>
      <Button className="rounded-mg bg-green-500 px-4 py-2.5 cursor-pointer"
      onClick={()=>{
        call?.join();
        setIsSetupComplete(true);
      }}
      >
        Join Meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
