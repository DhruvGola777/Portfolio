import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminMessages from '../components/AdminMessages';
import AdminProjects from '../components/AdminProjects';
import AdminExperience from '../components/AdminExperience';
import AdminProfile from '../components/AdminProfile';
import AdminAnalytics from '../components/AdminAnalytics';
import { ADMIN_TABS } from '../assets/index.js';
import { logoutAdmin } from '../api';
import { Menu, X, MessageSquare, Briefcase, GraduationCap, User, BarChart, LogOut, ExternalLink } from 'lucide-react';

const getIcon = (id) => {
  switch(id) {
    case 'messages': return <MessageSquare size={18} />;
    case 'projects': return <Briefcase size={18} />;
    case 'experience': return <GraduationCap size={18} />;
    case 'profile': return <User size={18} />;
    case 'analytics': return <BarChart size={18} />;
    default: return null;
  }
};

const AdminDashboard = ({ setIsAuthenticated }) => {
  const [activeTab, setActiveTab] = useState('messages');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
              className={`flex items-center gap-3 text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab.id 
                  ? 'bg-accent/10 text-accent border border-accent/20' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {getIcon(tab.id)}
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
          <a href="/" className="flex items-center justify-center gap-2 px-4 py-3 text-center border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium text-gray-300 hover:text-white">
            <ExternalLink size={16} />
            View Live Site
          </a>
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors text-sm font-medium"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Mobile Header (Hidden on Desktop) */}
        <header className="md:hidden flex justify-between items-center mb-6 pb-4 border-b border-white/10 relative">
          <h1 className="text-xl font-bold">Admin</h1>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 bg-white/5 hover:bg-white/10 transition-colors rounded-lg border border-white/10 text-white">
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          {mobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-black/95 border border-white/10 rounded-xl mt-2 p-2 flex flex-col gap-1 z-50 shadow-2xl backdrop-blur-xl">
              {ADMIN_TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-accent/10 text-accent border border-accent/20' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {getIcon(tab.id)}
                  {tab.label}
                </button>
              ))}
              <div className="h-px bg-white/10 my-2 mx-2" />
              <a href="/" className="flex items-center justify-center gap-2 px-4 py-3 text-center border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium text-gray-300 hover:text-white">
                <ExternalLink size={16} /> View Live Site
              </a>
              <button 
                onClick={handleLogout} 
                className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors font-medium text-sm"
              >
                 <LogOut size={16} /> Logout
              </button>
            </div>
          )}
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
