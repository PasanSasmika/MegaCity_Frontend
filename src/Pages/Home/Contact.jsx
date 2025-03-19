import React from 'react';
import { IoLocationSharp, IoCall, IoMail } from 'react-icons/io5';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import image from '/contact.jpg'


function Contact() {
  return (
    <div className="min-h-screen bg-white py-20 px-4 sm:px-8 lg:px-16">
      {/* Main Content Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Side: Text Content */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-4xl sm:text-5xl font-primary font-bold text-accent mb-6">
            Contact Us
          </h1>
          <h2 className="text-3xl font-primary font-semibold text-primary mb-6">Get In Touch</h2>
          <p className="text-lg text-gray-600 mb-8 font-secondary">
          Have questions or need assistance? Our team is here to help! Reach out to us anytime for bookings, inquiries, or support.
</p>

          {/* Contact Details */}
          <div className="space-y-6">
            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="text-primary text-2xl">
                <IoLocationSharp />
              </div>
              <div>
                <h3 className="text-xl font-bold text-accent font-primary">Location</h3>
                <p className="text-gray-600 font-secondary">
                  Jl. Merdeka Raya No. 73B, Kuta, Badung, Bali
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="text-primary text-2xl">
                <IoCall />
              </div>
              <div>
                <h3 className="text-xl font-bold text-accent font-primary">Phone</h3>
                <p className="text-gray-600 font-secondary">
                077-8987866 | 0776655434
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="text-primary text-2xl">
                <IoMail />
              </div>
              <div>
                <h3 className="text-xl font-bold text-accent font-primary">Email</h3>
                <p className="text-gray-600 font-secondary">
                  taxico@support.com
                </p>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-accent mb-4 font-primary">Social Media</h3>
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-primary transition duration-300">
                <FaFacebook className="text-2xl" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary transition duration-300">
                <FaTwitter className="text-2xl" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary transition duration-300">
                <FaInstagram className="text-2xl" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary transition duration-300">
                <FaLinkedin className="text-2xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form or Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={image} // Replace with your image URL
            alt="Contact Us"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Contact;