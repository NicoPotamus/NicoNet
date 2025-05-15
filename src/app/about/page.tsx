import Navbar from "../components/Navbar";
import { Download } from "@deemlol/next-icons";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="flex h-screen items-center justify-center bg-gray-900 p-5">
        <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-10 md:px-10">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-white">
              <span className="text-green-500">Hi,</span> I&apos;m Full Stack
              Developer
            </h1>
            <p className="mb-6 text-white">
              At <b>NicoNet</b>, we create custom web and software solutions that help
              businesses and startups scale. With a focus on performance,
              security, and user experience, we turn ideas into fully
              functional, high-quality applications. Are you ready to build something
              amazing?
            </p>
            <div className="flex justify-center space-x-5">
              <button className="flex w-1/2 items-center justify-center gap-1 rounded-2xl bg-rose-500 p-5 py-3 font-semibold text-white hover:bg-rose-700">
                Follow
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div>
            <img
              src=""
              alt="Photo of the Nico"
              className="md:size-96 size-72 rounded-full "
            />
          </div>
        </div>
      </div>
    </>
  );
}
