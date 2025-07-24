"use client";
import { useState } from "react";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): FormErrors => {
    const tempErrors: FormErrors = {};
    if (!name.trim()) tempErrors.name = "Name is required";
    if (!email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email is not valid";
    }
    if (!message.trim()) tempErrors.message = "Message is required";
    return tempErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tempErrors = validate();

    if (Object.keys(tempErrors).length === 0) {
      setIsSubmitting(true);
      setErrors({});
      setSuccessMessage("");

      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("message", message);

        const response = await fetch("https://formspree.io/f/myzperyp", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          setSuccessMessage("Message Sent Successfully!");
          setName("");
          setEmail("");
          setMessage("");

          setTimeout(() => {
            setSuccessMessage("");
          }, 5000);
        } else {
          setErrors({ message: "Failed to send message. Please try again." });
        }
      } catch (error) {
        console.error(error);
        setErrors({ message: "Failed to send message. Please try again." });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(tempErrors);
      setSuccessMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-3 block w-full rounded-md border-b-2 border-b-neon-green shadow-sm bg-transparent text-primary outline-none focus:border-b-neon-green transition-colors duration-200"
          placeholder="Enter your name"
        />
        {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 p-3 block w-full rounded-md border-b-2 border-b-neon-green shadow-sm bg-transparent text-primary outline-none focus:border-b-neon-green transition-colors duration-200"
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 p-3 block w-full rounded-md border-b-2 border-b-neon-green shadow-sm bg-transparent text-primary outline-none focus:border-b-neon-green transition-colors duration-200 resize-vertical min-h-[120px]"
          rows={5}
          placeholder="Enter your message"
        />
        {errors.message && <p className="text-red-500 text-sm mt-2">{errors.message}</p>}
      </div>

      <div className="flex flex-col space-y-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-neon-green text-black font-semibold px-6 py-3 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-neon-green focus:ring-opacity-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}

        {errors.message && !errors.name && !errors.email && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{errors.message}</span>
          </div>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
