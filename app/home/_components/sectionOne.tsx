import Reveal from "@/app/components/reveal"
import Image from "next/image"
import Link from "next/link"

const SectionOne = () => {
  return (
    <div className="w-full grid lg:grid-cols-2">
      <div className="flex flex-col text-center lg:p-14">
        <h1 className="text-foreground font-extrabold md:text-7xl text-4xl">
          <span className="text-neon-green">"</span>Full-Cycle
        </h1>
        <h1 className="text-neon-green font-extrabold md:text-7xl text-4xl">Mobile Game</h1>
        <h1 className="text-foreground font-extrabold md:text-7xl text-4xl">
          Development<span className="text-neon-green">"</span>
        </h1>
        <p className="flex justify-start lg:text-left lg:px-20 text-foreground mt-13 text-2xl text-center px-5">
          With a track record of 250+ successful titles, UFD Studios provides studio-level
          execution for startups and funded teams. We turn ambitious concepts into global mobile
          hits.
        </p>
        <div className="mt-8 flex w-full justify-center px-5 lg:w-fit lg:self-center">
          <Link
            href="/contact"
            className="inline-flex rounded-lg border-2 border-neon-green bg-black p-0.5 shadow-[0_0_20px_#39ff14] transition-shadow duration-300 hover:shadow-[0_0_28px_#39ff14]"
          >
            <span className="inline-flex items-center gap-4 rounded-lg border-2 border-black bg-white px-8 py-2.5 text-base font-bold text-black">
              Book Free Call
              <span className="text-lg leading-none" aria-hidden="true">
                →
              </span>
            </span>
          </Link>
        </div>
      </div>
      <div className="relative justify-center items-center mr-10 hidden lg:flex">
        {/* Background Images */}
        {/* <Image
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
        /> */}
        {/* Foreground Image */}
        <Reveal>
          <Image
            src="/images/character/main.png"
            alt="Main Character"
            width={600}
            height={800}
            className="relative w-[80%] max-h-[580px] h-auto object-contain z-10"
            priority
          />
        </Reveal>
      </div>
    </div>
  )
}

export default SectionOne
