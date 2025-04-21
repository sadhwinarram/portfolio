'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, Briefcase } from "lucide-react";

const colors = {
  background: "#0D0D0D",
  primary: "#3B82F6",
  text: "#D1D5DB",
  card: "#rgba(255,255,255,0.05)",
  border: "#1E3A8A",
};

const experiences = [
  {
    company: "U.S. Bank",
    logo: "/logos/usbank.png",
    location: "Minneapolis, MN",
    role: "API Developer / Java Developer",
    duration: "Aug 2023 – Present",
    techStack: ["Java", "Spring Boot", "GraphQL", "Cassandra", "Kafka", "Git", "Jenkins", "Docker"],
    points: [
      "Designed and implemented RESTful web services using Spring Boot",
      "Developed GraphQL APIs and integrated Cassandra for real-time data",
      "Handled Spark job enhancements, Docker, Kubernetes, and Kafka streaming",
      "Performed CI/CD via Jenkins and collaborated in Agile teams"
    ]
  },
  {
    company: "Infor (India) Pvt. Ltd",
    logo: "/logos/infor.png",
    location: "Hyderabad, India",
    role: "Software Developer",
    duration: "Jul 2019 – Dec 2022",
    techStack: ["Java", "LPL", "Angular", "Oracle", "MySQL", "REST API"],
    points: [
      "Built Angular widgets and Java-based features for HCM applications",
      "Integrated with Webex APIs and handled REST API data retrieval",
      "Used Oracle and MySQL databases for storage and maintained version control using AccuRev."
    ]
  }
];

const Experience = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [selectedTech, setSelectedTech] = useState<string[] | null>(null);

  const openTechModal = (tech: string[]) => setSelectedTech(tech);
  const closeModal = () => setSelectedTech(null);

  return (
    <div className="p-10 max-w-5xl mx-auto text-white">
      <motion.h2
        className="text-4xl font-bold text-center mb-10"
        style={{ color: colors.primary }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Briefcase className="inline-block mr-2 mb-1 text-blue-500" size={32} />
        Professional Experience
      </motion.h2>

      <div className="space-y-12 relative border-l-4 pl-6" style={{ borderColor: colors.primary }}>
        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative rounded-lg p-6 border transition-shadow hover:shadow-xl"
            style={{
              backgroundColor: colors.card,
              borderColor: colors.border,
              color: colors.text
            }}
          >
            <div className="flex items-center gap-3 mb-1">
              <img src={exp.logo} alt={`${exp.company} logo`} className="w-8 h-8 rounded shadow transition-transform hover:scale-105" />
              <h3
                className="text-2xl font-semibold text-blue-400 cursor-pointer"
                onClick={() => openTechModal(exp.techStack)}
              >
                {exp.role}{" "}
                <span className="text-sm text-blue-500">(View Tech Stack)</span>
              </h3>
            </div>
            <p className="text-sm italic text-gray-400">{exp.company} — {exp.location}</p>
            <p className="text-sm text-gray-500 mb-2">{exp.duration}</p>
            <button
              onClick={() => setExpanded(expanded === idx ? null : idx)}
              className="mt-2 text-sm text-blue-500 hover:underline"
            >
              {expanded === idx ? "Hide Details" : "Show Details"}
            </button>
            {expanded === idx && (
              <ul className="list-disc ml-5 text-gray-300 space-y-1 mt-2">
                {exp.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {selectedTech && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-[#0F172A] p-6 rounded-lg max-w-md w-full shadow-xl relative border border-blue-800">
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-xl text-gray-400 hover:text-white"
            >
              &times;
            </button>
            <h4 className="text-xl font-semibold mb-4 text-blue-400">Tech Stack</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              {selectedTech.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Download Resume */}
      <div className="flex justify-end mt-10">
        <a
          href="/resume.pdf"
          download
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
        >
          <Download size={18} /> Download Resume
        </a>
      </div>
    </div>
  );
};

export default function Page() {
  return <Experience />;
}
