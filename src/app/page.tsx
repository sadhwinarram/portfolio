"use client"; // Mark this file as a Client Component

import React from "react";
import { motion } from "framer-motion";

// Custom color palette
const colors = {
  background: "#0D0D0D",
  primary: "#3B82F6",        // Tailwind blue-500
  text: "#D1D5DB",
  glow1: "#3B82F6",
  glow2: "#1E40AF",
};




const AnimatedName: React.FC<{ name: string }> = ({ name }) => {
  return (
    <h1 className="text-5xl font-bold mb-6 flex flex-wrap justify-center">
      {[...name].map((char, idx) => (
        <motion.span
          key={idx}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: idx * 0.05, type: "spring", stiffness: 100 }}
          style={{ color: colors.primary }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h1>
  );
};

const Home = () => (
  <div className="flex flex-col items-center justify-center h-[80vh] px-6 text-center">
    <AnimatedName name="Hi, I'm Sadhwin Sai Sree Vardhan Arram" />
    <motion.p style={{ color: colors.text }}>
  A passionate <span style={{ color: colors.primary }}>Java Developer</span> with 4.5 years of experience in software development and integration, building scalable <span style={{ color: colors.primary }}>APIs</span> and interactive <span style={{ color: colors.primary }}>applications</span>.
</motion.p>
  </div>
);

export default Home;
