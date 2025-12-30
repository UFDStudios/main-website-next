import Reveal from "@/app/components/reveal"
import Image from "next/image"

const SectionOne = () => {
  return (
    <div className="w-full grid lg:grid-cols-2 mt-10">
      <div className="flex flex-col text-center lg:mt-32 lg:p-14">
        <h1 className="text-foreground font-extrabold md:text-7xl text-4xl">
          <span className="text-neon-green">"</span>Level Up Your
        </h1>
        <h1 className="text-neon-green font-extrabold md:text-7xl text-4xl">Gaming</h1>
        <h1 className="text-foreground font-extrabold md:text-7xl text-4xl">
          Experience<span className="text-neon-green">"</span>
        </h1>
        <p className="flex justify-start lg:text-left lg:px-20 text-foreground mt-20 text-2xl text-center px-5">
          UFD Studios is a premier mobile game development company. We specialize in high-retention game design, 
          game development, 3D/2D art, and data-driven marketing to launch successful titles.
        </p>
      </div>
      <div className="relative justify-center items-center mr-10 hidden lg:flex">
        {/* Background Images */}
        <Image
          src="/images/character/left.png"
          alt="Background Character Left"
          width={400}
          height={600}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/2 opacity-50"
        />
        <Image
          src="/images/character/right.png"
          alt="Background Character Right"
          width={400}
          height={600}
          className="absolute right-0 top-[40%] transform -translate-y-1/2 w-1/2 opacity-50"
        />
        {/* Foreground Image */}
        <Reveal>
          <Image
            src="/images/character/main.png"
            alt="Main Character"
            width={600}
            height={800}
            className="relative w-[80%] z-10"
            priority
          />
        </Reveal>
      </div>
    </div>
  )
}

export default SectionOne
