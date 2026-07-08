"use client"

import type React from "react"
import { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaTimes } from "react-icons/fa"
import Logo from "../logo"

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

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/60 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={toggleSidebar}
        aria-hidden={!isOpen}
      />

      <aside
        className={`fixed inset-0 z-[70] flex h-dvh w-full flex-col bg-black shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
          <Logo />
          <button
            type="button"
            onClick={toggleSidebar}
            className="text-white transition-colors hover:text-neon-green"
            aria-label="Close menu"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.path}
              onClick={toggleSidebar}
              className={`rounded-md px-4 py-3 text-lg font-medium transition-colors duration-200 ${
                isActiveLink(link.path)
                  ? "border-l-4 border-neon-green bg-white/5 pl-3 text-neon-green"
                  : "text-white hover:bg-white/5 hover:text-neon-green"
              }`}
            >
              {link.title}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={toggleSidebar}
            className={`rounded-md px-4 py-3 text-lg font-medium transition-colors duration-200 ${
              isActiveLink("/contact")
                ? "border-l-4 border-neon-green bg-white/5 pl-3 text-neon-green"
                : "text-white hover:bg-white/5 hover:text-neon-green"
            }`}
          >
            Contact Us
          </Link>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
