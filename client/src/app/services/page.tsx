import Navbar from "../components/Navbar";
import { Code, Server, Database, Cloud, Shield, Smartphone } from "@deemlol/next-icons";

export default function Services() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Services</h1>
              <p className="text-xl text-gray-300">
                Modern web solutions built with cutting-edge technologies
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Modern Web Development */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-blue-100 dark:bg-blue-900 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Code size={28} className="text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Modern Web Development</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Building fast, responsive, and SEO-optimized web applications with Next.js and React.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Next.js Applications</li>
                  <li>• React Single Page Apps</li>
                  <li>• Server-Side Rendering</li>
                  <li>• Performance Optimization</li>
                </ul>
              </div>

              {/* Full-Stack Development */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-green-100 dark:bg-green-900 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Server size={28} className="text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Full-Stack Development</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  End-to-end development combining modern frontend with robust backend solutions.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• MERN Stack Development</li>
                  <li>• RESTful APIs</li>
                  <li>• Node.js/Express Backend</li>
                  <li>• Full-Stack Integration</li>
                </ul>
              </div>

              {/* UI/UX Development */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-purple-100 dark:bg-purple-900 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Smartphone size={28} className="text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">UI/UX Development</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Creating beautiful, responsive interfaces with modern design frameworks.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Tailwind CSS Design</li>
                  <li>• Responsive Layouts</li>
                  <li>• Modern UI Components</li>
                  <li>• Interactive Interfaces</li>
                </ul>
              </div>

              {/* Database & API Development */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-yellow-100 dark:bg-yellow-900 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Database size={28} className="text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Database & API Development</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Building scalable data solutions and robust API integrations.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• MongoDB Integration</li>
                  <li>• API Development</li>
                  <li>• Data Modeling</li>
                  <li>• Backend Services</li>
                </ul>
              </div>

              {/* Web Performance */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-cyan-100 dark:bg-cyan-900 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Cloud size={28} className="text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Web Performance</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Optimizing web applications for speed, SEO, and user experience.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Performance Optimization</li>
                  <li>• SEO Best Practices</li>
                  <li>• Core Web Vitals</li>
                  <li>• Load Time Optimization</li>
                </ul>
              </div>

              {/* Development & Integration */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-red-100 dark:bg-red-900 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Shield size={28} className="text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Development & Integration</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Integrating third-party services and implementing development best practices.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Third-party Integration</li>
                  <li>• Authentication Systems</li>
                  <li>• Version Control</li>
                  <li>• Code Quality & Testing</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-violet-600 to-cyan-600">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Your Project?</h2>
              <p className="text-xl text-white/80 mb-8">
                Let&apos;s discuss how I can help bring your ideas to life.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Get in Touch
                <Code size={20} />
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
