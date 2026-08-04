"use client"

import Image from "next/image"
import { motion, type Variants } from "framer-motion"

const GALLERY_GAP = "gap-[clamp(0.4rem,1vw,0.75rem)]"

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
      className={`group relative overflow-hidden rounded-xl ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-transparent transition-all duration-300 group-hover:ring-neon-green group-hover:shadow-[0_0_16px_rgba(57,255,20,0.3)]" />
    </motion.div>
  )
}

const SectionTwo = () => {
  return (
    <div className="px-[clamp(1.25rem,5vw,3.5rem)] lg:mt-24 xl:mt-8">
      <div className="flex flex-col items-center gap-8 lg:gap-10">
        {/* Heading + description */}
        <div className="flex w-full max-w-4xl flex-col text-center">
          <h1 className="text-foreground text-4xl font-extrabold md:text-7xl">
            <span className="text-neon-green">&quot;</span>
            <span className="border-b-2 border-foreground">Our</span>{" "}
            <span className="text-neon-green">Games</span>
            <span className="text-neon-green">&quot;</span>
          </h1>
          <p className="mt-6 text-lg text-foreground md:text-2xl">
            A Proven Portfolio of High-Retention Mobile Success. Our 250+ delivered
            projects
            <br className="hidden md:block" />
            across Unity, Unreal, and Godot demonstrate mastery in player engagement
            and scalable LiveOps strategies.
          </p>
        </div>

        {/* Game gallery — matches sample bento layout */}
        <motion.div
          className={`mx-auto flex w-full max-w-[850px] flex-col xl:max-w-[950px] ${GALLERY_GAP}`}
          variants={galleryVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Mobile */}
          <div className={`grid grid-cols-2 ${GALLERY_GAP} md:hidden`}>
            <GameCard
              src="/images/our-games/1.png"
              alt="Strike Master"
              sizes="45vw"
              className="aspect-[9/16]"
            />
            <GameCard
              src="/images/our-games/4.png"
              alt="Tennis Clash 3D"
              sizes="45vw"
              className="aspect-[9/16]"
            />
            <GameCard
              src="/images/our-games/2.png"
              alt="Ready, Set, Go!"
              sizes="90vw"
              className="col-span-2 aspect-[3/1]"
            />
            <GameCard
              src="/images/our-games/3.png"
              alt="Arena Brawler"
              sizes="90vw"
              className="col-span-2 aspect-[3/1]"
            />
            <GameCard
              src="/images/our-games/5.png"
              alt="Blast Monsters"
              sizes="45vw"
              className="row-span-2 aspect-[9/16]"
            />
            <GameCard
              src="/images/our-games/6.png"
              alt="Spin Symbols"
              sizes="45vw"
              className="aspect-[2/1]"
            />
            <GameCard
              src="/images/our-games/7.png"
              alt="Play With Fun"
              sizes="45vw"
              className="aspect-[2/1]"
            />
            <GameCard
              src="/images/our-games/8.png"
              alt="Boxing"
              sizes="45vw"
              className="aspect-[2/1]"
            />
            <GameCard
              src="/images/our-games/9.png"
              alt="Shim Your Car"
              sizes="45vw"
              className="aspect-[2/1]"
            />
            <GameCard
              src="/images/our-games/10.png"
              alt="Racing"
              sizes="45vw"
              className="aspect-[2/1]"
            />
            <GameCard
              src="/images/our-games/11.png"
              alt="Night Landscape"
              sizes="45vw"
              className="aspect-[2/1]"
            />
          </div>

          {/* Desktop: two-row bento matching sample */}
          <div className={`hidden md:flex md:flex-col ${GALLERY_GAP}`}>
            {/* Top: tall | stacked wides | tall */}
            <div className={`flex ${GALLERY_GAP}`}>
              <GameCard
                src="/images/our-games/1.png"
                alt="Strike Master"
                sizes="(min-width: 1024px) 22vw, 25vw"
                className="w-[22%] shrink-0 aspect-[285/531]"
              />

              <div className={`flex min-h-0 min-w-0 flex-1 flex-col ${GALLERY_GAP}`}>
                <GameCard
                  src="/images/our-games/2.png"
                  alt="Ready, Set, Go!"
                  sizes="(min-width: 1024px) 50vw, 55vw"
                  className="min-h-0 flex-1"
                />
                <GameCard
                  src="/images/our-games/3.png"
                  alt="Arena Brawler"
                  sizes="(min-width: 1024px) 50vw, 55vw"
                  className="min-h-0 flex-1"
                />
              </div>

              <GameCard
                src="/images/our-games/4.png"
                alt="Tennis Clash 3D"
                sizes="(min-width: 1024px) 22vw, 25vw"
                className="w-[22%] shrink-0 aspect-[285/531]"
              />
            </div>

            {/* Bottom: tall | 2 stacked × 3 */}
            <div className={`grid grid-cols-4 ${GALLERY_GAP}`}>
              <GameCard
                src="/images/our-games/5.png"
                alt="Blast Monsters"
                sizes="(min-width: 1024px) 25vw, 25vw"
                className="h-full min-h-0"
              />

              <div className={`grid grid-rows-2 ${GALLERY_GAP}`}>
                <GameCard
                  src="/images/our-games/6.png"
                  alt="Spin Symbols"
                  sizes="(min-width: 1024px) 25vw, 25vw"
                  className="aspect-[353/180]"
                />
                <GameCard
                  src="/images/our-games/7.png"
                  alt="Play With Fun"
                  sizes="(min-width: 1024px) 25vw, 25vw"
                  className="aspect-[353/180]"
                />
              </div>

              <div className={`grid grid-rows-2 ${GALLERY_GAP}`}>
                <GameCard
                  src="/images/our-games/8.png"
                  alt="Boxing"
                  sizes="(min-width: 1024px) 25vw, 25vw"
                  className="aspect-[353/180]"
                />
                <GameCard
                  src="/images/our-games/9.png"
                  alt="Shim Your Car"
                  sizes="(min-width: 1024px) 25vw, 25vw"
                  className="aspect-[353/180]"
                />
              </div>

              <div className={`grid grid-rows-2 ${GALLERY_GAP}`}>
                <GameCard
                  src="/images/our-games/10.png"
                  alt="Racing"
                  sizes="(min-width: 1024px) 25vw, 25vw"
                  className="aspect-[353/180]"
                />
                <GameCard
                  src="/images/our-games/11.png"
                  alt="Night Landscape"
                  sizes="(min-width: 1024px) 25vw, 25vw"
                  className="aspect-[353/180]"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SectionTwo
