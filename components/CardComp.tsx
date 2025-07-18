import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CardCompProps {
  img: string;
  title?: string;
  handleClick?: () => void;
  description?: string;
  className?: string;
}

const CardComp = ({
  img,
  title,
  handleClick,
  description,
  className,
}: CardCompProps) => {
  return (
    <div
      className={cn(
        "bg-orange px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[16px] cursor-pointer",
        className
      )}
      onClick={handleClick}
    >
      <div className="flex-center glassmorphism size-12 rounded-[10px]">
        <Image src={img} alt="icon" width={27} height={27} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-extrabold">{title}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </div>
  );
};

export default CardComp;
