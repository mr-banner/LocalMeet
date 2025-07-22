"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import CardComp from "./CardComp";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

const MeetingLists = () => {
  const {user} = useUser();
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const client = useStreamVideoClient();
  const [values,setValues] = useState({
    dateTime:new Date(),
    description:'',
    link:''
  })

  const [callDetails,setCallDetails] = useState<Call>();

  const createMeeting = async()=>{
    if(!user || !client) return;
    try {
      if(!values.dateTime){
        toast('please select date and time')
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call('default', id);

      if(!call) throw new Error("Call creation failed");

      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data:{
          starts_at:startsAt,
          custom:{
            description: description,
          }
        }
      })
      setCallDetails(call);
      if(!values.description){
        router.push(`/meeting/${call.id}`);
      }
      toast('Meeting created successfully')
    } catch (error) {
      console.error("Error creating meeting:", error);
      toast('Failed to create meeting');
    }
  }


  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      <CardComp
        img="/icons/add-meeting.svg"
        title="New Meeting"
        handleClick={() => setMeetingState("isInstantMeeting")}
        description="Start an instant meeting"
        className="bg-orange"
      />
      <CardComp
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        handleClick={() => setMeetingState("isScheduleMeeting")}
        description="Schedule a meeting"
        className="bg-blue"
      />
      <CardComp
        img="/icons/recordings.svg"
        title="View Recordings"
        handleClick={() => router.push("/recordings")}
        description="Check out your past meetings"
        className="bg-purple"
      />
      <CardComp
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        handleClick={() => setMeetingState("isJoiningMeeting")}
        description="Join meeting with a code"
        className="bg-yellow"
      />
      <MeetingModal
      isOpen = {meetingState === "isInstantMeeting"}
      onClose={() => setMeetingState(undefined)}
      title="Start and Instant Meeting"
      buttonText = "Start Meeting"
      className="text-center"
      handleClick = {createMeeting}
      />
    </section>
  );
};

export default MeetingLists;
