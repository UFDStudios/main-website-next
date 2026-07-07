"use client"

import Image from "next/image"
import { motion, type Variants } from "framer-motion"

const GAME_IMAGES = Array.from({ length: 11 }, (_, index) => ({
  src: `/images/games/${index + 1}.png`,
  alt: `Game ${index + 1}`,
}))

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const galleryVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.12,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
}

function GameCard({
  src,
  alt,
  sizes,
  className = "",
}: {
  src: string
  alt: string
  sizes: string
  className?: string
}) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.02, y: -3 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`group relative overflow-hidden rounded-lg ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 rounded-lg ring-2 ring-transparent transition-all duration-300 group-hover:ring-neon-green group-hover:shadow-[0_0_16px_rgba(57,255,20,0.3)]" />
    </motion.div>
  )
}

const SectionTwo = () => {
  return (
    <div className="mt-18 px-[clamp(1.25rem,5vw,3.5rem)] lg:mt-24 xl:mt-28">
      <div className="flex flex-col items-center gap-8 lg:gap-10">
        {/* Heading + description */}
        <motion.div
          className="flex w-full max-w-2xl flex-col text-center"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <h1 className="text-foreground text-4xl font-extrabold md:text-7xl">
            <span className="text-neon-green">"</span>
            <span className="border-b-2 border-foreground">Our</span>{" "}
            <span className="text-neon-green">Games</span>
            <span className="text-neon-green">"</span>
          </h1>
          <p className="mt-10 mb-10 text-lg text-foreground md:text-2xl">
            A Proven Portfolio of High-Retention Mobile Success. Our 250+ delivered projects
            across Unity, Unreal, and Godot demonstrate mastery in player engagement and
            scalable LiveOps strategies.
          </p>
        </motion.div>

        {/* Game gallery — full width with fluid side padding from parent */}
        <motion.div
          className="w-full"
          variants={galleryVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Mobile */}
          <div className="grid grid-cols-3 gap-[clamp(0.35rem,1.2vw,0.65rem)] md:hidden">
            {GAME_IMAGES.map((game) => (
              <GameCard
                key={game.src}
                src={game.src}
                alt={game.alt}
                sizes="(max-width: 768px) 30vw, 20vw"
                className="aspect-square"
              />
            ))}
          </div>

          {/* Desktop */}
          <div className="hidden md:block">
            <div className="grid grid-cols-5 gap-[clamp(0.35rem,1.2vw,0.65rem)]">
              <div className="grid grid-cols-1 gap-[clamp(0.35rem,1.2vw,0.65rem)]">
                <GameCard
                  src="/images/games/1.png"
                  alt="Game 1"
                  sizes="(min-width: 1536px) 16vw, (min-width: 1024px) 18vw, 20vw"
                  className="aspect-[4/3]"
                />
                <div className="grid grid-cols-2 gap-[clamp(0.35rem,1.2vw,0.65rem)]">
                  <GameCard
                    src="/images/games/2.png"
                    alt="Game 2"
                    sizes="(min-width: 1536px) 8vw, (min-width: 1024px) 10vw, 20vw"
                    className="aspect-square"
                  />
                  <GameCard
                    src="/images/games/3.png"
                    alt="Game 3"
                    sizes="(min-width: 1536px) 8vw, (min-width: 1024px) 10vw, 20vw"
                    className="aspect-square"
                  />
                </div>
              </div>

              <GameCard
                src="/images/games/4.png"
                alt="Game 4"
                sizes="(min-width: 1536px) 16vw, (min-width: 1024px) 18vw, 20vw"
                className="aspect-[4/5]"
              />

              <div className="grid grid-cols-2 gap-[clamp(0.35rem,1.2vw,0.65rem)]">
                <GameCard
                  src="/images/games/5.png"
                  alt="Game 5"
                  sizes="(min-width: 1536px) 8vw, (min-width: 1024px) 10vw, 20vw"
                  className="aspect-[1/2]"
                />
                <div className="grid grid-cols-1 gap-[clamp(0.35rem,1.2vw,0.65rem)]">
                  <GameCard
                    src="/images/games/6.png"
                    alt="Game 6"
                    sizes="(min-width: 1536px) 8vw, (min-width: 1024px) 10vw, 20vw"
                    className="aspect-square"
                  />
                  <GameCard
                    src="/images/games/7.png"
                    alt="Game 7"
                    sizes="(min-width: 1536px) 8vw, (min-width: 1024px) 10vw, 20vw"
                    className="aspect-square"
                  />
                </div>
              </div>

              <GameCard
                src="/images/games/8.png"
                alt="Game 8"
                sizes="(min-width: 1536px) 16vw, (min-width: 1024px) 18vw, 20vw"
                className="aspect-[4/5]"
              />

              <div className="grid grid-cols-1 gap-[clamp(0.35rem,1.2vw,0.65rem)]">
                <GameCard
                  src="/images/games/9.png"
                  alt="Game 9"
                  sizes="(min-width: 1536px) 16vw, (min-width: 1024px) 18vw, 20vw"
                  className="aspect-[4/3]"
                />
                <div className="grid grid-cols-2 gap-[clamp(0.35rem,1.2vw,0.65rem)]">
                  <GameCard
                    src="/images/games/10.png"
                    alt="Game 10"
                    sizes="(min-width: 1536px) 8vw, (min-width: 1024px) 10vw, 20vw"
                    className="aspect-square"
                  />
                  <GameCard
                    src="/images/games/11.png"
                    alt="Game 11"
                    sizes="(min-width: 1536px) 8vw, (min-width: 1024px) 10vw, 20vw"
                    className="aspect-square"
                  />
                </div>
              </div>
            </div>

            {/* <div className="mt-2 grid grid-cols-6 gap-2 lg:mt-2.5 lg:gap-2.5">
              <div className="col-span-1">
                <GameCard
                  src="/images/games/8.png"
                  alt="Game 8"
                  sizes="(max-width: 1024px) 7vw, 6vw"
                  className="aspect-[3/4]"
                />
              </div>
              <div className="col-span-2">
                <GameCard
                  src="/images/games/9.png"
                  alt="Game 9"
                  sizes="(max-width: 1024px) 14vw, 12vw"
                  className="aspect-[3/2]"
                />
              </div>
              <div className="col-span-2">
                <GameCard
                  src="/images/games/10.png"
                  alt="Game 10"
                  sizes="(max-width: 1024px) 14vw, 12vw"
                  className="aspect-[3/2]"
                />
              </div>
              <div className="col-span-1">
                <GameCard
                  src="/images/games/11.png"
                  alt="Game 11"
                  sizes="(max-width: 1024px) 7vw, 6vw"
                  className="aspect-[3/4]"
                />
              </div>
            </div> */}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SectionTwo
