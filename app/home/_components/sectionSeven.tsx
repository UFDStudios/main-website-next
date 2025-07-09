import ContactForm from "@/app/contact/_components/contact-form"
import Image from "next/image"
// import ContactForm from "@/components/contact-form/ContactForm"

const SectionSeven = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 mt-32">
      <div className="md:ml-32">
        <div className="flex space-x-5 items-center">
          <Image src="/images/contact/email.png" alt="Email Icon" width={60} height={60} className="p-3" />
          <h3 className="md:text-left text-foreground md:text-3xl text-xl">contact@ufdstudios.com</h3>
        </div>

        <div className="flex space-x-5 items-center mt-7">
          <Image src="/images/contact/phone.png" alt="Phone Icon" width={60} height={60} className="p-3" />
          <h3 className="md:text-left text-foreground md:text-3xl text-xl">+92 310 2185994</h3>
        </div>

        <div className="flex space-x-5 items-center justify-center align-bottom md:mt-[16rem] mt-10">
          <Image
            src="/images/contact/linkedin.png"
            alt="LinkedIn"
            width={60}
            height={60}
            className="p-3 cursor-pointer hover:opacity-80 transition-opacity"
          />
          <Image
            src="/images/contact/insta.png"
            alt="Instagram"
            width={60}
            height={60}
            className="p-3 cursor-pointer hover:opacity-80 transition-opacity"
          />
          <Image
            src="/images/contact/twitter.png"
            alt="Twitter"
            width={60}
            height={60}
            className="p-3 cursor-pointer hover:opacity-80 transition-opacity"
          />
        </div>
      </div>
      <div className="md:mr-12 p-10 bg-gray-800/70 bg-opacity-20 justify-center">
        <ContactForm />
      </div>
    </div>
  )
}

export default SectionSeven
