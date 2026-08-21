import Reveal from "@/app/components/reveal"
import Image from "next/image"
import Link from "next/link"
import { FaCheck, FaStar } from "react-icons/fa"

const FEATURES = [
  "100% Completion Rate",
  "95% Client-Satisfaction Rate",
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
  showTrailingDivider,
}: {
  stat: (typeof STATS)[number]
  showDivider: boolean
  showTrailingDivider: boolean
}) {
  return (
    <div className="flex shrink-0 items-center">
      {showDivider && <span className="mx-4 h-8 w-px bg-white/20" aria-hidden="true" />}
      <div className="flex flex-col items-center px-6">
        <span className="flex items-center gap-1 text-xl font-bold text-neon-green [text-shadow:0_0_12px_rgba(57,255,20,0.75)] md:text-2xl 2xl:text-[1.875rem] 3xl:text-[2rem]">
          {stat.value}
          {stat.hasStar && <FaStar className="text-sm 2xl:text-base" aria-hidden="true" />}
        </span>
        <span className="mt-1 text-[10px] tracking-widest text-gray-400 md:text-xs 2xl:text-sm">
          {stat.label}
        </span>
      </div>
      {showTrailingDivider && <span className="mx-4 h-8 w-px bg-white/20" aria-hidden="true" />}
    </div>
  )
}

const SectionOne = () => {
  return (
    <section className="pb-2 lg:min-h-[calc(100dvh-8rem)] lg:pb-8">
      <div className="mx-auto grid w-full min-w-0 items-start lg:grid-cols-2 lg:min-h-[inherit] lg:items-center">
        <div className="flex min-w-0 flex-col gap-8 text-center lg:gap-10 lg:px-14 lg:py-6 2xl:gap-11 3xl:gap-12">
          <div>
            <h1 className="text-foreground text-4xl font-extrabold md:text-7xl 2xl:text-[4.75rem] 2xl:leading-[1.08] 3xl:text-[5rem] 3xl:leading-[1.08]">
              <span className="text-neon-green">"</span>Full-Cycle
            </h1>
            <h1 className="text-neon-green text-4xl font-extrabold md:text-7xl 2xl:text-[4.75rem] 2xl:leading-[1.08] 3xl:text-[5rem] 3xl:leading-[1.08]">
              Game
            </h1>
            <h1 className="text-foreground text-4xl font-extrabold md:text-7xl 2xl:text-[4.75rem] 2xl:leading-[1.08] 3xl:text-[5rem] 3xl:leading-[1.08]">
              Development<span className="text-neon-green">"</span>
            </h1>
          </div>

          <p className="px-5 text-xl text-foreground md:text-2xl lg:px-20 lg:text-left 2xl:text-[1.5rem] 2xl:leading-relaxed 3xl:text-[1.65rem] 3xl:leading-relaxed">
            With a track record of 250+ successful titles, UFD Studios provides studio-level
            execution for startups and funded teams. We turn ambitious concepts into global mobile
            hits.
          </p>

          <div className="flex w-full flex-col items-center justify-center gap-y-3 px-5 sm:gap-y-3.5 lg:flex-row lg:flex-nowrap lg:justify-start lg:gap-x-6 lg:gap-y-0 lg:px-20 2xl:gap-x-7 3xl:gap-x-8">
            {FEATURES.map((feature) => (
              <span
                key={feature}
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-base leading-tight text-foreground sm:text-lg md:text-lg lg:text-base lg:gap-1.5 2xl:text-lg 3xl:text-xl"
              >
                <FaCheck className="size-[0.85em] shrink-0 text-neon-green" aria-hidden="true" />
                {feature}
              </span>
            ))}
          </div>

          <div className="stats-marquee-mask relative overflow-hidden px-5 lg:px-20">
            <div className="stats-marquee-track flex w-max hover:[animation-play-state:paused]">
              {[...STATS, ...STATS].map((stat, index) => (
                <StatItem
                  key={`${stat.label}-${index}`}
                  stat={stat}
                  showDivider={index % STATS.length !== 0}
                  showTrailingDivider={index % STATS.length === STATS.length - 1}
                />
              ))}
            </div>
          </div>

          <div className="flex w-full justify-center px-5 lg:w-fit lg:self-center">
            <Link
              href="/contact"
              className="inline-flex rounded-lg border-2 border-neon-green bg-black p-0.5 shadow-[0_0_20px_#39ff14] transition-shadow duration-300 hover:shadow-[0_0_28px_#39ff14]"
            >
              <span className="inline-flex items-center gap-4 rounded-lg border-2 border-black bg-white px-8 py-2.5 text-base font-bold text-black 2xl:px-8 2xl:py-3 2xl:text-base 3xl:px-9 3xl:py-3 3xl:text-lg">
                Book Free Call
                <span className="text-lg leading-none 3xl:text-xl" aria-hidden="true">
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
            className="absolute left-0 top-1/2 w-[58%] -translate-y-1/2 opacity-50"
          />
          <Image
            src="/images/character/right.png"
            alt="Background Character Right"
            width={400}
            height={600}
            className="absolute right-0 top-[40%] w-[58%] -translate-y-1/2 opacity-50"
          />
          <Reveal>
            <Image
              src="/images/character/main_animation.gif"
              alt="Main Character"
              width={600}
              height={800}
              className="relative z-10 h-auto max-h-[580px] w-[100%] object-contain xl:max-h-[640px] 2xl:max-h-[680px] 3xl:max-h-[720px]"
              priority
              unoptimized
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default SectionOne
