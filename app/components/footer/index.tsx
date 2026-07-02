"use client"

import Link from "next/link"
import { motion, type Variants } from "framer-motion"
import Logo from "../logo"

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
}

const linkClassName =
  "inline-block transition-colors duration-200 hover:text-neon-green active:text-neon-green md:hover:underline"

const Footer = () => {
  return (
    <footer className="relative mt-12 overflow-hidden border-t-2 border-neon-green py-14 text-white md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 md:hidden" />

      <motion.div
        className="container relative z-10 mx-auto flex flex-col items-center gap-10 px-6 md:flex-row md:items-start md:justify-between md:gap-0 md:px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <motion.div
          variants={itemVariants}
          className="flex w-full flex-col items-center text-center md:mb-0 md:w-1/4 md:items-start md:text-left"
        >
          <Logo />
          <p className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl">
            Level Up Your
          </p>
          <p className="text-2xl font-semibold leading-tight sm:text-3xl">
            <span className="text-neon-green">Gaming</span> Experience
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex w-full flex-col items-center text-center md:mb-0 md:w-1/4 md:items-start md:text-left"
        >
          <h3 className="mb-5 text-lg font-semibold sm:text-xl">
            Our <span className="text-neon-green">Studio</span>
          </h3>
          <ul className="space-y-3">
            <li>
              <Link href="/about-us" className={linkClassName}>
                About Us
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className={linkClassName}>
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/careers" className={linkClassName}>
                Careers
              </Link>
            </li>
            <li>
              <a
                href="https://docs.google.com/document/d/1qt9gCVkKE60zuHAEAsd9lQ2eqyzufHjhO_9zOi5VkEY/pub"
                className={linkClassName}
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms Of Service
              </a>
            </li>
          </ul>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex w-full flex-col items-center text-center md:mb-0 md:w-1/4 md:items-start md:text-left"
        >
          <h3 className="mb-5 text-lg font-semibold sm:text-xl">
            Our <span className="text-neon-green">Services</span>
          </h3>
          <ul className="space-y-3">
            <li>
              <Link href="/about-us" className={linkClassName}>
                Game Development
              </Link>
            </li>
            <li>
              <Link href="/about-us" className={linkClassName}>
                Game Art
              </Link>
            </li>
            <li>
              <Link href="/about-us" className={linkClassName}>
                Metaverse Development
              </Link>
            </li>
          </ul>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex w-full flex-col items-center text-center md:w-1/4 md:items-start md:text-left"
        >
          <h3 className="mb-5 text-lg font-semibold sm:text-xl">
            <span className="text-neon-green">Contact</span> Us
          </h3>
          <p className="mb-3 text-base sm:text-lg">contact@ufdstudios.com</p>
          <p className="mb-6 text-base sm:text-lg">+92 310 2185994</p>
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="md:static"
          >
            <Link
              href="/contact"
              className="footer-cta inline-block rounded-full bg-white px-8 py-3 text-base font-semibold text-black shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300 hover:bg-neon-green hover:shadow-[0_0_24px_rgba(57,255,20,0.35)]"
            >
              Chat with us
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="relative z-10 mt-12 border-t border-gray-700/80 px-6 pt-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p className="text-sm text-white/80 sm:text-base">
          © 2026 <span className="text-neon-green">UFD Studios</span>. All Rights Reserved
        </p>
      </motion.div>
    </footer>
  )
}

export default Footer
