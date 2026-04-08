import React from 'react';
const StatCard = ({ label, value, icon, onClick, active }) => (
  <div 
    onClick={onClick}
    className={`bg-white p-6 rounded-3xl border shadow-sm flex items-center justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md
      ${active 
        ? 'border-[#2D22C6] ring-2 ring-[#2D22C6]/20'  
        : 'border-gray-100'
      }`}
  >
    <div>
      <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{label}</p>
      <h3 className="text-3xl font-black">{value}</h3>
    </div>
    <div className={`p-4 rounded-2xl transition-colors ${active ? 'bg-[#2D22C6]/10' : 'bg-gray-50'}`}>
      {icon}
    </div>
  </div>
);

export default StatCard;