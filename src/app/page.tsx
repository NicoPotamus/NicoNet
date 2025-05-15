import Navbar from "./components/Navbar";
//import Image from "next/image";
import Ribbons from "./components/Ribbons";
import { ArrowRight, Anchor, Key } from "@deemlol/next-icons";
import Link from "next/link";

export default function Home() {
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
                From custom web applications to complex systems, we deliver high-performance software solutions that scale. Let's turn your vision into reality.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="group relative w-full sm:w-auto px-6 py-3 min-w-[200px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-lg"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-lg lg:blur-md blur-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                  <div className="relative flex items-center justify-center gap-2">
                    <span className="text-white font-medium">Start Your Project</span>
                    <ArrowRight size={24} color="#FFFFFF" />
                  </div>
                </button>

                <Link href="/portfolio" className="group relative w-full sm:w-auto px-6 py-3 min-w-[200px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg lg:blur-md blur-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                  <div className="relative flex items-center justify-center gap-2">
                    <span className="text-white font-medium">View Portfolio</span>
                    <ArrowRight size={24} color="#FFFFFF" />
                  </div>
                </Link>
              </div>
            </div>

            <div className="w-full md:w-2/5 md:pl-12">
              <div className="bg-white bg-opacity-10 backdrop-filter md:backdrop-blur-lg relative rounded-xl p-8 shadow-2xl">
                <h2 className="text-2xl font-semibold mb-6">Expert Services</h2>
                <Anchor
                  size={24}
                  color="#FFFFFF"
                  className="h-16 right-2 top-2 drop_shadow lg:block md:block hidden absolute"
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

      <section className="py-16 bg-white">
        <div className="container mx-auto px-5 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Ready to Start Your Project?</h2>
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select project type</option>
                    <option value="web">Web Application</option>
                    <option value="mobile">Mobile App</option>
                    <option value="system">System Integration</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32" placeholder="Tell us about your project"></textarea>
                </div>
                <div>
                  <button type="submit" className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
