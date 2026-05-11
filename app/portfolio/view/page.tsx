"use client"

import Logo from '@/app/components/logo'
import PortfolioPage from '../../components/portfolio/PortfolioPage'

export default function Page() 
{

  return (
      <>
        <div className="mt-[-6rem] ml-[4rem]">
          <Logo />
        </div>
        <div className="mt-[1rem]">
          <PortfolioPage />
        </div>
      </>
  )
}