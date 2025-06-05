
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';

export default function Hammer({ position, onDone }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onDone) onDone();
    }, 600);
    return () => clearTimeout(timer);
  }, [onDone]);

  if (!position || !visible) return null;

  const style = {
    position: 'fixed',
    left: position.x,
    top: position.y - 10,
    transform: 'translate(-50%, -50%)',
    zIndex: 60,
    pointerEvents: 'none',
  };

  return ReactDOM.createPortal(
    <motion.div
      initial={{ rotate: -90, y: -60 }}
      animate={{ rotate: 0, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
      className="text-4xl"
      style={style}
    >
      🔨
    </motion.div>,
    document.body
  );
}
