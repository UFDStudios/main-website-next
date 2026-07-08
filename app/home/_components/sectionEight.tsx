"use client"

import { useEffect, useState } from "react"
import { FaQuoteRight, FaStar, FaUserCircle } from "react-icons/fa"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { COUNTRY_NAME_TO_CODE } from "@/lib/countryCodes"

type Review = {
  name: string
  role: string
  rating: number
  review: string
  link: string
  avatar?: string
  countryCode?: string
}

const toFlagEmoji = (countryCode: string) =>
  countryCode
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .slice(0, 2)
    .split("")
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("")

const resolveCountryCode = (review: Review) =>
  review.countryCode?.toUpperCase() ?? COUNTRY_NAME_TO_CODE[review.role]

// Placeholder data – swap these out with real client reviews later.
const reviews: Review[] = [
  {
    name: "Marcus Robinson",
    role: "United States",
    rating: 5,
    review:
      "Ammaz and his team exceeded all expectations yet again! Truly the best game developer on Fiverr. His attention to detail is outstanding, and while I was very particular about how I wanted the game to look and feel, he made sure to deliver exactly what I wanted.",
    link: "https://www.fiverr.com/ufd_studio",
    avatar: "/images/clientReview/mpr5034.webp",
  },
  {
    name: "Hugo Kwon",
    role: "South Korea",
    rating: 5,
    review:
      "Your amazing work is so incredible it takes my breath away. Meeting such an excellent partner like you at the start of the new year in 2026 feels like pure good fortune. I’d love for us to keep creating meaningful results together with great synergy moving forward.",
    link: "https://www.fiverr.com/ufd_studio",
    avatar: "/images/clientReview/hugokwon.webp",
  },
  {
    name: "Rajesh Desaii",
    role: "India",
    rating: 5,
    review:
      "It was a great experience working with this developer. The Nut Sort game was completed professionally and all requested changes were implemented properly. Communication was smooth, updates were shared on time, and the developer was very supportive throughout the project.",
    link: "https://www.upwork.com/freelancers/~01fafd10accb24f36b",
    avatar: "/images/clientReview/rajeshDesai.png",
  },
  {
    name: "Julian N",
    role: "Germany",
    rating: 5,
    review:
      "They delivered high-quality work on time and communicated clearly throughout the project. Would definitely recommend and hire again.",
    link: "https://www.fiverr.com/ufd_studio",
    avatar: "/images/clientReview/juno_ger.webp",
  },
  {
    name: "Luis Guary",
    role: "Colombia",
    rating: 5,
    review:
      "Working with ufd_studio has been an amazing experience. From the very beginning, he showed commitment, patience, and a genuine willingness to listen to every idea I had. The final result of the game exceeded my expectations.",
    link: "https://www.fiverr.com/ufd_studio",
    avatar: "/images/clientReview/luisguary.webp",
  },
  {
    name: "Ashraf",
    role: "Germany",
    rating: 5,
    review:
      "You can find many service providers on Fivver. Some are just cheap and do their job. But there are other service providers who not only do their job, but you can see that they are 100% committed to the project. You don't find such gems very often.",
    link: "https://www.fiverr.com/ufd_studio",
    avatar: "/images/clientReview/ashraffashion.webp",
  },
  {
    name: "Chris Pilavides",
    role: "Cyprus",
    rating: 5,
    review:
      "Great team . Cooperative and always trying to deliver the best results .",
    link: "https://www.fiverr.com/ufd_studio",
    avatar: "/images/clientReview/chrispilavides.webp",
  },
  {
    name: "Daniel",
    role: "United Kingdom",
    rating: 5,
    review:
      "Working with Ufd Studios was great! He fixed my issue super fast and was really easy to talk to. I'd highly recommend him!",
    link: "https://www.fiverr.com/ufd_studio",
    avatar: "/images/clientReview/danielharangozo.webp",
  },
  {
    name: "Josh Rennolds",
    role: "United Kingdom",
    rating: 5,
    review:
      "Great work",
    link: "https://www.fiverr.com/ufd_studio",
    avatar: "/images/clientReview/joshrennolds1.webp",
  }
]

const useItemsPerView = () => {
  const [itemsPerView, setItemsPerView] = useState(3)

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) setItemsPerView(1)
      else if (window.innerWidth < 1024) setItemsPerView(2)
      else setItemsPerView(3)
    }

    updateItemsPerView()
    window.addEventListener("resize", updateItemsPerView)
    return () => window.removeEventListener("resize", updateItemsPerView)
  }, [])

  return itemsPerView
}

const ReviewCard = ({ review }: { review: Review }) => {
  const countryCode = resolveCountryCode(review)

  return (
  <a
    href={review.link}
    target="_blank"
    rel="noopener noreferrer"
    className="relative flex h-full cursor-pointer flex-col rounded-3xl border border-white/10 bg-gray-800/40 p-8 backdrop-blur-sm transition-colors duration-300 hover:border-neon-green/40"
  >
    <FaQuoteRight className="absolute right-6 top-6 text-3xl text-neon-green/20" />

    <div className="flex flex-col items-center text-center">
      <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-neon-green/50">
        {review.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={review.avatar} alt={review.name} className="h-full w-full object-cover" />
        ) : (
          <FaUserCircle className="h-full w-full text-gray-600" />
        )}
      </div>

      <h3 className="mt-5 text-xl font-bold text-foreground">{review.name}</h3>
      <p className="mt-1 flex items-center justify-center gap-2 text-sm text-gray-400">
        {countryCode && (
          <span className="text-base leading-none" aria-hidden="true">
            {toFlagEmoji(countryCode)}
          </span>
        )}
        <span>{review.role}</span>
      </p>

      <div className="mt-3 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-600"} />
        ))}
      </div>
    </div>

    <p className="mt-6 text-center text-base leading-relaxed text-gray-300">{review.review}</p>
  </a>
  )
}

const SectionEight = () => {
  const itemsPerView = useItemsPerView()
  const [page, setPage] = useState(0)

  const totalPages = Math.max(1, Math.ceil(reviews.length / itemsPerView))

  // Keep the active page valid when the viewport (itemsPerView) changes.
  useEffect(() => {
    setPage((prev) => Math.min(prev, totalPages - 1))
  }, [totalPages])

  const goPrev = () => setPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  const goNext = () => setPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))

  return (
    <div className="w-full mt-18">
      <div className="flex flex-col items-center text-center px-6">
        <h1 className="text-foreground font-extrabold md:text-7xl text-4xl">
          <span className="text-neon-green">Reviews &</span> Social Proof
        </h1>
        <p className="md:w-[50%] text-foreground text-2xl mt-4">
          Don't just take our words for it – Take theirs!
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-7xl px-6">
        <div className="flex items-center gap-4 md:gap-6">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous reviews"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-foreground transition-colors duration-300 hover:border-neon-green hover:text-neon-green md:h-12 md:w-12"
          >
            <FiChevronLeft className="text-2xl" />
          </button>

          <div className="min-w-0 flex-1 overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${page * 100}%)` }}
            >
              {reviews.map((review, i) => (
                <div
                  key={i}
                  className="shrink-0 px-4"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next reviews"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-foreground transition-colors duration-300 hover:border-neon-green hover:text-neon-green md:h-12 md:w-12"
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === page ? "w-8 bg-neon-green" : "w-2.5 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SectionEight
