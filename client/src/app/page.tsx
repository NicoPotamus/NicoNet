'use client';

import Navbar from "./components/Navbar";
import Ribbons from "./components/Ribbons";
import ContactForm from "./components/ContactForm";
import { ArrowRight, Anchor, Key } from "@deemlol/next-icons";
import Link from "next/link";
import NNLogo from "./NNLogo.png";
import Image from "next/image";

export default function Home() {
  const scrollToForm = () => {
    document.querySelector('.project-form')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <>
      <Navbar />
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <Ribbons />

        <div className="container mx-auto lg:px-12 px-5 py-24 md:py-32 relative z-10 lg:h-[90vh]">
          <div className="flex flex-col md:flex-row items-center justify-around">
            <div className="w-full md:w-1/2 mb-12 md:mb-0 relative">
              <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-tight">
                Expert
                <br />
                <span className="bg-gradient-to-r from-blue-700 via-green-400 to-indigo-400 inline-block text-transparent bg-clip-text">
                  Software Engineering
                </span>
              </h1>

              <p className="text-xl mb-5 text-gray-300">
                From custom web applications to complex systems, we deliver high-performance software solutions that scale. Let&apos;s turn your vision into reality.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={scrollToForm}
                  className="group relative w-full sm:w-auto px-6 py-3 min-w-[200px] transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-lg"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-lg lg:blur-md blur-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                  <div className="relative flex items-center justify-center gap-2">
                    <span className="text-white font-medium">Start Your Project</span>
                    <ArrowRight size={24} color="#FFFFFF" className="group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </button>

                <Link 
                  href="/portfolio" 
                  className="group relative w-full sm:w-auto px-6 py-3 min-w-[200px] transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg lg:blur-md blur-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                  <div className="relative flex items-center justify-center gap-2">
                    <span className="text-white font-medium">View Portfolio</span>
                    <ArrowRight size={24} color="#FFFFFF" className="group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Link>
              </div>
            </div>

            <div className="w-full md:w-2/5 md:pl-12">
              <div className="bg-white bg-opacity-10 backdrop-filter md:backdrop-blur-lg relative rounded-xl p-8 pt-16 shadow-2xl">
                <Image 
                  src={NNLogo} 
                  alt="NN Logo" 
                  width={64} 
                  height={64} 
                  className="absolute top-4 right-4"
                />
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <Key size={24} color="#60A5FA" className="w-6 h-6 mr-3" />
                    <span><b>Full-Stack Development</b> - Modern web applications using React, Next.js, Node.js, and cutting-edge tech.</span>
                  </li>
                  <li className="flex items-center">
                    <Key size={24} color="#34D399" className="w-6 h-6 mr-3" />
                    <span><b>Mobile & Cross-Platform</b> - Native and hybrid mobile apps that deliver exceptional user experiences.</span>
                  </li>
                  <li className="flex items-center">
                    <Key size={24} color="#A78BFA" className="w-6 h-6 mr-3" />
                    <span><b>System Architecture</b> - Scalable, secure, and maintainable solutions designed for your business needs.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      <section className="py-16 bg-white project-form">
        <div className="container mx-auto px-5 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Ready to Start Your Project?</h2>
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
              <ContactForm 
                showSubject={true}
                successMessage="Thank you for reaching out. I'll get back to you soon!"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
