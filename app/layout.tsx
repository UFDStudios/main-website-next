import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import LayoutContent from "./components/LayoutContent" 

export const metadata: Metadata = {
  title: "UFD Studios | Professional Mobile Game Development Agency",
  description: "UFD Studios: Full-cycle mobile game production and Agile development for startups. Specializing in Unity & Unreal with 250+ delivered titles. All-in-one success packages available.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-main min-h-screen">
        <LayoutContent>
          {children}
        </LayoutContent>
      </body>
    </html>
  )
}