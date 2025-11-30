import Link from "next/link"
import Logo from "../logo"

const Footer = () => {
  return (
    <footer className="text-white py-10 mt-12 border-t-2 border-neon-green">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:items-start px-4">
        <div className="mb-8 md:mb-0 md:w-1/4">
          <Logo />
          <p className="text-xl font-semibold">Level Up Your</p>
          <p className="mb-4 text-xl font-semibold">
            <span className="text-neon-green">Gaming</span> Experience
          </p>
          <div>
            <div className="flex items-center mb-2">
              {/* <span className="material-icons text-red-600 mr-2">
                location_on
              </span>
              <span>San Francisco, CA 94111, USA</span> */}
            </div>
            <div className="flex items-center">
              {/* <span className="material-icons text-red-600 mr-2">
                location_on
              </span>
              <span>Devsinc Tower, Lahore, PK</span> */}
            </div>
          </div>
        </div>

        <div className="mb-8 md:mb-0 md:w-1/4">
          <h3 className="font-semibold mb-4">
            Our <span className="text-neon-green">Studio</span>
          </h3>
          <ul>
            <li className="mb-2">
              <Link href="/about-us" className="hover:underline hover:text-neon-green transition-colors">
                About Us
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/portfolio" className="hover:underline hover:text-neon-green transition-colors">
                Portfolio
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/careers" className="hover:underline hover:text-neon-green transition-colors">
                Careers
              </Link>
            </li>
            <li className="mb-2">
              <a
                href="https://docs.google.com/document/d/1qt9gCVkKE60zuHAEAsd9lQ2eqyzufHjhO_9zOi5VkEY/pub"
                className="hover:underline hover:text-neon-green transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms Of Service
              </a>
            </li>
          </ul>
        </div>

        <div className="mb-8 md:mb-0 md:w-1/4">
          <h3 className="font-semibold mb-4">
            Our <span className="text-neon-green">Services</span>
          </h3>
          <ul>
            <li className="mb-2">
              <Link href="/services" className="hover:underline hover:text-neon-green transition-colors">
                Game Development
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/services" className="hover:underline hover:text-neon-green transition-colors">
                Game Art
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/services" className="hover:underline hover:text-neon-green transition-colors">
                Metaverse Development
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:w-1/4">
          <h3 className="font-semibold mb-4">
            <span className="text-neon-green">Contact</span> Us
          </h3>
          <p className="mb-4">contact@ufdstudios.com</p>
          <p className="mb-4">+92 310 2185994</p>
          <Link
            href="/contact"
            className="bg-white text-black px-4 py-2 rounded-full hover:bg-neon-green hover:text-black transition-all duration-300 inline-block"
          >
            Chat with us
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p>
          © 2024 <span className="text-neon-green">UFD Studios</span>. All Rights Reserved
        </p>
      </div>
    </footer>
  )
}

export default Footer
