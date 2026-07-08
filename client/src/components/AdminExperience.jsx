import React, { useEffect, useState } from 'react';
import useExperience from '../hooks/useExperience';

const AdminExperience = () => {
  const {
    experiences, loading, editingId, formData,
    handleInputChange, handleSubmit, handleEdit, handleDelete, cancelEdit
  } = useExperience();

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (editingId) {
      setShowForm(true);
    }
  }, [editingId]);

  const handleCancel = () => {
    cancelEdit();
    setShowForm(false);
  };

  const onSubmit = (e) => {
    handleSubmit(e);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-3">
          Manage Experience & Journey
        </h2>
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-accent text-white font-bold rounded-lg hover:bg-accent/80 transition-colors text-sm"
          >
            Add Event +
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-8">
          <h3 className="text-lg font-bold mb-4">{editingId ? 'Edit Event' : 'Add New Event'}</h3>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Title (e.g. Frontend Engineer)</label>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Company / Institution</label>
              <input type="text" name="company" value={formData.company} onChange={handleInputChange} required className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Date (e.g. 2024 - Present)</label>
              <input type="text" name="date" value={formData.date} onChange={handleInputChange} required className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Type</label>
              <select name="type" value={formData.type} onChange={handleInputChange} className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent">
                <option value="work">Work Experience</option>
                <option value="education">Education</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} required rows="3" className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent"></textarea>
          </div>

          <div className="flex gap-2 mt-2">
            <button type="submit" className="px-4 py-2 bg-accent text-white font-bold rounded-lg hover:bg-accent/80 transition-colors text-sm">
              {editingId ? 'Update Event' : 'Save Event'}
            </button>
            <button type="button" onClick={handleCancel} className="px-4 py-2 border border-white/10 rounded-lg text-sm hover:bg-white/5">
              Cancel
            </button>
          </div>
        </form>
      </div>
      )}

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <div className="grid gap-4">
          {experiences.length === 0 && (
            <div className="text-center py-12 border border-white/10 border-dashed rounded-2xl bg-white/5">
              <h3 className="text-xl font-bold text-gray-300 mb-2">No experience events found</h3>
              <p className="text-gray-500 text-sm">Click the 'Add Event +' button above to add your first timeline entry.</p>
            </div>
          )}
          {experiences.map((exp) => (
            <div key={exp._id} className="bg-black/30 border border-white/5 p-4 rounded-xl flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h4 className="font-bold text-lg">{exp.title}</h4>
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${exp.type === 'work' ? 'bg-accent/20 text-accent' : 'bg-purple-500/20 text-purple-400'}`}>
                    {exp.type}
                  </span>
                </div>
                <p className="text-sm text-gray-300 font-medium">{exp.company} <span className="text-gray-500 mx-2">•</span> {exp.date}</p>
                <p className="text-xs text-gray-400 mt-2 line-clamp-2">{exp.description}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => handleEdit(exp)} className="px-3 py-1 bg-white/10 rounded hover:bg-white/20 text-xs">Edit</button>
                <button onClick={() => handleDelete(exp._id)} className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/40 text-xs">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminExperience;
