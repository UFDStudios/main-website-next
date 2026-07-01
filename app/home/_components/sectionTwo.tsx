import Image from "next/image"

const SectionTwo = () => {
  return (
    <div className="mx-8 mt-8">
      <div className="grid w-full items-center gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left: heading + description */}
        <div className="flex flex-col text-center lg:px-8 lg:py-8 lg:text-start">
          <h1 className="text-foreground text-4xl font-extrabold md:text-7xl">
            <span className="text-neon-green">"</span>
            <span className="border-b-2 border-foreground">Our</span>{" "}
            <span className="text-neon-green">Games</span>
            <span className="text-neon-green">"</span>
          </h1>
          <p className="mt-5 px-5 text-center text-xl text-foreground md:text-2xl lg:px-0 lg:text-left">
            A Proven Portfolio of High-Retention Mobile Success. Our 250+ delivered projects
            across Unity, Unreal, and Godot demonstrate mastery in player engagement and
            scalable LiveOps strategies.
          </p>
        </div>

        {/* Right: game cards */}
        <div className="flex-grow px-4 lg:px-0">
          <div className="grid gap-1 md:grid-cols-3">
            {/* block 1 */}
            <div className="grid grid-cols-1">
              <div>
                <Image src="/images/games/1.png" alt="Game 1" width={400} height={300} className="h-auto max-h-36 w-full object-cover p-1" />
              </div>
              <div className="grid grid-cols-2">
                <Image src="/images/games/2.png" alt="Game 2" width={200} height={200} className="h-auto max-h-28 w-full object-cover p-1" />
                <Image src="/images/games/3.png" alt="Game 3" width={200} height={200} className="h-auto max-h-28 w-full object-cover p-1" />
              </div>
            </div>
            {/* block 2 */}
            <div className="grid grid-cols-1">
              <div>
                <Image src="/images/games/4.png" alt="Game 4" width={400} height={500} className="h-auto max-h-64 w-full object-cover p-1" />
              </div>
            </div>
            {/* block 3 */}
            <div className="grid grid-cols-2">
              <div>
                <Image src="/images/games/5.png" alt="Game 5" width={200} height={400} className="h-auto max-h-64 w-full object-cover p-1" />
              </div>
              <div>
                <Image src="/images/games/6.png" alt="Game 6" width={200} height={200} className="h-auto max-h-28 w-full object-cover p-1" />
                <Image src="/images/games/7.png" alt="Game 7" width={200} height={200} className="h-auto max-h-28 w-full object-cover p-1" />
              </div>
            </div>
          </div>
          {/* bottom row */}
          <div className="mt-1 grid gap-1 md:grid-cols-6">
            <div className="md:col-span-1">
              <Image src="/images/games/8.png" alt="Game 8" width={150} height={200} className="h-auto max-h-24 w-full object-cover p-1" />
            </div>
            <div className="col-span-2">
              <Image src="/images/games/9.png" alt="Game 9" width={300} height={200} className="h-auto max-h-24 w-full object-cover p-1" />
            </div>
            <div className="col-span-2">
              <Image src="/images/games/10.png" alt="Game 10" width={300} height={200} className="h-auto max-h-24 w-full object-cover p-1" />
            </div>
            <div className="md:col-span-1">
              <Image src="/images/games/11.png" alt="Game 11" width={150} height={200} className="h-auto max-h-24 w-full object-cover p-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionTwo
