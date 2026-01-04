import React from 'react';
import { Calendar,Flame ,  Trophy } from 'lucide-react';
import SectionHeader from './SectionHeader';

const EventCard = ({ title, date, desc, tags, imageColor, link }) => {
  // If link exists, wrap the card in <a>
  const CardContent = (
    <div className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-teal-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/10 flex flex-col h-full cursor-pointer">
      <div className={`h-1.5 bg-gradient-to-r ${imageColor}`}></div>
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800 text-teal-300 text-xs font-bold uppercase tracking-wider border border-slate-700">
            <Calendar className="w-3 h-3 mr-2" />
            {date}
          </div>

          <div className="p-2 bg-slate-800 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:bg-green-500/10 group-hover:shadow-[0_0_14px_rgba(34,197,94,0.2)]">
            <Flame className="w-4 h-4 text-green-400/80 transition-all duration-300" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-teal-400 transition-colors">
          {title}
        </h3>

        <p className="text-slate-400 mb-8 leading-relaxed text-sm">{desc}</p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-950 text-slate-500 border border-slate-800 font-mono"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  if (link) {
    return (
      <a
        href={link.startsWith("http") ? link : `https://${link}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {CardContent}
      </a>
    );
  }

  return CardContent;
};

const Events = () => {
 const eventsList = [
  {
    title: "WCPC 2025",
    date: "Oct 2, 2025",
    desc: "Flagship offline programming contest at Main CCF. 27 teams competed. Guest speaker: Mr. Vivek Gupta (ICPC Finalist).",
    tags: ["Contest", "Offline", "ICPC"],
    imageColor: "from-teal-500 to-cyan-600",
    link: "https://wcpc-2k25.vercel.app"
    
  },
  {
    title: "C++ Bootcamp",
    date: "Jan 19–20, 2025",
    desc: "2-day workshop on C++ basics, STL, and OOP fundamentals in collaboration with ACSES.",
    tags: ["Workshop", "C++", "STL"],
    imageColor: "from-emerald-500 to-green-600"
  },
  {
    title: "Coffee With Chef",
    date: "Periodic",
    desc: "Expert sessions with alumni from Google & CRED on CP growth and interview insights.",
    tags: ["Talk", "Alumni", "Guidance"],
    imageColor: "from-amber-500 to-orange-600"
  },
  {
    title: "Interstellar (GIM)",
    date: "Sept 21, 2025",
    desc: "Freshers meet with club intro, fun activities, and annual roadmap reveal at Tilak Hall.",
    tags: ["Freshers", "GIM", "Roadmap"],
    imageColor: "from-fuchsia-500 to-rose-600"
  },

  {
    title: "PCD (Post Contest Discussions)",
    date: "Weekly",
    desc: "Breakdown of recent CodeChef & Codeforces contest problem approaches.",
    tags: ["Discussion", "Approach", "Contests"],
    imageColor: "from-teal-500 to-cyan-600"
  },
  {
    title: "Algorithm Arcade",
    date: "June–July 2025",
    desc: "Team CP topic presentations followed by a concept-based club contest.",
    tags: ["Teams", "Algorithms", "Contest"],
    imageColor: "from-purple-500 to-indigo-600"
  },
  {
    title: "Clash of Code",
    date: "December 2025",
    desc: "4-week CP sprint with weekly challenge sheets and practice tasks.",
    tags: ["Practice", "Sprint", "CP"],
    imageColor: "from-blue-500 to-sky-600"
  },
  {
    title: "Cookbook 3.0",
    date: "2026",
    desc: "Student-led sessions on advanced DSA with hands-on problem solving.",
    tags: ["DSA", "Learning", "Community"],
    imageColor: "from-fuchsia-500 to-rose-600",
    link: "https://cookbook30.netlify.app"

  }
];


  return (
    <section id="events" className="py-24 bg-slate-950 border-b border-slate-900">
      <div className="container mx-auto px-6">
        <SectionHeader 
          title="Recent Events" 
          subtitle="From intense coding battles to insightful talk shows, see how we keep the spirit of programming alive."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-20">
          {eventsList.map((event, idx) => (
            <EventCard key={idx} {...event} />
          ))}
        </div>

        {/* Winners Section */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-teal-500/30 p-8 md:p-12 text-center">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="inline-block p-3 rounded-full bg-amber-500/10 mb-6">
                <Trophy className="w-10 h-10 text-amber-500" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">WCPC 2025 Hall of Fame</h3>
            <p className="text-slate-400 mb-10 max-w-2xl mx-auto">Celebrating the brilliant minds who conquered the problem statements.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-end">
              <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm order-2 md:order-1">
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">1st Runner Up</div>
                <div className="text-xl font-bold text-white">qChalti Hai Pavan</div>
              </div>

              <div className="bg-gradient-to-b from-teal-900/40 to-slate-900/40 p-8 rounded-2xl border border-amber-500/50 backdrop-blur-sm relative transform md:-translate-y-4 shadow-xl shadow-amber-500/5 order-1 md:order-2">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Champion</div>
                <div className="text-3xl font-black text-white mb-2">Kodarsklub</div>
                <div className="text-amber-500 text-sm font-medium">Outstanding Performance</div>
              </div>

              <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm order-3">
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">2nd Runner Up</div>
                <div className="text-xl font-bold text-white">Can't Decide a Name</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
