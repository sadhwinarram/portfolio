'use client';

import { useState } from 'react';
import { Send, Mail } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const formEndpoint = process.env.NEXT_PUBLIC_FORMSPREE ?? '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Reset form fields
      } else {
        setStatus('Failed to send message.');
      }
    } catch {
      setStatus('Something went wrong.');
    }
  };

  return (
    <div className="p-10 max-w-xl mx-auto text-white">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-500 flex items-center justify-center">
        <Mail className="mr-2" /> Contact Me
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 text-sm">Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#0F172A] border border-blue-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#0F172A] border border-blue-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Message</label>
          <textarea
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#0F172A] border border-blue-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-2 rounded text-white font-medium"
        >
         <Send size={18} />
        </button>
      </form>

      {status && (
        <p className="text-center mt-4 text-sm text-green-400">
          {status}
        </p>
      )}
    </div>
  );
}
