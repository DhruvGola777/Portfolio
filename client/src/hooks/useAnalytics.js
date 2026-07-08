import { useState, useEffect } from 'react';
import { fetchAnalytics as apiFetchAnalytics } from '../api';
import toast from 'react-hot-toast';

const useAnalytics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      const result = await apiFetchAnalytics();
      setData(result);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load analytics data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return { data, loading, refetch: fetchAnalytics };
};

export default useAnalytics;
