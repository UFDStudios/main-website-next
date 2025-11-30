"use client"
import { useState } from "react"
import { FaBars } from "react-icons/fa"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import NeonButton from "../button-neongreen"
import Logo from "../logo"
import Sidebar from "../sidebar"
import { useScrollNavbar } from "@/hooks/use-scroll-navbar"

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
    title: "Portfolio",
    path: "/portfolio",
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
  const isVisible = useScrollNavbar()

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-transparent transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 md:ml-10 text-white h-[8rem]">
        <Logo />
        <div className="hidden lg:flex space-x-6">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.path}
              className={`hover:text-gray-400 text-2xl px-4 font-medium shadow-md hover:cursor-pointer transition-colors duration-200 outline-none focus:outline-none ${
                isActiveLink(link.path) ? "text-neon-green border-b-2 border-neon-green" : "text-white"
              }`}
            >
              {link.title}
            </Link>
          ))}
          <NeonButton onClick={handleClick}>Contact Us</NeonButton>
        </div>
        <div className="lg:hidden flex items-center">
          <FaBars
            className="text-4xl cursor-pointer outline-none focus:outline-none"
            onClick={toggleSidebar}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                toggleSidebar()
              }
            }}
          />
        </div>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} links={links} />
      </div>
    </nav>
  )
}

export default Navbar
