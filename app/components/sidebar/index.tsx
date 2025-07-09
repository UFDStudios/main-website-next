"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaTimes } from "react-icons/fa"

interface SidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
  links: Array<{
    title: string
    path: string
  }>
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, links }) => {
  const pathname = usePathname()

  const isActiveLink = (path: string) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(path)
  }

  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-black bg-opacity-95 transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-end p-4">
        <FaTimes className="text-white text-2xl cursor-pointer" onClick={toggleSidebar} />
      </div>
      <nav className="flex flex-col space-y-4 p-4">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.path}
            onClick={toggleSidebar}
            className={`text-xl font-medium transition-colors duration-200 ${
              isActiveLink(link.path)
                ? "text-neon-green border-l-4 border-neon-green pl-4"
                : "text-white hover:text-neon-green"
            }`}
          >
            {link.title}
          </Link>
        ))}
        <Link
          href="/contact"
          onClick={toggleSidebar}
          className={`text-xl font-medium transition-colors duration-200 ${
            isActiveLink("/contact")
              ? "text-neon-green border-l-4 border-neon-green pl-4"
              : "text-white hover:text-neon-green"
          }`}
        >
          Contact Us
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar
