import React from 'react';
import { Terminal, Instagram, Linkedin, Github, Zap, Server, MapPin, Mail, Users, Youtube } from 'lucide-react';
import SectionHeader from './SectionHeader';
import Logo from "../assets/logo.jpg";


const StaffCard = ({ name, role, color, iconColor }) => (
  <div className="bg-slate-900 p-10 rounded-3xl border border-slate-800 text-center hover:border-teal-500/40 transition-all group hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-500/10">
    <div className={`w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br ${color} p-[2px] shadow-xl`}>
      <div className="w-full h-full rounded-full bg-slate-950 overflow-hidden flex items-center justify-center relative">
        <Users className={`w-14 h-14 ${iconColor} group-hover:scale-110 transition-transform`} />
      </div>
    </div>
    <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
    <p className="text-slate-400 font-medium tracking-wide uppercase text-sm">{role}</p>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-slate-950 pt-12 pb-12 border-t border-slate-900">
      <div className="container mx-auto px-6">
        
        {/* Mentors Section */}
        <div className="mb-28">
           <SectionHeader title="Our Mentors" subtitle="Guided by the wisdom and expertise of our esteemed faculty advisors." />
          <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
            <div className="flex-1">
              <StaffCard name="Dr. U.B. Chavan" role="Staff Advisor" color="from-blue-500 to-indigo-600" iconColor="text-blue-500" />
            </div>
            <div className="flex-1">
              <StaffCard name="Mr. M.A. Urunkar" role="Staff Advisor" color="from-purple-500 to-pink-600" iconColor="text-purple-500" />
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid md:grid-cols-3 gap-16 border-t border-slate-900 pt-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-2 font-bold text-2xl text-white">
              <img src={Logo} alt="CodeChef WCE Logo" className="w-10 h-10 rounded-full object-cover" />
              <span>CodeChef <span className="text-teal-400">WCE Chapter</span></span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              "We are Chefs, We Cook Algorithms". <br/>
              Building the next generation of problem solvers at WCE.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.instagram.com/codechef_wce_chapter" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-teal-600 hover:text-white transition-all border border-slate-800"><Instagram size={20} /></a>
              <a href="https://www.linkedin.com/company/wce-codechef-chapter/" target="_blank" rel="noopener noreferrer"className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all border border-slate-800"><Linkedin size={20} /></a>

              <a href="https://youtube.com/@codechefwcechapter?si=XgjiB4jrtDxh_fcq" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-all border border-slate-800"><Youtube size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center"><Zap className="w-4 h-4 text-teal-500 mr-2" /> Quick Links</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="/" className="hover:text-teal-400 hover:pl-2 transition-all block">Home</a></li>
              <li><a href="/team" className="hover:text-teal-400 hover:pl-2 transition-all block">Our Team</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center"><Server className="w-4 h-4 text-teal-500 mr-2" /> Contact Us</h4>
            <ul className="space-y-5 text-slate-400">
              <li className="flex items-start"><MapPin className="w-5 h-5 text-teal-500 mr-4 mt-1 flex-shrink-0" /><span>Walchand College of Engineering,<br />Vishrambag, Sangli - 416415</span></li>
              <li className="flex items-center"><Mail className="w-5 h-5 text-teal-500 mr-4 flex-shrink-0" /><span>wcecodechefchapter@gmail.com</span></li>
            </ul>
          </div>
        </div>
        
        <div className="text-center text-slate-600 text-sm mt-20 pt-8 border-t border-slate-900/50">
          <p>© 2025 CodeChef WCE Chapter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
