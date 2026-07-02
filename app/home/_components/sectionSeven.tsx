import ContactForm from "@/app/contact/_components/contact-form"
import Image from "next/image"

const SectionSeven = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 mt-15">
      <div className="md:ml-32">
        <div className="flex space-x-5 items-center">
          <Image src="/images/contact/email.png" alt="Email Icon" width={60} height={60} className="p-3" />
          <h3 className="md:text-left text-foreground md:text-3xl text-xl">contact@ufdstudios.com</h3>
        </div>

        <div className="flex space-x-5 items-center mt-7">
          <Image src="/images/contact/phone.png" alt="Phone Icon" width={60} height={60} className="p-3" />
          <h3 className="md:text-left text-foreground md:text-3xl text-xl">+92 310 2185994</h3>
        </div>

        <div className="flex space-x-5 items-center justify-center md:mt-[16rem] mt-10">
          <a 
            href="https://www.linkedin.com/company/ufd-studios"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Image
              src="/images/contact/linkedin.webp"
              alt="LinkedIn"
              width={60}
              height={60}
              className="p-3 cursor-pointer hover:opacity-80 transition-opacity"
            />
          </a>
          <a
            href="https://www.fiverr.com/ufd_studio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Fiverr"
          >
            <Image
              src="/images/contact/fiverr.webp"
              alt="Fiverr"
              width={60}
              height={60}
              className="p-3 cursor-pointer hover:opacity-80 transition-opacity"
            />
          </a>
          <a
            href="https://upwork.com/freelancers/ammaz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Upwork"
          >
            <Image
              src="/images/contact/upwork.webp"
              alt="Upwork"
              width={60}
              height={60}
              className="p-3 cursor-pointer hover:opacity-80 transition-opacity"
            />
          </a>
        </div>
      </div>
      <div className="md:mr-12 p-10 bg-gray-800/70 bg-opacity-20 justify-center">
        <ContactForm />
      </div>
    </div>
  )
}

export default SectionSeven
