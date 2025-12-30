'use client'

import { usePathname } from 'next/navigation'
import Navbar from './navbar'
import Footer from './footer'

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  
    const pathname = usePathname()
    const hideNavbarAndFooterPaths = ['/portfolio/view']
    const showNavbarAndFooter = !hideNavbarAndFooterPaths.includes(pathname)
  
    return (
    <>
        {showNavbarAndFooter && <Navbar />}
        <main className="pt-[8rem]">{children}</main>
        {showNavbarAndFooter && <Footer />}
    </>
    )
}