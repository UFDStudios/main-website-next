import Image from "next/image"

const GAME_IMAGES = Array.from({ length: 11 }, (_, index) => ({
  src: `/images/games/${index + 1}.png`,
  alt: `Game ${index + 1}`,
}))

const SectionTwo = () => {
  return (
    <div className="mx-8 mt-18">
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
          {/* Mobile: uniform grid */}
          <div className="mb-8 grid grid-cols-3 gap-1.5 md:hidden">
            {GAME_IMAGES.map((game) => (
              <div key={game.src} className="relative aspect-square overflow-hidden">
                <Image
                  src={game.src}
                  alt={game.alt}
                  fill
                  sizes="33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Desktop: collage layout */}
          <div className="hidden md:block">
            <div className="grid grid-cols-3 gap-1">
              {/* block 1 */}
              <div className="grid grid-cols-1">
                <div className="relative aspect-[4/3] overflow-hidden p-1">
                  <Image src="/images/games/1.png" alt="Game 1" fill className="object-cover" sizes="16vw" />
                </div>
                <div className="grid grid-cols-2">
                  <div className="relative aspect-square overflow-hidden p-1">
                    <Image src="/images/games/2.png" alt="Game 2" fill className="object-cover" sizes="8vw" />
                  </div>
                  <div className="relative aspect-square overflow-hidden p-1">
                    <Image src="/images/games/3.png" alt="Game 3" fill className="object-cover" sizes="8vw" />
                  </div>
                </div>
              </div>
              {/* block 2 */}
              <div className="grid grid-cols-1">
                <div className="relative aspect-[4/5] overflow-hidden p-1">
                  <Image src="/images/games/4.png" alt="Game 4" fill className="object-cover" sizes="16vw" />
                </div>
              </div>
              {/* block 3 */}
              <div className="grid grid-cols-2">
                <div className="relative aspect-[1/2] overflow-hidden p-1">
                  <Image src="/images/games/5.png" alt="Game 5" fill className="object-cover" sizes="8vw" />
                </div>
                <div className="grid grid-cols-1">
                  <div className="relative aspect-square overflow-hidden p-1">
                    <Image src="/images/games/6.png" alt="Game 6" fill className="object-cover" sizes="8vw" />
                  </div>
                  <div className="relative aspect-square overflow-hidden p-1">
                    <Image src="/images/games/7.png" alt="Game 7" fill className="object-cover" sizes="8vw" />
                  </div>
                </div>
              </div>
            </div>
            {/* bottom row */}
            <div className="mt-1 grid grid-cols-6 gap-1">
              <div className="col-span-1">
                <div className="relative aspect-[3/4] overflow-hidden p-1">
                  <Image src="/images/games/8.png" alt="Game 8" fill className="object-cover" sizes="8vw" />
                </div>
              </div>
              <div className="col-span-2">
                <div className="relative aspect-[3/2] overflow-hidden p-1">
                  <Image src="/images/games/9.png" alt="Game 9" fill className="object-cover" sizes="16vw" />
                </div>
              </div>
              <div className="col-span-2">
                <div className="relative aspect-[3/2] overflow-hidden p-1">
                  <Image src="/images/games/10.png" alt="Game 10" fill className="object-cover" sizes="16vw" />
                </div>
              </div>
              <div className="col-span-1">
                <div className="relative aspect-[3/4] overflow-hidden p-1">
                  <Image src="/images/games/11.png" alt="Game 11" fill className="object-cover" sizes="8vw" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionTwo
