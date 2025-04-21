'use client';

import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const colors = {
  background: "#0D0D0D",
  primary: "#3B82F6",
  text: "#D1D5DB",
  glow1: "#3B82F6",
  glow2: "#1E40AF",
  card: "#rgba(255,255,255,0.05)",
  border: "#1E3A8A",
};

const education = [
  {
    logo: "/logos/gmu.png",
    degree: "Master of Science in Computer Science",
    institution: "George Mason University",
    location: "Fairfax, VA, USA",
    year: "2022 – 2023",
    skills: ["Fundamentals of Programming", "Mathematical Foundations", "Analysis of Algorithms", "Distributed Software Eng.", "Secure Software Design", "Database", "Computer Vision"]
  },
  {
    logo: "/logos/kits.png",
    degree: "Bachelor of Technology in Computer Science Engineering",
    institution: "Kakatiya Institute of Technology and Science",
    location: "Warangal, Telangana, India",
    year: "2015 – 2019",
    skills: ["C", "C++", "Java", "JSP", "SQL", "Web Programming", "DBMS", "Operating System", "Language Processing"]
  }
];

export default function Page() {
  return (
    <div className="p-10 max-w-5xl mx-auto">
      <motion.h2
        className="text-4xl font-bold text-center mb-10"
        style={{ color: colors.primary }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GraduationCap className="inline-block mr-2 mb-1 text-blue-500" size={32} />
        Education
      </motion.h2>

      <div className="relative border-l-4 pl-6 space-y-12" style={{ borderColor: colors.primary }}>
        {education.map((edu, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.2 }}
            className="relative p-6 rounded-lg border shadow-md hover:shadow-lg transition-shadow"
            style={{
              backgroundColor: colors.card,
              borderColor: colors.border,
              color: colors.text,
            }}
          >
            <div className="flex items-center gap-3 mb-1">
              <img src={edu.logo} alt={`${edu.institution} logo`} className="w-8 h8 rounded shadow transition-transform hover:scale-105" />
              <h3 className="text-xl font-semibold text-blue-400">{edu.degree}</h3>
            </div>
            <p className="text-md italic text-gray-400">{edu.institution}</p>
            <p className="text-sm text-gray-500">{edu.location}</p>
            <p className="text-sm text-gray-500 mt-1">{edu.year}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {edu.skills.map((skill, i) => (
                <span
                  key={i}
                  className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full hover:bg-blue-500 transition"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
