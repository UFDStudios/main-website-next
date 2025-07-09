import Image from "next/image";
import ContactForm from "./_components/contact-form";

const ContactUs = () => {
  return (
    <div className="flex flex-col justify-center text-center px-4">
      <h1 className="text-primary font-extrabold md:text-7xl text-4xl">
        Contact <span className="text-neon-green">Us</span>
      </h1>
      <div className="grid md:grid-cols-2 grid-cols-1 mt-32 text-left gap-8">
        <div className="md:ml-32">
          <div className="flex space-x-5 items-center">
            <Image
              src="/images/contact/email.png"
              alt="email"
              width={74}
              height={74}
              className="p-3"
            />
            <h3 className="md:text-left text-primary md:text-3xl text-xl">
              contact@ufdstudios.com
            </h3>
          </div>
          <div className="flex space-x-5 items-center mt-7">
            <Image
              src="/images/contact/phone.png"
              alt="phone"
              width={74}
              height={74}
              className="p-3"
            />
            <h3 className="md:text-left text-primary md:text-3xl text-xl">
              +92 310 2185994
            </h3>
          </div>
          <div className="flex space-x-5 items-center justify-center align-bottom md:mt-[16rem] mt-10">
            <Image
              src="/images/contact/linkedin.png"
              alt="linkedin"
              width={74}
              height={74}
              className="p-3 cursor-pointer hover:opacity-80 transition-opacity"
            />
            <Image
              src="/images/contact/insta.png"
              alt="instagram"
              width={74}
              height={74}
              className="p-3 cursor-pointer hover:opacity-80 transition-opacity"
            />
            <Image
              src="/images/contact/twitter.png"
              alt="twitter"
              width={74}
              height={74}
              className="p-3 cursor-pointer hover:opacity-80 transition-opacity"
            />
          </div>
        </div>
        <div className="md:mr-12 p-10 bg-gray-800/70 justify-center rounded-lg">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
