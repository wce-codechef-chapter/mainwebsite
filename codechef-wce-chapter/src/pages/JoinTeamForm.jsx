import React, { useState } from 'react';
import axios from 'axios';
import SectionHeader from '../components/SectionHeader';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

const JoinTeamForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    yearOfPassing: new Date().getFullYear() + 1, // Default to next year
    board: 'Main',
    post: 'President',
    linkedin: '',
    github: '',
    codechef: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' or 'error'

  // --- Dynamic Dropdown Options ---
  const mainPosts = [
    "President", "Vice President", "CP Lead", "Social Lead", "CP Executive", 
    "Design Head", "Revenue Manager", "Web Developer", "Secretary", "Club Service Director"
  ];

  const assistantPosts = [
    "Assistant Secretary", "Assistant Revenue Manager", "Public Relationship Officer", 
    "Assistant Designer", "Assistant Editor", "Event Manager", "Assistant CP Executive", "Assistant Member"
  ];

  const getPosts = () => {
    if (formData.board === 'Main') return mainPosts;
    if (formData.board === 'Assistant') return assistantPosts;
    if (formData.board === 'Member') return ["Member"];
    if (formData.board === 'Mentor') return ["Mentor", "Advisor", "Ex-President"];
    return [];
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    // Auto-select first post when board changes
    if (e.target.name === 'board') {
        const val = e.target.value;
        let defaultPost = '';
        if(val === 'Main') defaultPost = mainPosts[0];
        else if(val === 'Assistant') defaultPost = assistantPosts[0];
        else if(val === 'Member') defaultPost = 'Member';
        else defaultPost = 'Mentor';
        
        setFormData(prev => ({ ...prev, board: val, post: defaultPost }));
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (imageFile) data.append('image', imageFile);

    try {
      // Replace with your actual backend URL
      await axios.post('http://localhost:5000/api/members/add', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setStatus('success');
      setFormData({ ...formData, name: '', linkedin: '', github: '', codechef: '' });
      setImageFile(null);
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-24 bg-slate-950 px-6">
      <div className="container mx-auto max-w-2xl">
        <SectionHeader title="Join the Team" subtitle="Add a new member to the database." />
        
        {status === 'success' && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-xl flex items-center text-green-400 animate-fade-in-up">
            <CheckCircle className="w-5 h-5 mr-2" /> Member added successfully!
          </div>
        )}
        {status === 'error' && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center text-red-400 animate-fade-in-up">
            <AlertCircle className="w-5 h-5 mr-2" /> Failed to add member. Check server connection.
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-400 text-sm font-bold mb-2">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-3 focus:border-teal-500 outline-none" />
            </div>
            <div>
              <label className="block text-slate-400 text-sm font-bold mb-2">Year of Passing</label>
              <input type="number" name="yearOfPassing" value={formData.yearOfPassing} onChange={handleChange} required className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-3 focus:border-teal-500 outline-none" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-400 text-sm font-bold mb-2">Board Category</label>
              <select name="board" value={formData.board} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-3 focus:border-teal-500 outline-none">
                <option value="Main">Main Board</option>
                <option value="Assistant">Assistant Board</option>
                <option value="Member">Member Board</option>
                <option value="Mentor">Mentor (Manual)</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 text-sm font-bold mb-2">Role / Post</label>
              <select name="post" value={formData.post} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-3 focus:border-teal-500 outline-none">
                {getPosts().map((p, idx) => <option key={idx} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-4">
             <label className="block text-slate-400 text-sm font-bold">Social Profiles (Optional)</label>
             <input type="url" name="linkedin" placeholder="LinkedIn URL" value={formData.linkedin} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-3 focus:border-teal-500 outline-none" />
             <input type="url" name="github" placeholder="GitHub URL" value={formData.github} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-3 focus:border-teal-500 outline-none" />
             <input type="url" name="codechef" placeholder="CodeChef Profile URL" value={formData.codechef} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-3 focus:border-teal-500 outline-none" />
          </div>

          <div className="border-2 border-dashed border-slate-700 rounded-xl p-6 text-center hover:border-teal-500 transition-colors cursor-pointer relative group">
            <input type="file" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" required />
            <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2 group-hover:text-teal-400" />
            <p className="text-slate-400 text-sm">{imageFile ? imageFile.name : "Upload Profile Photo"}</p>
          </div>

          <button type="submit" disabled={loading} className={`w-full py-4 rounded-xl font-bold text-white transition-all ${loading ? 'bg-slate-700 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-500/20'}`}>
            {loading ? "Uploading..." : "Add Member"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default JoinTeamForm;