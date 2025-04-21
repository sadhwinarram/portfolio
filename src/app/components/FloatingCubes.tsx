'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FloatingCubes = () => {
  const [cubes, setCubes] = useState<{
    id: number;
    left: string;
    delay: number;
    size: number;
    rotate: number;
  }[]>([]);

  useEffect(() => {
    const temp = [];
    for (let i = 0; i < 30; i++) {
      temp.push({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
        size: Math.floor(Math.random() * 16) + 16, // 8px to 20px 16px to 32px
        rotate: Math.floor(Math.random() * 360),
      });
    }
    setCubes(temp);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
      {cubes.map((cube) => (
        <motion.div
          key={cube.id}
          initial={{ y: 0, opacity: 0, rotate: cube.rotate }}
          animate={{ y: -400, opacity: 1, rotate: cube.rotate + 360 }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: 'loop',
            delay: cube.delay,
          }}
          className="absolute rounded shadow-xl"
          style={{
            width: `${cube.size}px`,
            height: `${cube.size}px`,
            left: cube.left,
            bottom: '0%',
            backgroundColor: '#1A1A1A',
            border: '1px solid #2E2E2E',
            boxShadow: '0 0 6px rgba(255,255,255,0.05)',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingCubes;
