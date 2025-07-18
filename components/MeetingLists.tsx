"use client";
import React, { useState } from "react";
import CardComp from "./CardComp";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";

const MeetingLists = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const createMeeting = ()=>{

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
