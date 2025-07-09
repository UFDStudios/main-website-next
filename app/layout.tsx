import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Navbar from "./components/navbar"
import Footer from "./components/footer"

export const metadata: Metadata = {
  title: "UFD - Studios",
  description: "Level Up Your Gaming Experience",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-main min-h-screen">
        <Navbar />
        <main className="pt-[8rem]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
