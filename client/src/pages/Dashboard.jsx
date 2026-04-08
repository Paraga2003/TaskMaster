
import { Plus, Search, CheckCircle, Clock, Zap, Calendar, Edit2, Trash2, X } from 'lucide-react';
import { UserButton, useUser } from "@clerk/clerk-react";
import TaskCard from '../components/TaskCard.jsx';
import TaskModal from '../components/TaskModal.jsx';
import StatCard from '../components/StatCard.jsx';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@clerk/clerk-react';
const Dashboard = () => {
  const { user } = useUser();
  
  
  const [tasks, setTasks] = useState([
    
  ]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All'); 


const filteredTasks = tasks
  .filter(t => filterStatus === 'All' || t.status === filterStatus)
  .filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()));




  const api = axios.create({ baseURL: 'http://localhost:8000' });
  const {getToken} = useAuth();
  
  
  const loadTasks = async () => {
    try {
      const token = await getToken();
      
      const { data } = await api.get('/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(data);
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to load tasks");
    }
  };

  
  const handleCreateOrUpdate = async (formData) => {
    try {
      const token = await getToken();
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      if (editingTask) {
        
        const { data } = await api.put(`/api/tasks/${editingTask._id}`, formData, config);
        toast.success("Task updated successfully");
      } else {
        
        const { data } = await api.post('/api/tasks', formData, config);
        toast.success("Task created successfully");
      }
      
      loadTasks(); 
      setIsAddModalOpen(false);
      setEditingTask(null);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    
    try {
      const token = await getToken();
      await api.delete(`/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Task deleted");
      loadTasks();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  
  useEffect(() => {
    loadTasks();
  }, []);
  
  return (
    <div className="min-h-screen grid-bg font-sans text-[#1a1a1a]">
      
      <nav className="bg-brand-gradient backdrop-blur-md sticky top-0 z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-brand-gradient p-1.5 rounded-lg">
               <Zap size={20} className="text-white fill-current" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">TaskMaster</span>
          </div>
          <div className='flex items-center gap-4'>
          <p className='text-white'>{user?.firstName}</p>
          <UserButton afterSignOutUrl="/" />

          </div>
          
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="relative pt-20 pb-16 px-6 overflow-hidden text-center">
  
  <div className="absolute inset-0 z-0 pointer-events-none select-none">
    <span className="absolute top-0 -left-10 text-[180px] font-blue text-gray-500/5 transform -rotate-12 blur-[1px] border-2px border-gray-200">
      TASK
    </span>
    <span className="absolute -bottom-10 -right-10 text-[160px] font-black text-[#2D22C6]/5 transform rotate-6 blur-[1px]">
      DONE
    </span>
    <span className="absolute bottom-1/15 left-1/70 text-[100px] transform -rotate-8 font-black text-purple-500/5 blur-[1px]">
      ToDo
    </span>
  </div>

  
  <div className="relative z-10 max-w-4xl mx-auto">
    <h1 className="text-5xl md:text-7xl font-black text-[#1a1a1a] mb-6 tracking-tight leading-tight">
      Welcome back, <br />
      <span className="text-[#2D22C6] drop-shadow-sm">
        {user?.firstName || 'Productive User'}
      </span>
    </h1>

    <p className="text-gray-500 text-xl max-w-xl mx-auto font-medium">
      You currently have <span className="text-[#1a1a1a] font-bold">{tasks.length} tasks</span> synchronized across your workspace. 
      Ready to conquer the day?
    </p>
  </div>
</div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
            <StatCard 
              label="Total" 
              value={tasks.length} 
              icon={<Clock className="text-blue-600" />}
              active={filterStatus === 'All'}
              onClick={() => setFilterStatus('All')}
            />
            <StatCard 
              label="In Progress" 
              value={tasks.filter(t => t.status === "In Progress").length} 
              icon={<Zap className="text-purple-600" />}
              active={filterStatus === 'In Progress'}
              onClick={() => setFilterStatus('In Progress')}
            />
            <StatCard 
              label="Done" 
              value={tasks.filter(t => t.status === "Completed").length} 
              icon={<CheckCircle className="text-green-600" />}
              active={filterStatus === 'Completed'}
              onClick={() => setFilterStatus('Completed')}
            />
        </div>

        
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search your tasks..." 
              className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#2D22C6]/20"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#2D22C6] text-white px-8 py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-blue-200"
          >
            <Plus size={20} /> New Task
          </button>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map(task => (
            <TaskCard 
              key={task._id} 
              task={task} 
              onEdit={() => setEditingTask(task)} 
              onDelete={() => handleDelete(task._id)}
            />
          ))}
        </div>
      </main>

      
      <TaskModal 
        isOpen={isAddModalOpen || !!editingTask} 
        onClose={() => { setIsAddModalOpen(false); setEditingTask(null); }} 
        task={editingTask} 
        onSubmit={handleCreateOrUpdate}
      />
    </div>
  );
};



export default Dashboard;