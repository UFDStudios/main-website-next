import Image from "next/image"

interface LogoProps {
  className?: string
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <div className={className}>
      <Image
        src="/images/Logo-Transparent.png"
        alt="UFD LOGO"
        width={64}
        height={64}
        className="h-16 w-auto"
        priority
      />
    </div>
  )
}

export default Logo