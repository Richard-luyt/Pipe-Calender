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

        {/* 🧱 + 💧 合并容器 */}
        <div className="flex flex-col-reverse justify-start h-full">
          {/* 🧱 砖块列表 */}
          <div className="flex flex-col z-10">
            {localBricks.map((b, i) => (
              <div
                key={i}
                id={`brick-${date}-${i}`}
                className="bg-[url('/brick.jpg')] bg-cover bg-center text-white font-bold w-full h-6 px-2 text-xs border border-orange-600 shadow"
                onClick={() => {
                  setActiveIndex(i);
                  setShowModal(true);
                  setIsEditing(false);
                }}
              >
                {b.task}
              </div>
            ))}
          </div>

          {/* 💧 水层紧贴砖块顶部（结构上就是砖块上面） */}
          <div className="z-20">
            {waters.map((w, i) => (
              <div key={i} style={{ height: `${w.percent}%` }}>
                <WaterWave color={w.color || '#4FC3F7'} />
              </div>
            ))}
          </div>
        </div>
        
      </div>

      {/* 弹窗：敲碎 or 编辑 */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        {activeIndex !== null && !isEditing && (
          <div className="space-y-2">
            <button
              className="w-full bg-red-100 hover:bg-red-200 text-xs px-3 py-1 rounded"
              onClick={() => smashBrick(activeIndex)}
            >
              🧱 Task Finished
            </button>
            <button
              className="w-full bg-blue-100 hover:bg-blue-200 text-xs px-3 py-1 rounded"
              onClick={() => startEdit(activeIndex)}
            >
              ✏️ Edit Your Task
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
            placeholder="Please input your task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            className="w-full bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded"
            onClick={addBrick}
          >
            ADD TASK
          </button>
        </div>
      </Modal>
    </>
  );
}