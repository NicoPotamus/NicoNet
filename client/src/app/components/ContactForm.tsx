'use client';

import { ArrowRight } from "@deemlol/next-icons";
import { useState } from "react";
import { createProject } from "./myFetch";

interface ContactFormProps {
  showSubject?: boolean;
  successMessage?: string;
  onSubmit?: (formData: FormData) => void;
}

type FormData = {
  name: string;
  email: string;
  subject?: string;
  projectType?: string;
  message: string;
};

export default function ContactForm({ showSubject = false, successMessage, onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    projectType: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const projectData = {
        name: formData.name,
        email: formData.email,
        subject: showSubject ? formData.subject || 'No Subject' : `New ${formData.projectType} Project`,
        description: formData.message // match the API's expected field name
      };

      const response = await createProject(projectData);
      
      if (response.success) {
        if (onSubmit) {
          onSubmit(formData);
        }
        setSubmitted(true);
      } else {
        throw new Error('Failed to create project');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (submitted && successMessage) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-bold text-green-600 mb-4">Message Sent!</h3>
        <p className="text-gray-600 mb-6">{successMessage}</p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-blue-600 hover:text-blue-800"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form 
      className="space-y-4" 
      onSubmit={handleSubmit} 
      autoComplete="off"
      suppressHydrationWarning
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input 
            id="name"
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="new-name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            placeholder="Your name" 
            suppressHydrationWarning
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            id="email"
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="new-email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            placeholder="your@email.com" 
            suppressHydrationWarning
          />
        </div>
      </div>

      {showSubject ? (
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            autoComplete="off"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="What's this about?"
            suppressHydrationWarning
          />
        </div>
      ) : (
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
          <select 
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            required
            autoComplete="off"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            suppressHydrationWarning
          >
            <option value="">Select project type</option>
            <option value="web">Web Application</option>
            <option value="mobile">Mobile App</option>
            <option value="system">System Integration</option>
            <option value="other">Other</option>
          </select>
        </div>
      )}

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <textarea 
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          autoComplete="off"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32" 
          placeholder="Tell us about your project"
          suppressHydrationWarning
        ></textarea>
      </div>

      {error && (
        <div className="text-red-600 text-sm mb-4">
          {error}
        </div>
      )}
      
      <div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Message'}
          {!loading && <ArrowRight size={20} />}
        </button>
      </div>
    </form>
  );
}
