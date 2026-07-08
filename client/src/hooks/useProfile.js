import { useState, useEffect } from 'react';
import { fetchProfile as apiFetchProfile, updateProfile, uploadResume } from '../api';
import toast from 'react-hot-toast';

const useProfile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [profile, setProfile] = useState({
    narrative: '',
    stats: [],
    skillCategories: [],
    marqueeSkills: [],
    githubUsername: '',
    resumeUrl: ''
  });

  const fetchProfile = async () => {
    try {
      const data = await apiFetchProfile();
      if (data) {
        setProfile({
          narrative: data.narrative || '',
          stats: data.stats || [],
          skillCategories: data.skillCategories || [],
          marqueeSkills: data.marqueeSkills || [],
          githubUsername: data.githubUsername || '',
          resumeUrl: data.resumeUrl || ''
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile(profile);
      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const data = await uploadResume(formData);
      setProfile({ ...profile, resumeUrl: data.resumeUrl });
      toast.success('Resume uploaded successfully!');
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleStatChange = (index, field, value) => {
    const newStats = [...profile.stats];
    newStats[index][field] = value;
    setProfile({ ...profile, stats: newStats });
  };

  const addStat = () => {
    setProfile({ ...profile, stats: [...profile.stats, { value: '', label: '' }] });
  };

  const removeStat = (index) => {
    const newStats = profile.stats.filter((_, i) => i !== index);
    setProfile({ ...profile, stats: newStats });
  };

  const handleSkillCategoryChange = (index, field, value) => {
    const newCats = [...profile.skillCategories];
    newCats[index][field] = value;
    setProfile({ ...profile, skillCategories: newCats });
  };

  const addSkillCategory = () => {
    setProfile({ ...profile, skillCategories: [...profile.skillCategories, { title: '', skills: '', description: '' }] });
  };

  const removeSkillCategory = (index) => {
    const newCats = profile.skillCategories.filter((_, i) => i !== index);
    setProfile({ ...profile, skillCategories: newCats });
  };

  return {
    profile,
    setProfile,
    loading,
    saving,
    uploading,
    handleSave,
    handleResumeUpload,
    handleStatChange,
    addStat,
    removeStat,
    handleSkillCategoryChange,
    addSkillCategory,
    removeSkillCategory
  };
};

export default useProfile;
