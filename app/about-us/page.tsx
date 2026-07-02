import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const AboutUs = () => {
  return (
    <div className="w-full bg-main text-white p-2 overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative w-full flex flex-col lg:flex-row py-4 lg:py-6">
        {/* Left Section - Full width on mobile, half on desktop */}
        <div className="w-full lg:w-1/2 relative flex items-center justify-center py-2 lg:py-0">

          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-[80vw] lg:max-w-[560px] h-auto">
              <Image
                src="/images/about-us/1/image.png"
                alt="Team"
                width={723}
                height={438}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="flex justify-center mt-3 lg:mt-5">
              <p className="text-base lg:text-xl text-gray-400">
                SUCCESSFUL TEAM
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Full width on mobile, half on desktop */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-start p-4 lg:px-12 lg:py-2">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-center lg:text-left">
            <span className="text-neon-green">"</span>
            <span className="text-white">About </span>
            <span className="text-neon-green">us</span>
            <span className="text-neon-green">"</span>
          </h1>
          <p className="mt-2 lg:mt-4 text-base md:text-lg lg:text-xl xl:text-2xl text-justify">
            At UFD Studio, we are passionate about creating immersive and
            high-quality gaming experiences, based in Lahore. We specialize in
            developing both 2D and 3D games that captivate players around the
            world.
          </p>
          <p className="mt-2 lg:mt-4 text-base md:text-lg lg:text-xl xl:text-2xl text-justify">
            Our team of skilled artists, designers, and developers is dedicated
            to pushing the boundaries of gaming with innovative designs and
            cutting-edge technology.
          </p>
          <p className="mt-2 lg:mt-4 text-base md:text-lg lg:text-xl xl:text-2xl text-justify">
            We focus on quality and creativity, ensuring that every game we
            produce is both visually stunning and enjoyable.
          </p>
          <div className="mt-3 lg:mt-5 flex flex-col sm:flex-row gap-4 w-full justify-center sm:justify-start">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-3 sm:px-7 py-1.5 sm:py-2 font-bold flex items-center justify-center relative"
              style={{
                backgroundImage: `url(/images/about-us/1/btn.png)`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <p className="text-white text-lg sm:text-xl lg:text-2xl">
                Contact us
              </p>
              <Image
                src="/images/about-us/1/arrow.png"
                alt="Arrow"
                width={40}
                height={16}
                className="ml-2 hover:border border-neon-green rounded-2xl transition-all duration-300"
              />
            </Link>

            <a
              href="#more"
              className="text-neon-green underline text-lg sm:text-xl lg:text-2xl text-center sm:ml-6 sm:mt-2 hover:text-white transition-colors duration-300"
            >
              More
            </a>
          </div>

        </div>
      </div>
      {/* Vision Section */}
      <div className="relative w-full lg:px-8 lg:mt-2 text-center" id="more">
        <div className="flex items-center justify-center gap-4 lg:gap-6">
          {/* Left Image */}
          <div className="relative h-full w-full max-w-[200px] lg:block hidden shrink-0">
            <Image
              src="/images/about-us/2/image1.png"
              alt="Left Character"
              width={320}
              height={480}
              className="w-full h-auto"
            />
            <Image
              src="/images/about-us/2/light-image1.png"
              alt="Light Effect"
              width={320}
              height={480}
              className="absolute top-0 left-0 w-full opacity-50"
            />
          </div>

          {/* Center Text */}
          <div className="w-full flex flex-col justify-center text-center max-w-3xl">
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-3 lg:mb-5">
              <span className="text-neon-green">"</span> We empower your vision{" "}
              <span className="text-neon-green">"</span>
            </h2>

            <div className="w-full flex text-center justify-center px-2 sm:px-4">
              <p className="text-base sm:text-lg lg:text-2xl text-justify">
                At UFD Studios, we are driven by passion for innovation and
                creativity, welcoming dynamic and young minds who can adapt to
                the ever-evolving landscape of the digital gaming industry.
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-full w-full max-w-[200px] lg:block hidden shrink-0">
            <Image
              src="/images/about-us/2/image2.png"
              alt="Right Character"
              width={320}
              height={480}
              className="w-full h-auto"
            />
            <Image
              src="/images/about-us/2/light-image2.png"
              alt="Light Effect"
              width={320}
              height={480}
              className="absolute top-0 left-0 w-full opacity-50"
            />
          </div>
        </div>
      </div>
      {/* Statistics */}
      <div className="mt-0 mb-4 lg:mt-0 lg:mb-5 flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 lg:gap-14 text-center">
        <div>
          <h3 className="text-2xl lg:text-4xl font-bold">
            5<span className="text-neon-green">+</span>
          </h3>
          <p className="text-gray-400 text-xs lg:text-sm font-bold">
            Years of excellence
          </p>
        </div>
        <div>
          <h3 className="text-2xl lg:text-4xl font-bold">
            25<span className="text-neon-green">+</span>
          </h3>
          <p className="text-gray-400 text-xs lg:text-sm font-bold">
            Dedicated professionals
          </p>
        </div>
        <div>
          <h3 className="text-2xl lg:text-4xl font-bold">
            500<span className="text-neon-green">+</span>
          </h3>
          <p className="text-gray-400 text-xs lg:text-sm font-bold">
            Projects completed
          </p>
        </div>
      </div>

    </div>
  );
};

export default AboutUs;
