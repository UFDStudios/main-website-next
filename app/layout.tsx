import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import LayoutContent from "./components/LayoutContent" 

export const metadata: Metadata = {
  title: "UFD Studios | Craft High Retention Mobile Games",
  description: "UFD Studios is a premier mobile game development company. We specialize in high-retention game design, game development, 3D/2D art, and data-driven marketing to launch successful titles.",
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