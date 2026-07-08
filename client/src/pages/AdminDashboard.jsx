import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminMessages from '../components/AdminMessages';
import AdminProjects from '../components/AdminProjects';
import AdminExperience from '../components/AdminExperience';
import AdminProfile from '../components/AdminProfile';
import AdminAnalytics from '../components/AdminAnalytics';
import { ADMIN_TABS } from '../assets/index.js';
import { logoutAdmin } from '../api';

const AdminDashboard = ({ setIsAuthenticated }) => {
  const [activeTab, setActiveTab] = useState('messages');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      if (setIsAuthenticated) setIsAuthenticated(false);
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout failed', error);
      // Fallback redirect
      if (setIsAuthenticated) setIsAuthenticated(false);
      navigate('/admin/login');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-black/50 p-6 flex flex-col hidden md:flex">
        <h2 className="text-2xl font-bold tracking-tight mb-8">Admin Panel</h2>
        <nav className="flex-1 flex flex-col gap-2">
          {ADMIN_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab.id 
                  ? 'bg-accent/10 text-accent border border-accent/20' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
          <a href="/" className="px-4 py-3 text-center border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium">
            View Live Site
          </a>
          <button 
            onClick={handleLogout}
            className="px-4 py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Mobile Header (Hidden on Desktop) */}
        <header className="md:hidden flex justify-between items-center mb-8 pb-4 border-b border-white/10">
          <h1 className="text-xl font-bold">Admin</h1>
          <select 
            value={activeTab} 
            onChange={(e) => setActiveTab(e.target.value)}
            className="bg-black/50 border border-white/10 text-white rounded-lg px-3 py-2 text-sm focus:outline-none"
          >
            {ADMIN_TABS.map(tab => <option key={tab.id} value={tab.id}>{tab.label}</option>)}
          </select>
        </header>

        <div className="max-w-5xl mx-auto">
          {activeTab === 'messages' && <AdminMessages />}
          {activeTab === 'projects' && <AdminProjects />}
          {activeTab === 'experience' && <AdminExperience />}
          {activeTab === 'profile' && <AdminProfile />}
          {activeTab === 'analytics' && <AdminAnalytics />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
