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
      image: "/images/ourServices/engineering.png",
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
      <div className="md:flex text-center md:text-start lg:mt-32 lg:p-14">
        <h1 className="text-foreground font-extrabold md:text-7xl text-4xl">
          <span className="text-neon-green">"</span>
          <span className="border-b-2 border-foreground">Our Services &</span> <span className="text-neon-green">Specialized Packages</span>
          <span className="text-neon-green">"</span>
        </h1>
      </div>
      <div>
        <div className="w-full flex justify-center mt-12">
          <div className="flex flex-col justify-center items-center w-full lg:w-1/2">
            <Image
              src={`/images/numbers/${activeTab + 1}.png`}
              alt="Service Number"
              width={300}
              height={300}
              className="relative z-10 left-12 hidden md:block"
            />
            <div className="flex flex-col justify-center text-center ml-16">
              <h2 className="text-neon-green md:text-6xl text-3xl font-semibold">
                <span className="text-neon-green">"</span>
                {content[activeTab].title}
              </h2>
              <h2 className="text-foreground md:text-6xl text-3xl font-semibold">
                {content[activeTab].title2}
                <span className="text-neon-green">"</span>
              </h2>
            </div>
            <div className="ml-8 mt-6 lg:px-20">
              <p className="text-white md:text-3xl text-2xl font-bold text-center">
                <span className="text-neon-green">"</span>
                {content[activeTab].title3}
                <span className="text-neon-green">"</span>
              </p>
            </div>
            <div className="ml-8 mt-2 lg:px-20">
              <p className="text-white md:text-2xl text-xl text-justify">{content[activeTab].text}</p>
            </div>
          </div>

          <div className="lg:flex lg:w-1/2 w-full hidden justify-center items-center">
            <Reveal>
              <Image
                src={content[activeTab].image || "/placeholder.svg"}
                alt="Service Image"
                width={500}
                height={500}
                className="relative z-10"
                priority
              />
            </Reveal>
          </div>
        </div>

        <div className="md:flex md:justify-center mt-8 grid grid-cols-2">
          {content.map((item, index) => (
            <div
              key={index}
              className={`w-full flex flex-col items-center md:space-x-24 cursor-pointer md:border-b-2 md:border-dotted pb-6 ${
                activeTab === index ? "text-foreground" : "text-gray-400"
              }`}
              onClick={() => setActiveTab(index)}
            >
              <div
                className={`w-20 h-10 flex items-center justify-center ${
                  activeTab === index ? "border-foreground" : "border-gray-400"
                }`}
              >
                <span className={`${activeTab === index ? "text-foreground" : "text-gray-400"}`}>
                  <Image
                    src={`/images/numbers/${index + 1}.png`}
                    alt="Number"
                    width={200}
                    height={100}
                    className="relative z-10 md:top-1 md:left-12 w-[50rem]"
                  />
                </span>
              </div>
              <span
                className={`${
                  activeTab === index ? "text-neon-green md:text-2xl ml-16" : "text-gray-400 md:text-xl text-base ml-16"
                }`}
              >
                "{item.title}
              </span>
              <span
                className={`text-xl ${
                  activeTab === index ? "text-foreground md:text-2xl ml-16" : "text-gray-400 md:text-xl text-base ml-16"
                }`}
              >
                {item.title2} <span className="text-neon-green">"</span>
              </span>
              {activeTab === index ? (
                <Image
                  src="/images/numbers/ActiveDot.png"
                  alt="Active Dot"
                  width={40}
                  height={40}
                  className="relative z-10 md:top-[2.9rem] w-10 hidden md:block"
                />
              ) : (
                <Image
                  src="/images/numbers/Dot.png"
                  alt="Inactive Dot"
                  width={40}
                  height={40}
                  className="relative z-10 md:top-[3.6rem] hidden md:block"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SectionThree
