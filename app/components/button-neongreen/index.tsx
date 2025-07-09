"use client";

import type React from "react";

interface NeonButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const NeonButton: React.FC<NeonButtonProps> = ({
  children,
  onClick,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        bg-neon-green 
        px-6 py-2 
        text-black
        font-semibold 
        rounded-lg 
        hover:bg-transparent 
        hover:text-neon-green
        transition-all 
        duration-300 
        ease-in-out
        hover:shadow-[0_0_10px_#11ff00]
        shadow-[0_0_20px_#11ff00]
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default NeonButton;
