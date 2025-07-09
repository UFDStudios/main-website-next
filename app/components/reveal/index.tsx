"use client"

import { motion } from "framer-motion"
import type React from "react"

interface RevealProps {
  children: React.ReactNode
  className?: string
}

const Reveal: React.FC<RevealProps> = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default Reveal
