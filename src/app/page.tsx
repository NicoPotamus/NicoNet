import Navbar from "./components/Navbar";
//import Image from "next/image";
import Ribbons from "./components/Ribbons";
import { ArrowRight, Anchor, Key } from "@deemlol/next-icons";

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
                Welcome to
                <br />
                <span className="bg-gradient-to-r from-blue-700 via-green-400 to-indigo-400 inline-block text-transparent bg-clip-text">
                  NicoNet
                </span>
              </h1>

              <p className="text-xl mb-5 text-gray-300">
                Leveraging modern technologies to deliver relaible and efficient
                products.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="group relative w-full sm:w-auto px-6 py-3 min-w-[160px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-lg"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-lg lg:blur-md blur-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                  <div className="relative flex items-center justify-center gap-2">
                    <span className="text-white font-medium">Get Started</span>
                    <ArrowRight size={24} color="#FFFFFF" />
                  </div>
                </button>

                <button className="w-full sm:w-auto px-6 py-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-lg text-white/70 hover:bg-white/10 hover:text-white transition-all min-w-[160px]">
                  Documentation
                </button>
              </div>
            </div>

            <div className="w-full md:w-2/5 md:pl-12">
              <div className="bg-white bg-opacity-10 backdrop-filter md:backdrop-blur-lg relative rounded-xl p-8 shadow-2xl">
                <h2 className="text-2xl font-semibold mb-6">Why Choose Us?</h2>
                <Anchor
                  size={24}
                  color="#FFFFFF"
                  className="h-16 right-2 top-2 drop_shadow lg:block md:block hidden absolute "
                />
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <Key size={24} color="yellow" className="w-6 h-6 mr-3" />
                    <span>Data-Driven EarthTech Solutions</span>
                  </li>
                  <li className="flex items-center">
                    <Key size={24} color="green" className="w-6 h-6 mr-3" />
                    <span>Human-Centric AI & Analytics</span>
                  </li>
                  <li className="flex items-center">
                    <Key size={24} color="magenta" className="w-6 h-6 mr-3" />
                    <span>NextGen Technology for a Sustainable Future</span>
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
    </>
  );
}
