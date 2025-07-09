"use client"

import type React from "react"

interface NeonButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  type?: "button" | "submit" | "reset"
}

const NeonButton: React.FC<NeonButtonProps> = ({ children, onClick, className = "", type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        px-6 py-2 
        bg-transparent 
        border-2 border-neon-green 
        text-neon-green 
        font-semibold 
        rounded-lg 
        hover:bg-neon-green 
        hover:text-black 
        transition-all 
        duration-300 
        ease-in-out
        shadow-[0_0_10px_#11ff00]
        hover:shadow-[0_0_20px_#11ff00]
        ${className}
      `}
    >
      {children}
    </button>
  )
}

export default NeonButton
