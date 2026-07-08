import React, { useRef } from 'react';
import useProfile from '../hooks/useProfile';

const AdminProfile = () => {
  const fileInputRef = useRef(null);
  
  const {
    profile, setProfile, loading, saving, uploading,
    handleSave, handleResumeUpload, handleStatChange, addStat, removeStat,
    handleSkillCategoryChange: handleCategoryChange, addSkillCategory, removeSkillCategory
  } = useProfile();

  const handleMarqueeChange = (e) => {
    const val = e.target.value;
    const array = val.split(',').map(s => s.trim()).filter(s => s);
    setProfile({ ...profile, marqueeSkills: array });
  };

  if (loading) return <p className="text-gray-400">Loading profile data...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Profile & Settings</h2>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="px-6 py-2 bg-accent text-white font-bold rounded-lg hover:bg-accent/80 transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-8">
        
        {/* Core Settings (GitHub & Resume) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-lg font-bold mb-4">GitHub Integration</h3>
            <label className="block text-xs font-medium text-gray-400 mb-1">GitHub Username</label>
            <input 
              type="text" 
              value={profile.githubUsername} 
              onChange={(e) => setProfile({ ...profile, githubUsername: e.target.value })}
              placeholder="e.g. torvalds"
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent"
            />
            <p className="text-xs text-gray-500 mt-2">Required for the contribution graph.</p>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-lg font-bold mb-4">Resume / CV</h3>
            {profile.resumeUrl ? (
              <div className="mb-4 text-sm text-green-400">
                ✅ Resume uploaded (<a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="underline">View</a>)
              </div>
            ) : (
              <div className="mb-4 text-sm text-gray-400">No resume uploaded yet.</div>
            )}
            
            <input 
              type="file" 
              accept=".pdf,.doc,.docx"
              ref={fileInputRef}
              onChange={handleResumeUpload}
              className="hidden" 
            />
            <button 
              onClick={() => fileInputRef.current.click()}
              disabled={uploading}
              className="w-full px-4 py-3 border border-white/10 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors"
            >
              {uploading ? 'Uploading...' : 'Upload New Resume'}
            </button>
          </div>
        </div>

        {/* Narrative */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h3 className="text-lg font-bold mb-4">Narrative (About Me)</h3>
          <textarea 
            value={profile.narrative} 
            onChange={(e) => setProfile({ ...profile, narrative: e.target.value })}
            rows="4" 
            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent"
          ></textarea>
        </div>

        {/* Stats */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Key Stats</h3>
            <button onClick={addStat} className="text-xs bg-white/10 px-3 py-1 rounded hover:bg-white/20">Add Stat</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.stats.map((stat, i) => (
              <div key={i} className="flex gap-2 items-center bg-black/30 p-2 rounded-lg border border-white/5">
                <input type="text" placeholder="Value (e.g. 3+)" value={stat.value} onChange={(e) => handleStatChange(i, 'value', e.target.value)} className="w-1/3 bg-transparent border border-white/10 rounded px-2 py-1 text-sm focus:border-accent outline-none" />
                <input type="text" placeholder="Label (e.g. Projects)" value={stat.label} onChange={(e) => handleStatChange(i, 'label', e.target.value)} className="w-full bg-transparent border border-white/10 rounded px-2 py-1 text-sm focus:border-accent outline-none" />
                <button onClick={() => removeStat(i)} className="text-red-400 hover:text-red-300 px-2">&times;</button>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Categories */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h3 className="text-lg font-bold mb-4">Skill Categories</h3>
          <div className="space-y-4">
            {profile.skillCategories.map((cat, i) => (
              <div key={i} className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-3">
                <input type="text" placeholder="Category Title" value={cat.title} onChange={(e) => handleCategoryChange(i, 'title', e.target.value)} className="w-full bg-transparent border border-white/10 rounded px-3 py-2 text-sm focus:border-accent outline-none font-bold" />
                <input type="text" placeholder="Skills (comma separated)" value={cat.skills} onChange={(e) => handleCategoryChange(i, 'skills', e.target.value)} className="w-full bg-transparent border border-white/10 rounded px-3 py-2 text-sm focus:border-accent outline-none" />
                <textarea placeholder="Description" value={cat.description} onChange={(e) => handleCategoryChange(i, 'description', e.target.value)} rows="2" className="w-full bg-transparent border border-white/10 rounded px-3 py-2 text-sm focus:border-accent outline-none"></textarea>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee Skills */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h3 className="text-lg font-bold mb-4">Marquee Skills (Scrolling Banner)</h3>
          <p className="text-xs text-gray-400 mb-2">Comma separated list of skills.</p>
          <input 
            type="text" 
            value={profile.marqueeSkills.join(', ')} 
            onChange={handleMarqueeChange}
            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
