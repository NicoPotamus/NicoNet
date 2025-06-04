'use client';

import Navbar from "../components/Navbar";
import ContactForm from "../components/ContactForm";
import { Phone, Mail, Github, Linkedin } from "@deemlol/next-icons";

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Get In Touch</h1>
              <p className="text-xl text-gray-300 mb-8">Let&apos;s discuss your project and create something amazing together</p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Contact Information</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                      Feel free to reach out through any of these channels. I typically respond within 24 hours.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <a 
                      href="tel:+18455544542" 
                      className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                        <Phone size={24} className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Phone</p>
                        <p className="text-gray-600 dark:text-gray-300">+1 (845) 554-4542</p>
                      </div>
                    </a>

                    <a 
                      href="mailto:NicoDeMilio@outlook.com" 
                      className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                        <Mail size={24} className="text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Email</p>
                        <p className="text-gray-600 dark:text-gray-300">NicoDeMilio@outlook.com</p>
                      </div>
                    </a>

                    <div className="flex gap-4">
                      <a 
                        href="https://github.com/nicopotamus" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                      >
                        <Github size={20} />
                        GitHub
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/nicolas-demilio-173756228/" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                      >
                        <Linkedin size={20} />
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                  <ContactForm 
                    showSubject={true}
                    successMessage="Thank you for reaching out. I'll get back to you soon!"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
