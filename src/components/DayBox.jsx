
import React, { useState } from 'react';
import Modal from './Modal';
import WaterWave from './WaterWave';
import { AnimatePresence, motion } from 'framer-motion';

export default function DayBox({ date, bricks = [], waters = [], onSmash, hammeredBricks = [] }) {
  const [localBricks, setLocalBricks] = useState(bricks);
  const [activeIndex, setActiveIndex] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [newTask, setNewTask] = useState('');

  const smashBrick = (index) => {
    const task = localBricks[index];
    const element = document.getElementById(`brick-${date}-${index}`);
    if (element) {
      const rect = element.getBoundingClientRect();
      const center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height * 0.05,
      };
      const brickId = `${date}-${index}`;
      onSmash(date, task, center, brickId);
    }
    setShowModal(false);
  };

  const startEdit = (index) => {
    setEditingText(localBricks[index].task);
    setIsEditing(true);
  };

  const confirmEdit = (index) => {
    const updated = [...localBricks];
    updated[index].task = editingText;
    setLocalBricks(updated);
    setIsEditing(false);
    setShowModal(false);
  };

  const addBrick = () => {
    if (newTask.trim() !== '') {
      setLocalBricks([...localBricks, { task: newTask }]);
      setNewTask('');
      setAddModal(false);
    }
  };

  return (
    <>
      <div className="relative bg-white border border-gray-300 w-full h-48 p-1 flex flex-col justify-between overflow-hidden">
        <div className="text-xs text-gray-500 mb-1">{date}</div>

        {/* 合并容器 */}
        <div className="relative flex flex-col justify-end h-full w-full">

          {/* 💧 水层容器 */}
          <div className="relative z-10">
            {waters.map((w, i) => (
              <div
                key={i}
                style={{
                  height: `${Math.max(w.percent, 10)}%`, // 给每层一个最小高度
                  minHeight: '12px',
                  opacity: 0.4,
                }}
                className="overflow-hidden"
              >
                <WaterWave color={w.color || '#4FC3F7'} />
              </div>
            ))}
          </div>

          {/* 🧱 砖块区域 - z-20 */}
          <div className="flex flex-col gap-0 relative z-20">
            <AnimatePresence initial={false}>
              {localBricks.map((b, i) => {
                const brickId = `${date}-${i}`;
                const isHidden = hammeredBricks.includes(brickId);
                if (isHidden) return null;

                return (
                  <motion.div
                    key={i}
                    layout
                    exit={{ opacity: 0, scale: 0.6, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-6"
                  >
                    <div
                      id={`brick-${date}-${i}`}
                      className="bg-[url('/brick.jpg')] bg-cover bg-center text-white font-bold w-full h-full px-2 py-0.5 text-xs cursor-pointer border border-orange-600 shadow"
                      onClick={() => {
                        setActiveIndex(i);
                        setShowModal(true);
                        setIsEditing(false);
                      }}
                    >
                      {b.task}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* 添加按钮 */}
            <button
              onClick={() => setAddModal(true)}
              className="mt-1 text-xs text-blue-500 hover:text-blue-700 underline"
            >
              ➕ Add fixed Daily Task
            </button>
          </div>

          
        </div>
      </div>

      {/* 敲碎/编辑弹窗 */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        {activeIndex !== null && !isEditing && (
          <div className="space-y-2">
            <button
              className="w-full bg-red-100 hover:bg-red-200 text-xs px-3 py-1 rounded"
              onClick={() => smashBrick(activeIndex)}
            >
              🧱 敲碎
            </button>
            <button
              className="w-full bg-blue-100 hover:bg-blue-200 text-xs px-3 py-1 rounded"
              onClick={() => startEdit(activeIndex)}
            >
              ✏️ 编辑
            </button>
          </div>
        )}
        {activeIndex !== null && isEditing && (
          <div className="space-y-2">
            <input
              className="w-full border px-2 py-1 rounded text-xs"
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
            />
            <button
              className="w-full bg-blue-400 hover:bg-blue-500 text-white text-xs px-3 py-1 rounded"
              onClick={() => confirmEdit(activeIndex)}
            >
              保存
            </button>
          </div>
        )}
      </Modal>

      {/* 添加砖块弹窗 */}
      <Modal show={addModal} onClose={() => setAddModal(false)}>
        <div className="space-y-2">
          <input
            className="w-full border px-2 py-1 rounded text-xs"
            placeholder="Please input your task here"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            className="w-full bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded"
            onClick={addBrick}
          >
            Add Task
          </button>
        </div>
      </Modal>
    </>
  );
}
