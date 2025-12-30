"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Reveal from "@/app/components/reveal"

interface ServiceContent {
  title: string
  title2: string
  text: string
  image: string
}

const SectionThree = () => {
  const [activeTab, setActiveTab] = useState(0)

  const content: ServiceContent[] = [
    {
      title: "Game Design",
      title2: " & Content",
      text: `Our game design philosophy centers on player retention. We craft compelling core loops, balanced progression systems, and engaging content that hooks players, utilizing UA analytics and live ops insights to optimize fun and monetization.`,
      image: "/images/ourServices/design.png",
    },
    {
      title: "Quality",
      title2: "Assurance",
      text: `Our rigorous game testing and QA processes guarantee a polished, bug-free experience across all devices. We focus on performance, usability, and stability to protect your reputation and ensure positive player reviews at launch.`,
      image: "/images/ourServices/quality.png",
    },
    {
      title: "Creative ",
      title2: "Marketing",
      text: `We don't just build games; we launch them successfully. Our creative marketing services cover user acquisition (UA) strategy, ASO (App Store Optimization), creative asset production, and community management to maximize your game's visibility and installs.`,
      image: "/images/ourServices/marketing.png",
    },
    {
      title: "Game",
      title2: "Engineering",
      text: `Our game engineering team builds scalable, high-performance backends and smooth client-side code for iOS and Android. We ensure technical excellence, stability, and seamless integration of SDKs for UA, analytics, and monetization.`,
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
          <span className="border-b-2 border-foreground">Our</span> <span className="text-neon-green">Services</span>
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
                  activeTab === index ? "text-neon-green md:text-2xl ml-20" : "text-gray-400 md:text-xl text-base ml-20"
                }`}
              >
                "{item.title}
              </span>
              <span
                className={`text-xl ${
                  activeTab === index ? "text-foreground md:text-2xl ml-20" : "text-gray-400 md:text-xl text-base ml-20"
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
