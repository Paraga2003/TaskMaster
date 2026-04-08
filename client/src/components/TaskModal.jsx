//

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const TaskModal = ({ isOpen, onClose, task, onSubmit }) => {
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'Pending'
  });

  
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '', // Format for date input
        status: task.status || 'Pending'
      });
    } else {
      setFormData({ title: '', description: '', dueDate: '', status: 'Pending' });
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); 
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl animate-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{task ? 'Update Task' : 'New Task'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X size={20}/></button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="Task Title" 
            required
            className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#2D22C6]/20" 
          />
          <textarea 
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Description" 
            rows="3" 
            className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#2D22C6]/20" 
          />
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="date" 
              value={formData.dueDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
              className="px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none" 
            />
            <select 
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none"
            >
               <option value="Pending">Pending</option>
               <option value="In Progress">In Progress</option>
               <option value="Completed">Completed</option>
            </select>
          </div>
          <button 
            type="submit"
            className="w-full bg-brand-gradient text-white font-bold py-4 rounded-full mt-4 hover:opacity-90 transition-all shadow-lg shadow-blue-200"
          >
            {task ? 'Save Changes' : 'Create Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;

