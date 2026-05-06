import Image from "next/image"

const SectionTwo = () => {
  return (
    <div className="mt-8 mx-8">
      <div className="flex text-center md:text-start lg:mt-32 lg:p-14">
        <h1 className="text-foreground font-extrabold md:text-7xl text-4xl">
          <span className="text-neon-green">"</span>
          <span className="border-b-2 border-foreground">Our</span> <span className="text-neon-green">Games</span>
          <span className="text-neon-green">"</span>
        </h1>
      </div>
      <div className="lg:w-[40%] mt-5">
        <p className="flex justify-start lg:text-left lg:px-20 text-foreground text-2xl text-center">
          A Proven Portfolio of High-Retention Mobile Success. Our 250+ delivered projects
          across Unity, Unreal, and Godot demonstrate mastery in player engagement and
          scalable LiveOps strategies.
        </p>
      </div>
      {/* GAME CARDS */}
      <div className="flex-grow">
        <div className="grid md:grid-cols-3 mt-12">
          {/* block 1 */}
          <div className="grid grid-cols-1">
            <div>
              <Image src="/images/games/1.png" alt="Game 1" width={400} height={300} className="w-full p-3" />
            </div>
            <div className="grid grid-cols-2">
              <Image src="/images/games/2.png" alt="Game 2" width={200} height={200} className="w-full p-3" />
              <Image src="/images/games/3.png" alt="Game 3" width={200} height={200} className="w-full p-3" />
            </div>
          </div>
          {/* block 2 */}
          <div className="grid grid-cols-1">
            <div>
              <Image src="/images/games/4.png" alt="Game 4" width={400} height={500} className="w-full p-3" />
            </div>
          </div>
          {/* block 3 */}
          <div className="grid grid-cols-2">
            <div>
              <Image src="/images/games/5.png" alt="Game 5" width={200} height={400} className="w-full p-3" />
            </div>
            <div>
              <Image src="/images/games/6.png" alt="Game 6" width={200} height={200} className="w-full p-3" />
              <Image src="/images/games/7.png" alt="Game 7" width={200} height={200} className="w-full p-3" />
            </div>
          </div>
        </div>
        {/* bottom row */}
        <div className="grid md:grid-cols-6">
          <div className="md:col-span-1">
            <Image src="/images/games/8.png" alt="Game 8" width={150} height={200} className="w-full p-3" />
          </div>
          <div className="col-span-2">
            <Image src="/images/games/9.png" alt="Game 9" width={300} height={200} className="w-full p-3" />
          </div>
          <div className="col-span-2">
            <Image src="/images/games/10.png" alt="Game 10" width={300} height={200} className="w-full p-3" />
          </div>
          <div className="md:col-span-1">
            <Image src="/images/games/11.png" alt="Game 11" width={150} height={200} className="w-full p-3" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionTwo
