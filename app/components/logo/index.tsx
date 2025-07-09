import Image from "next/image"

const Logo = () => {
  return (
    <div>
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