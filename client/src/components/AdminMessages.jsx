import React from 'react';
import useMessages from '../hooks/useMessages';

const AdminMessages = () => {
  const { messages, loading, markAsRead, deleteMessage } = useMessages();



  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
        Contact Messages
        <span className="bg-accent/20 text-accent text-xs px-2 py-1 rounded-full">{messages.length}</span>
      </h2>

      {loading ? (
        <p className="text-gray-400">Loading messages...</p>
      ) : messages.length === 0 ? (
        <div className="bg-white/5 border border-white/10 p-12 text-center rounded-2xl">
          <p className="text-gray-400">No messages yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {messages.map((msg) => (
            <div key={msg._id} className={`border p-6 rounded-2xl flex flex-col gap-4 ${msg.read ? 'bg-white/5 border-white/10' : 'bg-accent/5 border-accent/20'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-white flex items-center gap-2">
                    {msg.name} 
                    {!msg.read && <span className="text-[10px] bg-accent text-white px-2 py-0.5 rounded-full uppercase tracking-wider">New</span>}
                  </h3>
                  <a href={`mailto:${msg.email}`} className="text-accent text-sm hover:underline">{msg.email}</a>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-xs text-gray-500 font-medium">
                    {new Date(msg.createdAt).toLocaleDateString()} {new Date(msg.createdAt).toLocaleTimeString()}
                  </span>
                  <div className="flex gap-2">
                    {!msg.read && (
                      <button onClick={() => markAsRead(msg._id)} className="text-xs text-green-400 hover:underline">Mark as Read</button>
                    )}
                    <button onClick={() => deleteMessage(msg._id)} className="text-xs text-red-400 hover:underline">Delete</button>
                  </div>
                </div>
              </div>
              <div className="bg-black/30 p-4 rounded-xl border border-white/5 text-gray-300 whitespace-pre-wrap">
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
