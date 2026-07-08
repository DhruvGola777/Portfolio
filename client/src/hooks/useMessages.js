import { useState, useEffect } from 'react';
import { fetchMessages as apiFetchMessages, markMessageRead, deleteMessage as apiDeleteMessage } from '../api';
import toast from 'react-hot-toast';

const useMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const data = await apiFetchMessages();
      setMessages(data);
    } catch (err) {
      console.error('Failed to fetch messages', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id) => {
    try {
      await markMessageRead(id);
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await apiDeleteMessage(id);
      fetchMessages();
      toast.success('Message deleted!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete message');
    }
  };

  return { messages, loading, markAsRead, deleteMessage };
};

export default useMessages;
