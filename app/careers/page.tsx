import Image from "next/image";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

interface JobPosition {
  title: string;
}

const Careers = () => {
  const jobPositions: JobPosition[] = [
    { title: "Unity Game Developer" },
    { title: "2D Game Animator" },
    { title: "3D Artist" },
    { title: "Lead Game Artist" },
  ];

  return (
    <div className="bg-main" >
      {/* Employee Testimonials */}
      <div className="w-full h-full text-white px-6 py-12 flex flex-col items-center">
        <h2 className="text-neon-green text-center text-5xl font-bold mb-12">
          " <span className="text-white">What</span> are Employees Saying? "
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center w-full max-w-12xl">
          <div>
            <div className="relative w-[259px] h-[150px] mx-auto">
              <Image
                src="/images/career/1/box.png"
                alt="91% Background"
                width={259}
                height={150}
                className="object-contain"
              />
              <span className="absolute inset-0 flex items-center justify-center font-bold text-5xl [text-shadow:_2px_2px_4px_black]">
                91%
              </span>
            </div>
            <h3 className="font-bold mt-4 text-2xl">Great place to work</h3>
            <p className="text-gray-300 text-xl">
              As told by 91% of our employees worldwide
            </p>
          </div>
          <div>
            <div className="relative w-[259px] h-[150px] mx-auto">
              <Image
                src="/images/career/1/box.png"
                alt="91% Background"
                width={259}
                height={150}
                className="object-contain"
              />
              <span className="absolute inset-0 flex items-center justify-center font-bold text-5xl [text-shadow:_2px_2px_4px_black]">
                91%
              </span>
            </div>
            <h3 className="font-bold mt-4 text-2xl">
              I enjoy my job, no doubt
            </h3>
            <p className="text-gray-300 text-xl">
              Shared by 91% of our worldwide team
            </p>
          </div>
          <div>
            <div className="relative w-[259px] h-[150px] mx-auto">
              <Image
                src="/images/career/1/box.png"
                alt="93% Background"
                width={259}
                height={150}
                className="object-contain"
              />
              <span className="absolute inset-0 flex items-center justify-center font-bold text-5xl [text-shadow:_2px_2px_4px_black]">
                93%
              </span>
            </div>
            <h3 className="font-bold mt-4 text-2xl">Respectful Environment</h3>
            <p className="text-gray-300 text-xl">
              Experienced by 93% of our team around the globe
            </p>
          </div>
        </div>

        {/* What We Offer */}
        <h2 className="text-neon-green text-5xl font-bold my-12 text-center">
          " <span className="text-white">What</span> do we offer? "
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center w-full max-w-12xl">
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/images/career/1/teamIcon.png"
              alt="Amazing team"
              width={242}
              height={150}
            />
            <h3 className="font-bold mt-4 text-2xl">Amazing team</h3>
            <p className="text-gray-300 text-xl lg:w-[30rem]">
              Be part of a great startup team in a cozy and respectful
              environment.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/images/career/1/remoteIcon.png"
              alt="Remote working"
              width={197}
              height={163}
            />
            <h3 className="font-bold mt-4 text-2xl">Remote working</h3>
            <p className="text-gray-300 text-xl lg:w-[30rem]">
              Remote working and flexible working hours. You can work anywhere
              in the world, anytime you wish.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/images/career/1/worldIcon.png"
              alt="Have an impact"
              width={215}
              height={190}
            />
            <h3 className="font-bold mt-4 text-2xl">Have an impact</h3>
            <p className="text-gray-300 text-xl lg:w-[30rem]">
              Have an impact Enjoy the satisfaction of knowing that your work is
              reaching millions of people from every corner.
            </p>
          </div>
        </div>

        <div className="w-full text-white mt-9">
          <div className="grid md:grid-cols-3 gap-8 text-center w-full max-w-12xl">
            <div className="flex flex-col items-center justify-center">
              <Image
                src="/images/career/2/bulb icon.png"
                alt="Learning and Development"
                width={125}
                height={178}
                className="mx-auto mb-4"
              />
              <h3 className="font-bold mt-4 text-2xl">
                Learning and Development
              </h3>
              <p className="text-gray-300 text-xl lg:w-[30rem]">
                Be part of a great startup team in a cozy and respectful
                environment.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Image
                src="/images/career/2/hand icon.png"
                alt="Compensation"
                width={188}
                height={173}
                className="mx-auto mb-4"
              />
              <h3 className="font-bold mt-4 text-2xl">Compensation</h3>
              <p className="text-gray-300 text-xl lg:w-[30rem]">
                We believe the best talent deserves the best and just free minds
                to greate things.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Image
                src="/images/career/2/world.png"
                alt="Travels"
                width={157}
                height={157}
                className="mx-auto mb-4"
              />
              <h3 className="font-bold mt-4 text-2xl">Travels</h3>
              <p className="text-gray-300 text-xl lg:w-[30rem]">
                Join top conferences in your area, meet the best professionals
                and have opportunity to exploreb the greatest places.
              </p>
            </div>
          </div>

          <h2 className="text-neon-green text-center text-4xl font-bold mb-6 mt-24">
            <span className="text-neon-green">"</span>
            <span className="text-neon-green font-bold">Open </span>
            <span className="text-white font-bold">Positions</span>
            <span className="text-neon-green">"</span>
          </h2>
          <div className="w-full lg:px-24">
            {jobPositions.map((job, index) => (
              <div
                key={index}
                className="border border-neon-green rounded-lg flex justify-between items-center p-4 mb-4 hover:bg-opacity-10 transition-all duration-300"
              >
                <div>
                  <h3 className="font-bold text-xl">{job.title}</h3>
                  <p className="text-gray-400">Remote, Full Time</p>
                </div>
                <a
                  href="https://www.linkedin.com/company/ufd-studios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-neon-green text-center rounded-full md:w-56 md:h-12 flex justify-between items-center gap-2 hover:bg-green-600 hover:text-black transition-all duration-300 px-4"
                >
                  <span></span>
                  <span className="font-semibold">Apply</span>
                  <Image
                    src="/images/career/2/arrow.png"
                    alt="Arrow"
                    width={58}
                    height={26}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
