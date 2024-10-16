import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '@/app/components/Modal';

interface Notice {
  id: number;
  title: string;
  content: string;
}

const Notice: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [newNotice, setNewNotice] = useState({ title: '', content: '' });
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noticeToDelete, setNoticeToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchNotices = async () => {
      const fetchedNotices: Notice[] = [
        { id: 1, title: 'Notice 1', content: 'Content for Notice 1' },
        { id: 2, title: 'Notice 2', content: 'Content for Notice 2' },
      ];
      setNotices(fetchedNotices);
    };

    fetchNotices();
  }, []);

  const handleNewNoticeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewNotice(prev => ({ ...prev, [name]: value }));
  };

  const handleAddNotice = async () => {
    const addedNotice: Notice = {
      id: notices.length + 1,
      title: newNotice.title,
      content: newNotice.content,
    };
    setNotices(prev => [...prev, addedNotice]);
    toast.success('Notice added successfully!');
    setNewNotice({ title: '', content: '' });
  };

  const handleEditNotice = (notice: Notice) => {
    setEditingNotice(notice);
    setNewNotice({ title: notice.title, content: notice.content });
  };

  const handleUpdateNotice = async () => {
    if (editingNotice) {
      const updatedNotices = notices.map(n =>
        n.id === editingNotice.id ? { ...n, ...newNotice } : n
      );
      setNotices(updatedNotices);
      toast.success('Notice updated successfully!');
      setNewNotice({ title: '', content: '' });
      setEditingNotice(null);
    }
  };

  const handleDeleteNotice = (id: number) => {
    setNoticeToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (noticeToDelete !== null) {
      const updatedNotices = notices.filter(notice => notice.id !== noticeToDelete);
      setNotices(updatedNotices);
      toast.error('Notice deleted successfully!');
      setNoticeToDelete(null);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Notices</h1>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold">{editingNotice ? 'Edit Notice' : 'Add New Notice'}</h2>
        <input
          type="text"
          name="title"
          value={newNotice.title}
          onChange={handleNewNoticeChange}
          placeholder="Notice Title"
          className="border rounded p-2 w-full mb-2"
        />
        <textarea
          name="content"
          value={newNotice.content}
          onChange={handleNewNoticeChange}
          placeholder="Notice Content"
          className="border rounded p-2 w-full mb-4"
          rows={4}
        />
        <button
          onClick={editingNotice ? handleUpdateNotice : handleAddNotice}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {editingNotice ? 'Update Notice' : 'Add Notice'}
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold">Existing Notices</h2>
        <table className="min-w-full mt-4 table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Content</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notices.map(notice => (
              <tr key={notice.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{notice.title}</td>
                <td className="border px-4 py-2">{notice.content}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEditNotice(notice)}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteNotice(notice.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for deletion confirmation */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={confirmDelete} 
      />

      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default Notice;
