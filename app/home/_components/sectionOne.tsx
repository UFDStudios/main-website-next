import Reveal from "@/app/components/reveal"
import Image from "next/image"
import Link from "next/link"
import { FaCheck, FaStar } from "react-icons/fa"

const FEATURES = [
  "100% Completion Rate",
  "95% Client-Satisfaction Rate",
  "97% Code Quality Score",
  "100% Attention to Detail",
]

const STATS = [
  { value: "25+", label: "Dedicated Professionals" },
  { value: "4.9", label: "Overall Rating", hasStar: true },
  { value: "6+", label: "Years of Excellence" },
  { value: "250+", label: "Projects Completed" },
  { value: "100+", label: "Happy Clients" },
]

function StatItem({
  stat,
  showDivider,
}: {
  stat: (typeof STATS)[number]
  showDivider: boolean
}) {
  return (
    <div className="flex shrink-0 items-center">
      {showDivider && <span className="mx-4 h-8 w-px bg-white/20" aria-hidden="true" />}
      <div className="flex flex-col items-center px-6">
        <span className="flex items-center gap-1 text-xl font-bold text-neon-green [text-shadow:0_0_12px_rgba(57,255,20,0.75)] md:text-2xl min-[1920px]:text-[2rem]">
          {stat.value}
          {stat.hasStar && <FaStar className="text-sm" aria-hidden="true" />}
        </span>
        <span className="mt-1 text-[10px] tracking-widest text-gray-400 md:text-xs min-[1920px]:text-sm">
          {stat.label}
        </span>
      </div>
    </div>
  )
}

const SectionOne = () => {
  return (
    <section className="pb-2 lg:min-h-[calc(100dvh-8rem)] lg:pb-8">
      <div className="mx-auto grid w-full min-w-0 items-start lg:grid-cols-2 lg:min-h-[inherit] lg:items-center">
        <div className="flex min-w-0 flex-col gap-8 text-center lg:gap-10 lg:px-14 lg:py-6 min-[1920px]:gap-12">
          <div>
            <h1 className="text-foreground text-4xl font-extrabold md:text-7xl min-[1920px]:text-[5rem] min-[1920px]:leading-[1.08]">
              <span className="text-neon-green">"</span>Full-Cycle
            </h1>
            <h1 className="text-neon-green text-4xl font-extrabold md:text-7xl min-[1920px]:text-[5rem] min-[1920px]:leading-[1.08]">
              Game
            </h1>
            <h1 className="text-foreground text-4xl font-extrabold md:text-7xl min-[1920px]:text-[5rem] min-[1920px]:leading-[1.08]">
              Development<span className="text-neon-green">"</span>
            </h1>
          </div>

          <p className="px-5 text-xl text-foreground md:text-2xl lg:px-20 lg:text-left min-[1920px]:text-[1.65rem] min-[1920px]:leading-relaxed">
            With a track record of 250+ successful titles, UFD Studios provides studio-level
            execution for startups and funded teams. We turn ambitious concepts into global mobile
            hits.
          </p>

          <div className="flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-2 px-5 lg:justify-start lg:gap-x-6 lg:px-20 min-[1920px]:gap-x-8">
            {FEATURES.map((feature) => (
              <span
                key={feature}
                className="inline-flex items-center gap-1.5 text-[10px] leading-tight text-foreground sm:gap-2 sm:text-xs md:text-sm lg:text-base min-[1920px]:text-lg"
              >
                <FaCheck className="shrink-0 text-neon-green" aria-hidden="true" />
                {feature}
              </span>
            ))}
          </div>

          <div className="relative overflow-hidden px-5 lg:px-20">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background to-transparent"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background to-transparent"
              aria-hidden="true"
            />
            <div className="stats-marquee-track flex w-max hover:[animation-play-state:paused]">
              {[...STATS, ...STATS].map((stat, index) => (
                <StatItem key={`${stat.label}-${index}`} stat={stat} showDivider={index > 0} />
              ))}
            </div>
          </div>

          <div className="flex w-full justify-center px-5 lg:w-fit lg:self-center">
            <Link
              href="/contact"
              className="inline-flex rounded-lg border-2 border-neon-green bg-black p-0.5 shadow-[0_0_20px_#39ff14] transition-shadow duration-300 hover:shadow-[0_0_28px_#39ff14]"
            >
              <span className="inline-flex items-center gap-4 rounded-lg border-2 border-black bg-white px-8 py-2.5 text-base font-bold text-black min-[1920px]:px-9 min-[1920px]:py-3 min-[1920px]:text-lg">
                Book Free Call
                <span className="text-lg leading-none" aria-hidden="true">
                  →
                </span>
              </span>
            </Link>
          </div>
        </div>

        <div className="relative mr-10 hidden min-w-0 items-center justify-center lg:flex">
          <Image
            src="/images/character/left.png"
            alt="Background Character Left"
            width={400}
            height={600}
            className="absolute left-0 top-1/2 w-1/2 -translate-y-1/2 opacity-50"
          />
          <Image
            src="/images/character/right.png"
            alt="Background Character Right"
            width={400}
            height={600}
            className="absolute right-0 top-[40%] w-1/2 -translate-y-1/2 opacity-50"
          />
          <Reveal>
            <Image
              src="/images/character/main.png"
              alt="Main Character"
              width={600}
              height={800}
              className="relative z-10 h-auto max-h-[480px] w-[100%] object-contain xl:max-h-[540px] min-[1920px]:max-h-[580px]"
              priority
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default SectionOne




/* - Each section should fit in whole web view, right now some sections are bigger and 
  some are smaller. (Cutting off the screen)
- In Careers section, the text is overlapping
- In portfolio, give high priority to the following tags (All, 2D, 3D, Multiplayer, Puzzle, Shooting, Racing)
- In Review section, display the scroll arrow left and right instead of showing at the bottom.
- Don’t display menu text in mobile view. (https://kevurugames.com/game-development/) */
