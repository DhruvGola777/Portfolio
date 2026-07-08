import { useState, useEffect } from 'react';
import { fetchExperience as apiFetchExperience, createExperience, updateExperience, deleteExperience } from '../api';
import toast from 'react-hot-toast';

const useExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    date: '',
    description: '',
    type: 'work'
  });

  const fetchExperiences = async () => {
    try {
      const data = await apiFetchExperience();
      setExperiences(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateExperience(editingId, formData);
      } else {
        await createExperience(formData);
        toast.success('Experience created successfully!');
      }
      
      setFormData({ title: '', company: '', date: '', description: '', type: 'work' });
      setEditingId(null);
      fetchExperiences();
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Error saving experience');
    }
  };

  const handleEdit = (exp) => {
    setEditingId(exp._id);
    setFormData({
      title: exp.title,
      company: exp.company,
      date: exp.date,
      description: exp.description,
      type: exp.type
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this experience?")) return;
    try {
      await deleteExperience(id);
      await fetchExperiences();
      toast.success('Experience deleted successfully!');
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Error deleting experience');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ title: '', company: '', date: '', description: '', type: 'work' });
  };

  return {
    experiences,
    loading,
    editingId,
    formData,
    handleInputChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    cancelEdit
  };
};

export default useExperience;
