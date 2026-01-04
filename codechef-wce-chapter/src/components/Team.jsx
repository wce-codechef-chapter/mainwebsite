import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SectionHeader from './SectionHeader';
import { Linkedin, Github, Hash, Loader } from 'lucide-react';

const Team = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('current'); // 'current' or 'mentors'

  useEffect(() => {
    // Replace with your actual backend URL
    axios.get('http://localhost:5000/api/members')
      .then(res => {
        setMembers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch members", err);
        setLoading(false);
      });
  }, []);

  // --- LOGIC: AUTO-MOVE TO MENTORS ---
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0 = Jan, 4 = May

  const isMentor = (member) => {
    // 1. Explicitly marked as Mentor in DB
    if (member.board === 'Mentor') return true;

    // 2. Logic: If Passing Year < Current Year (Graduated)
    if (member.yearOfPassing < currentYear) return true;
    
    // 3. Logic: If Passing Year == Current Year AND Month > May (Graduated in June)
    if (member.yearOfPassing === currentYear && currentMonth > 4) return true;

    return false;
  };

  const currentTeam = members.filter(m => !isMentor(m));
  const mentors = members.filter(m => isMentor(m));

  // Sort Current Team by Board
  const mainBoard = currentTeam.filter(m => m.board === 'Main');
  const assistantBoard = currentTeam.filter(m => m.board === 'Assistant');
  const memberBoard = currentTeam.filter(m => m.board === 'Member');

  const MemberCard = ({ m }) => {
    let borderColor = "border-slate-800";
    if (m.board === 'Main') borderColor = "hover:border-amber-500/50";
    if (m.board === 'Assistant') borderColor = "hover:border-teal-500/50";
    
    return (
      <div className={`bg-slate-900 p-6 rounded-2xl border border-slate-800 ${borderColor} flex flex-col items-center transition-all hover:-translate-y-2 hover:shadow-xl`}>
        <div className="w-24 h-24 bg-slate-800 rounded-full mb-4 overflow-hidden border-2 border-slate-700">
           <img src={m.imageUrl || "https://via.placeholder.com/150"} alt={m.name} className="w-full h-full object-cover" />
        </div>
        <h3 className="text-white font-bold text-lg text-center leading-tight">{m.name}</h3>
        <p className="text-teal-400 text-xs uppercase font-bold tracking-wider mb-1 mt-1">{m.post}</p>
        <p className="text-slate-500 text-[10px] uppercase tracking-widest">{m.board} Board • '{m.yearOfPassing % 100}</p>
        
        <div className="flex space-x-3 mt-4 text-slate-400">
          {m.linkedin && <a href={m.linkedin} target="_blank" rel="noreferrer" className="hover:text-white"><Linkedin size={18} /></a>}
          {m.github && <a href={m.github} target="_blank" rel="noreferrer" className="hover:text-white"><Github size={18} /></a>}
          {m.codechef && <a href={m.codechef} target="_blank" rel="noreferrer" className="hover:text-white"><Hash size={18} /></a>}
        </div>
      </div>
    );
  };

  return (
    <div className="pt-24 pb-24 min-h-screen bg-slate-950">
      <div className="container mx-auto px-6">
        <SectionHeader title="Our Team" subtitle="The dedicated minds behind CodeChef WCE Chapter." />

        {/* Tab Switcher */}
        <div className="flex justify-center mb-16">
          <div className="bg-slate-900 p-1.5 rounded-full border border-slate-800 flex shadow-xl">
            <button onClick={() => setActiveTab('current')} className={`px-8 py-3 rounded-full font-bold transition-all ${activeTab === 'current' ? 'bg-teal-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>
              Current Team
            </button>
            <button onClick={() => setActiveTab('mentors')} className={`px-8 py-3 rounded-full font-bold transition-all ${activeTab === 'mentors' ? 'bg-teal-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>
              Mentors & Alumni
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader className="animate-spin w-10 h-10 text-teal-500" /></div>
        ) : (
          <div className="animate-fade-in-up">
            {activeTab === 'current' ? (
              <div className="space-y-20">
                {mainBoard.length > 0 && (
                  <div>
                    <div className="flex items-center mb-8"><div className="h-px bg-slate-800 flex-1"></div><span className="px-4 text-amber-500 text-sm font-bold uppercase tracking-widest">Main Board</span><div className="h-px bg-slate-800 flex-1"></div></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{mainBoard.map(m => <MemberCard key={m._id} m={m} />)}</div>
                  </div>
                )}
                {assistantBoard.length > 0 && (
                  <div>
                    <div className="flex items-center mb-8"><div className="h-px bg-slate-800 flex-1"></div><span className="px-4 text-fuchsia-500 text-sm font-bold uppercase tracking-widest">Assistant Board</span><div className="h-px bg-slate-800 flex-1"></div></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{assistantBoard.map(m => <MemberCard key={m._id} m={m} />)}</div>
                  </div>
                )}
                {memberBoard.length > 0 && (
                  <div>
                    <div className="flex items-center mb-8"><div className="h-px bg-slate-800 flex-1"></div><span className="px-4 text-slate-500 text-sm font-bold uppercase tracking-widest">Executive Members</span><div className="h-px bg-slate-800 flex-1"></div></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{memberBoard.map(m => <MemberCard key={m._id} m={m} />)}</div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{mentors.map(m => <MemberCard key={m._id} m={m} />)}</div>
                {mentors.length === 0 && <p className="text-center text-slate-500">No mentors found yet.</p>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;