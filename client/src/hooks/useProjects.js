import { useState, useEffect } from 'react';
import { fetchProjects as apiFetchProjects, createProject, updateProject, deleteProject, uploadMedia, uploadGallery } from '../api';
import toast from 'react-hot-toast';
import imageCompression from 'browser-image-compression';

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech: '',
    liveLink: '',
    githubLink: '',
    caseStudy: '',
    mediaUrl: '',
    videoUrl: '',
    gallery: []
  });

  const fetchProjects = async () => {
    try {
      const data = await apiFetchProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const techArray = formData.tech.split(',').map(t => t.trim()).filter(t => t);
    const payload = { ...formData, tech: techArray };

    try {
      if (editingId) {
        await updateProject(editingId, payload);
      } else {
        await createProject(payload);
        toast.success('Project created successfully!');
      }
      
      setFormData({ title: '', description: '', tech: '', liveLink: '', githubLink: '', caseStudy: '', mediaUrl: '', videoUrl: '', gallery: [] });
      setEditingId(null);
      fetchProjects();
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Error saving project');
    }
  };

  const handleEdit = (proj) => {
    setEditingId(proj._id);
    setFormData({
      title: proj.title,
      description: proj.description,
      tech: proj.tech.join(', '),
      liveLink: proj.liveLink || '',
      githubLink: proj.githubLink || '',
      caseStudy: proj.caseStudy || '',
      mediaUrl: proj.mediaUrl || '',
      videoUrl: proj.videoUrl || '',
      gallery: proj.gallery || []
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await deleteProject(id);
      await fetchProjects();
      toast.success('Project deleted successfully!');
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Error deleting project');
    }
  };

  const handleMediaUpload = async (e, type) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingMedia(true);
    const data = new FormData();
    
    // Compression options
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      if (type === 'gallery') {
        for (let i = 0; i < files.length; i++) {
          let file = files[i];
          if (file.type.startsWith('image/')) {
            try { file = await imageCompression(file, options); } catch (e) { console.error("Compression failed", e); }
          }
          data.append('gallery', file);
        }
        const result = await uploadGallery(data);
        setFormData({ ...formData, gallery: [...(formData.gallery || []), ...result.galleryUrls] });
        toast.success('Gallery uploaded successfully!');
      } else {
        let file = files[0];
        if (type !== 'video' && file.type.startsWith('image/')) {
          try { file = await imageCompression(file, options); } catch (e) { console.error("Compression failed", e); }
        }
        data.append('media', file);
        const result = await uploadMedia(data);
        if (type === 'video') {
          setFormData({ ...formData, videoUrl: result.mediaUrl });
        } else {
          setFormData({ ...formData, mediaUrl: result.mediaUrl });
        }
        toast.success('Media uploaded successfully!');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Upload failed.');
    } finally {
      setUploadingMedia(false);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ title: '', description: '', tech: '', liveLink: '', githubLink: '', caseStudy: '', mediaUrl: '', videoUrl: '', gallery: [] });
  };

  return {
    projects,
    loading,
    editingId,
    formData,
    uploadingMedia,
    handleInputChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleMediaUpload,
    cancelEdit
  };
};

export default useProjects;
