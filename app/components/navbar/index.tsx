"use client"

import { useState } from "react"
import { FaBars } from "react-icons/fa"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import NeonButton from "../button-neongreen"
import Logo from "../logo"
import Sidebar from "../sidebar"


const links = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About Us",
    path: "/about-us",
  },
  {
    title: "Careers",
    path: "/careers",
  },
]

const Navbar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleClick = () => {
    router.push("/contact")
  }

  const isActiveLink = (path: string) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(path)
  }

  return (
    <div className="flex justify-between items-center p-4 md:ml-10 text-white z-50">
      <Logo />
      <div className="hidden lg:flex space-x-6">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.path}
            className={`hover:text-gray-400 text-2xl px-4 font-medium shadow-md hover:cursor-pointer transition-colors duration-200 ${
              isActiveLink(link.path) ? "text-neon-green border-b-2 border-neon-green" : "text-white"
            }`}
          >
            {link.title}
          </Link>
        ))}
        <NeonButton onClick={handleClick}>Contact Us</NeonButton>
      </div>
      <div className="lg:hidden flex items-center">
        <FaBars className="text-4xl cursor-pointer" onClick={toggleSidebar} />
      </div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} links={links} />
    </div>
  )
}

export default Navbar
