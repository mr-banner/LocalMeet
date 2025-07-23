import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  buttonText?: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  image?: string;
  buttonIcon?: string;
}
const MeetingModal = ({
  isOpen,
  onClose,
  title,
  buttonText,
  className,
  children,
  handleClick,
  image,
  buttonIcon,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn('flex w-full max-w-[520px] flex-col gap-6 border-none bg-2 px-6 py-9 text-white',className)}>
        <DialogTitle>
        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-center">
              <Image src={image} alt="Meeting Icon" width={72} height={72} />
            </div>
          )}
          <h1 className={cn("text-3xl font-bold leading-[42px]")}>{title}</h1>
          {children}
          <Button
            className="bg-blue-1 focus-visible:ring-0 cursor-pointer"
            onClick={handleClick}
          >
            {buttonIcon && (
              <Image
                src={buttonIcon}
                alt="button icon"
                width={13}
                height={13}
              />
            )}
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
        </DialogTitle>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
