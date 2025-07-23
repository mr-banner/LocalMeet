"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import CardComp from "./CardComp";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from 'react-datepicker'
import { Input } from "./ui/input";

const MeetingLists = () => {
  const { user } = useUser();
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });

  const [callDetails, setCallDetails] = useState<Call>();

  const createMeeting = async () => {
    if (!user || !client) return;
    try {
      if (!values.dateTime) {
        toast("please select date and time");
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Call creation failed");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description: description,
          },
        },
      });
      setCallDetails(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast("Meeting created successfully");
    } catch (error) {
      console.error("Error creating meeting:", error);
      toast("Failed to create meeting");
    }
  };

  const meetlink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

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

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[28px] text-sky-1">
              {" "}
              Add a description
            </label>
            <Textarea
              className="border-none bg-1 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => {
                setValues({ ...values, description: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col w-full gap-2.5">
            <label className="text-base font-normal leading-[28px] text-sky-1">
              {" "}
              Select Date and Time
            </label>
            <ReactDatePicker
            selected={values.dateTime}
            onChange={(date) => {setValues({...values,
              dateTime:date!})}}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
            className="w-full rounded bg-1 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          buttonText="Copy Meeting Link"
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetlink)
            toast('Link copied')
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
        />
      )}

      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-[#252A41] focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        buttonText="Start Meeting"
        className="items-center"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingLists;
