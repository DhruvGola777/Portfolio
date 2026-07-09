import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import useProjects from '../hooks/useProjects';

const AdminProjects = () => {
  const {
    projects, loading, editingId, formData, uploadingMedia,
    handleInputChange, handleSubmit, handleEdit, handleDelete, handleMediaUpload, cancelEdit
  } = useProjects();

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
    // Auto close after submit if not editing, or close on submit anyway
    setShowForm(false); 
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-3">
          Manage Projects
        </h2>
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-accent text-white font-bold rounded-lg hover:bg-accent/80 transition-colors text-sm flex items-center gap-2"
          >
            <Plus size={16} /> <span className="hidden sm:inline">Add Project</span><span className="sm:hidden">Add</span>
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-8">
          <h3 className="text-lg font-bold mb-4">{editingId ? 'Edit Project' : 'Add New Project'}</h3>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Technologies (comma separated)</label>
              <input type="text" name="tech" value={formData.tech} onChange={handleInputChange} required className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Short Description</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} required rows="2" className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent"></textarea>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Detailed Case Study (Optional)</label>
            <textarea name="caseStudy" value={formData.caseStudy} onChange={handleInputChange} rows="6" placeholder="Write a detailed case study explaining challenges, solutions, and architecture..." className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent whitespace-pre-wrap"></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Live URL (optional)</label>
              <input type="text" name="liveLink" value={formData.liveLink} onChange={handleInputChange} className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">GitHub URL (optional)</label>
              <input type="text" name="githubLink" value={formData.githubLink} onChange={handleInputChange} className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-black/30 border border-white/10 rounded-lg">
              <label className="block text-xs font-medium text-gray-400 mb-2">Main Portfolio Image (Fast loading)</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => handleMediaUpload(e, 'image')} 
                disabled={uploadingMedia}
                className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-accent/80 transition-colors"
              />
              <p className="text-xs text-gray-400 mt-2">After upload completes, click Save Project to keep the image URL in the project record.</p>
              {uploadingMedia && <p className="text-xs text-accent mt-2">Uploading...</p>}
              {formData.mediaUrl && (
                <p className="text-xs text-green-400 mt-2">
                  ✅ Image uploaded! <a href={formData.mediaUrl} target="_blank" rel="noreferrer" className="underline hover:text-green-300">View File</a>
                </p>
              )}
            </div>


          
          <div className="p-4 bg-black/30 border border-white/10 rounded-lg">
            <label className="block text-xs font-medium text-gray-400 mb-2">Project Image Gallery (Upload multiple images)</label>
            <input 
              type="file" 
              accept="image/*" 
              multiple
              onChange={(e) => handleMediaUpload(e, 'gallery')} 
              disabled={uploadingMedia}
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-accent/80 transition-colors"
            />
            {formData.gallery && formData.gallery.length > 0 && (
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {formData.gallery.map((img, i) => (
                  <div key={i} className="w-16 h-16 shrink-0 relative rounded overflow-hidden border border-white/20">
                    <img src={img} alt="gallery" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
          </div>
          <div className="flex gap-2 mt-2">
            <button type="submit" className="px-4 py-2 bg-accent text-white font-bold rounded-lg hover:bg-accent/80 transition-colors text-sm">
              {editingId ? 'Update Project' : 'Save Project'}
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
          {projects.length === 0 && (
            <div className="text-center py-12 border border-white/10 border-dashed rounded-2xl bg-white/5">
              <h3 className="text-xl font-bold text-gray-300 mb-2">No projects found</h3>
              <p className="text-gray-500 text-sm">Click the Add button above to add your first project.</p>
            </div>
          )}
          {projects.map((proj) => (
            <div key={proj._id} className="bg-black/30 border border-white/5 p-4 rounded-xl flex justify-between items-center">
              <div>
                <h4 className="font-bold text-lg">{proj.title}</h4>
                <p className="text-xs text-gray-400 mt-1">{proj.tech.join(', ')}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(proj)} className="px-3 py-1 bg-white/10 rounded hover:bg-white/20 text-xs">Edit</button>
                <button onClick={() => handleDelete(proj._id)} className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/40 text-xs">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
