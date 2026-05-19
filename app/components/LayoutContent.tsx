'use client'

import { usePathname } from 'next/navigation'
import Navbar from './navbar'
import Footer from './footer'

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  
    const pathname = usePathname()
    const hideNavbarAndFooterPaths = ['/portfolio/view']
    const isAdminRoute = pathname.startsWith('/admin')
    const showNavbarAndFooter =
      !hideNavbarAndFooterPaths.includes(pathname) && !isAdminRoute
  
    return (
    <>
        {showNavbarAndFooter && <Navbar />}
        <main className={isAdminRoute ? '' : 'pt-[8rem]'}>{children}</main>
        {showNavbarAndFooter && <Footer />}
    </>
    )
}