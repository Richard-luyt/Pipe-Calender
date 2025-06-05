
import React, { useEffect, useState } from 'react';
import DayBox from './components/DayBox';
import tasksJson from './data/tasks.json';
import BrickChunks from './components/BrickChunks';
import Hammer from './components/Hammer';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [fragments, setFragments] = useState([]);
  const [hammer, setHammer] = useState(null);
  const [hammeredBricks, setHammeredBricks] = useState([]);

  useEffect(() => {
    // 加载初始任务（支持 14 天）
    setTasks(tasksJson);
  }, []);

  const handleSmash = (date, task, position, brickId) => {
    setHammer({ position });

    setTimeout(() => {
      setHammeredBricks((prev) => [...prev, brickId]);
      setFragments((prev) => [...prev, { id: Date.now(), task, position }]);
      setHammer(null);
    }, 600);
  };

  const removeFragment = (id) => {
    setFragments((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-7 gap-0 w-full">
        {tasks.map((day, i) => (
          <DayBox
            key={i}
            date={day.date}
            bricks={day.bricks}
            waters={day.waters}
            onSmash={handleSmash}
            hammeredBricks={hammeredBricks}
          />
        ))}
      </div>

      {hammer && <Hammer position={hammer.position} />}

      {fragments.map((frag) => (
        <BrickChunks
          key={frag.id}
          position={frag.position}
          onAnimationComplete={() => removeFragment(frag.id)}
        />
      ))}
    </div>
  );
}
