import { Calendar, MoreVertical, Edit2, Trash2 } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const statusColors = {
    Completed: "bg-green-100 text-green-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Pending: "bg-yellow-100 text-yellow-700"
  };

  return (
    <div className="bg-white group p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusColors[task.status]}`}>
          {task.status}
        </span>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={onEdit} className="p-2 hover:bg-blue-50 text-blue-600 rounded-full"><Edit2 size={16} /></button>
          <button onClick={onDelete} className="p-2 hover:bg-red-50 text-red-600 rounded-full"><Trash2 size={16} /></button>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-brand-primary transition-colors">
        {task.title}
      </h3>
      <p className="text-gray-500 text-sm line-clamp-2 mb-6">
        {task.description || "No description provided for this task."}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
          <Calendar size={14} />
          {task.dueDate 
    ? new Date(task.dueDate).toLocaleDateString('en-GB').replace(/\//g, '-') 
    : 'No due date'}

        </div>
        
      </div>
    </div>
  );
};



export default TaskCard;

