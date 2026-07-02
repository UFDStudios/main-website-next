"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Reveal from "@/app/components/reveal"

interface ServiceContent {
  title: string
  title2: string
  title3: string
  text: string
  image: string
}

const SectionThree = () => {
  const [activeTab, setActiveTab] = useState(0)

  const content: ServiceContent[] = [
    {
      title: "Game Design",
      title2: " & Content",
      title3: "Player Psychology & Monetization Loops",
      text: `We design games that don't just entertain but retain. By utilizing behavioral psychological triggers and balanced economy loops, we maximize long-term player engagement.`,
      image: "/images/ourServices/design.png",
    },
    {
      title: "Quality",
      title2: "Assurance",
      title3: "Cross-Device Optimization & Bug-Free Launches",
      text: `We perform rigorous device-farm testing to ensure 60 FPS performance across the hardware spectrum, eliminating fragmentation issues before they reach your players.`,
      image: "/images/ourServices/quality.png",
    },
    {
      title: "Creative ",
      title2: "Marketing",
      title3: "Data-Driven User Acquisition & LTV Growth",
      text: `We bridge the gap between development and growth. Using real-time analytics, we optimize your CPI (Cost Per Install) and scale your LTV (Lifetime Value) through targeted creative assets.`,
      image: "/images/ourServices/marketing.png",
    },
    {
      title: "Game",
      title2: "Engineering",
      title3: "Multi-Engine Mastery (Unity, Unreal, Godot, Cocos, Construct 3)",
      text: `From high-fidelity console ports in Unreal to lightweight, high-performance mobile builds in Unity or Godot, our technical architecture is built for stability and scale.`,
      image: "/images/ourServices/engineering.png",
    },
    {
      title: "The All-in-One",
      title2: "Success Package",
      title3: "Complete Vertical Production Integration",
      text: `This is the unified combination of our four core pillars (Design, Engineering, QA, and Marketing). Designed for funded startups and ambitious publishers, this package provides a market-ready product by ensuring the monetization design matches the engineering constraints and the UA creative strategy. It removes the friction of managing multiple vendors, transferring all technical and creative risk to our expert team.`,
      image: "/images/ourServices/allInOne.png",
    },
  ]

  useEffect(() => {
    content.forEach((item) => {
      const img = new window.Image()
      img.src = item.image
    })
  }, [content])

  return (
    <div className="mt-4 mx-4">
      <div className="md:flex text-center md:text-start lg:mt-15 lg:p-14">
        <h1 className="text-foreground font-extrabold text-3xl md:text-5xl lg:text-6xl">
          <span className="text-neon-green">"</span>
          <span className="border-b-2 border-foreground">Our Services &</span> <span className="text-neon-green">Specialized Packages</span>
          <span className="text-neon-green">"</span>
        </h1>
      </div>
      <div>
        <div className="mt-12 flex w-full justify-center">
          <div className="flex w-full flex-col items-center justify-center lg:w-1/2">
            <Image
              src={`/images/numbers/${activeTab + 1}.png`}
              alt="Service Number"
              width={220}
              height={220}
              className="relative z-10 hidden max-h-[11rem] w-auto md:ml-8 md:block md:max-h-[13rem]"
            />
            <div className="flex flex-col justify-center text-center md:ml-14">
              <h2 className="text-2xl font-semibold text-neon-green md:text-4xl lg:text-5xl">
                <span className="text-neon-green">"</span>
                {content[activeTab].title}
              </h2>
              <h2 className="text-2xl font-semibold text-foreground md:text-4xl lg:text-5xl">
                {content[activeTab].title2}
                <span className="text-neon-green">"</span>
              </h2>
            </div>
            <div className="mt-5 w-full px-4 md:ml-8 lg:px-14">
              <p className="text-center text-lg font-bold text-white md:text-2xl lg:text-3xl">
                <span className="text-neon-green">"</span>
                {content[activeTab].title3}
                <span className="text-neon-green">"</span>
              </p>
            </div>
            <div className="mt-2 w-full px-4 md:ml-8 lg:px-14">
              <p className="text-justify text-base text-white md:text-lg lg:text-xl">{content[activeTab].text}</p>
            </div>
          </div>

          <div className="lg:flex lg:w-1/2 w-full hidden justify-center items-center">
            <Reveal>
              <Image
                src={content[activeTab].image || "/placeholder.svg"}
                alt="Service Image"
                width={400}
                height={400}
                className="relative z-10 max-h-[min(55vh,22rem)] w-auto max-w-full lg:max-h-[min(60vh,26rem)]"
                priority
              />
            </Reveal>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 px-2 sm:gap-x-6 md:flex md:justify-center md:gap-x-4 md:px-0 lg:gap-x-8">
          {content.map((item, index) => (
            <div
              key={index}
              className={`flex min-w-0 basis-0 flex-col items-center pb-2 md:flex-1 md:pb-6 md:border-b-2 md:border-dotted md:border-foreground/40 ${
                index === 4 ? "col-span-2 mx-auto w-full max-w-[9rem] sm:max-w-[10rem]" : ""
              } ${
                activeTab === index ? "text-foreground" : "text-gray-400"
              } cursor-pointer`}
              onClick={() => setActiveTab(index)}
            >
              <div className="relative z-10 flex h-9 w-full items-end justify-center sm:h-10 md:h-16">
                <Image
                  src={`/images/numbers/${index + 1}.png`}
                  alt=""
                  width={160}
                  height={80}
                  className="h-full w-auto max-w-[min(100%,4rem)] object-contain object-bottom sm:max-w-[min(100%,4.5rem)] md:max-w-[min(100%,7rem)]"
                />
              </div>
              <div className="mt-2 flex w-full min-w-0 flex-1 items-center justify-center px-1 md:mt-2 md:min-h-[4.25rem] lg:min-h-[5rem]">
                <p
                  className={`max-w-full text-center text-xs leading-snug [overflow-wrap:anywhere] sm:text-sm md:text-base lg:text-lg ${
                    activeTab === index ? "font-medium md:font-semibold" : ""
                  }`}
                >
                  <span className="text-neon-green">"</span>
                  <span className={activeTab === index ? "text-neon-green" : ""}>{item.title}</span>{" "}
                  <span className={activeTab === index ? "text-foreground" : ""}>{item.title2}</span>
                  <span className="text-neon-green">"</span>
                </p>
              </div>
              <div className="mt-2 hidden shrink-0 justify-center md:mt-3 md:flex">
                {activeTab === index ? (
                  <Image
                    src="/images/numbers/ActiveDot.png"
                    alt=""
                    width={32}
                    height={32}
                    className="h-6 w-6 md:h-8 md:w-8"
                  />
                ) : (
                  <Image src="/images/numbers/Dot.png" alt="" width={32} height={32} className="h-6 w-6 md:h-8 md:w-8" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SectionThree
