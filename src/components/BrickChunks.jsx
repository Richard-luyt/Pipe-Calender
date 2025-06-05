
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';

export default function BrickChunks({ position, onAnimationComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onAnimationComplete) onAnimationComplete();
    }, 1500);
    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  const brickChunks = Array.from({ length: 8 }, () => {
    const initX = (Math.random() - 0.5) * 60;
    const initY = (Math.random() - 0.5) * 20;
    return {
      initX,
      initY,
      x: initX + (Math.random() - 0.5) * 300,
      y: initY + 200 + Math.random() * 400,
      rotate: (Math.random() - 0.5) * 360,
    };
  });

  const particles = Array.from({ length: 12 }, () => ({
    x: (Math.random() - 0.5) * 150,
    y: (Math.random() - 0.5) * 150,
    size: Math.random() * 4 + 2,
    color: `hsl(${Math.floor(Math.random() * 20 + 10)}, 80%, 70%)`
  }));

  const style = {
    position: 'fixed',
    left: position?.x || window.innerWidth / 2,
    top: position?.y || window.innerHeight / 2,
    transform: 'translate(-50%, -50%)',
    zIndex: 50,
    pointerEvents: 'none',
  };

  return ReactDOM.createPortal(
    <div style={style}>
      <div className="relative w-0 h-0">
        {/* 砖块碎片 */}
        {brickChunks.map((c, i) => (
          <motion.div
            key={'b' + i}
            initial={{ x: c.initX, y: c.initY, rotate: 0, opacity: 1 }}
            animate={{
              x: c.x,
              y: c.y,
              rotate: c.rotate,
              opacity: 0,
            }}
            transition={{
              duration: 1,
              ease: 'easeOut',
            }}
            className="w-8 h-4 bg-[url('/brick.jpg')] bg-cover rounded shadow-sm absolute"
          />
        ))}

        {/* 粒子效果 */}
        {particles.map((p, i) => (
          <motion.div
            key={'p' + i}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: p.x,
              y: p.y,
              opacity: 0,
            }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
            }}
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: '50%',
            }}
            className="absolute"
          />
        ))}
      </div>
    </div>,
    document.body
  );
}
