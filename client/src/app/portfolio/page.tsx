import Navbar from "../components/Navbar";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Github } from "@deemlol/next-icons";

interface Project {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    title: "Interview Coach",
    description: "Help user get their dream job by providing in demand skills on the job market based on job title.",
    tags: ["React-Native", "Expo", "TypeScript", "Native-Wind", "FastAPI", "SQL", "AWS", "Docker"],
    imageUrl: "/interview_coach.png", // Image is in public directory, so we use root path
    liveUrl: "https://brybytes.com",
    githubUrl: "https://github.com/nicopotamus/interview_coach",
  },
  // Add more projects here
];

export default function Portfolio() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Portfolio</h1>
              <p className="text-xl text-gray-300 mb-8">Full-stack Developer specializing in modern web technologies</p>
              <div className="flex justify-center gap-4">
                <Link
                  href="https://github.com/nicopotamus"
                  target="_blank"
                  className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Github size={24} />
                  GitHub Profile
                </Link>
                <Link
                  href="/NicoResume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
                >
                  View Resume
                  <ArrowRight size={24} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-video bg-gray-200 relative">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index === 0}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {project.liveUrl && (
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                        >
                          Live Demo
                          <ArrowRight size={20} />
                        </Link>
                      )}
                      {project.githubUrl && (
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                        >
                          <Github size={20} />
                          Code
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Technical Skills</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Languages</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>Java</li>
                    <li>C</li>
                    <li>TypeScript</li>
                    <li>Python</li>
                    <li>ARM Assembly</li>
                    <li>oCaml</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Frameworks/Libraries</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>BS4</li>
                    <li>Express.js</li>
                    <li>node.js</li>
                    <li>Mockito</li>
                    <li>jUnit</li>
                    <li>React</li>
                    <li>React-Native</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Developer Tools</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>Git/GitHub</li>
                    <li>Docker</li>
                    <li>AWS</li>
                    <li>MongoDB</li>
                    <li>Gradle</li>
                    <li>Microsoft Office</li>
                    <li>Supabase</li>
                    <li>Keil</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Let&apos;s Work Together</h2>
              <p className="text-gray-600 mb-8">I&apos;m currently available for freelance projects and full-time opportunities.</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Get in Touch
                <ArrowRight size={24} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
