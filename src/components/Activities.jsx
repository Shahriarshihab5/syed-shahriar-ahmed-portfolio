import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Quote } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

const ActivityCard = ({ activity }) => {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    if (!activity.images || activity.images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % activity.images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [activity.images.length]);

  return (
    <motion.div 
      className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#2a2a2a] flex flex-col h-full hover:border-primary/40 transition-all duration-300 group shadow-lg"
      whileHover={{ y: -10 }}
    >
      {/* Container height kept at h-80 to match your preferred design */}
      <div className="relative h-80 overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          <motion.img
            key={activity.images[currentImg]}
            src={activity.images[currentImg]}
            alt={activity.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className={`w-full h-full object-cover ${activity.position || "object-center"}`} 
          />
        </AnimatePresence>

        {/* Professional gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-500" />
        
        {activity.images.length > 1 && (
          <div className="absolute bottom-4 left-6 flex gap-1.5 z-20">
            {activity.images.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1 rounded-full transition-all duration-300 ${
                  idx === currentImg ? "bg-primary w-6" : "bg-white/20 w-2"
                }`} 
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow bg-[#1a1a1a]">
        <div className="flex items-center gap-2 text-primary text-[10px] font-bold uppercase tracking-widest mb-2">
          <Quote size={12} /> {activity.role}
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
          {activity.title}
        </h3>
        
        <div className="flex gap-4 text-gray-500 text-[10px] mb-4 uppercase font-semibold">
          <span className="flex items-center gap-1"><MapPin size={12}/> {activity.location}</span>
          <span className="flex items-center gap-1"><Calendar size={12}/> {activity.date}</span>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed italic border-l-2 border-primary/30 pl-4">
          "{activity.story}"
        </p>
      </div>
    </motion.div>
  );
};

const Activities = () => {
  const activities = [
    {
      id: 1,
      title: "IEEE QPAIN International Conference",
      role: "Lead Author & Presenter",
      location: "CUET, Bangladesh",
      date: "2026",
      story: "Presented our research on CNN-based Osteoporosis detection to a global academic audience. It was a defining moment for my career in AI and data intelligence.",
      images: ["/QPAIN.jpg", "/QPAIN22.jpg", "/QPAIN2.jpg"],
      position: "object-center"
    },
    {
      id: 2,
      title: "Rajshahi Students Association DIU",
      role: "Vice President",
      location: "Daffodil International University",
      date: "2024 - 2025",
      story: "Led and organized massive events like 'Oitjjer Hat' for 300+ students, strengthening my leadership and stakeholder coordination skills.",
      images: ["/OitjjerHat.jpg", "/OH2.jpg", "/OH3.jpg", "/OH4.jpg"],
      position: "object-center"
    },
    {
      id: 3,
      title: "DIU Job Utsob 2025",
      role: "Protocol Officer",
      location: "DIU Campus",
      date: "2025",
      story: "Managed protocol for high-profile corporate guests and led a volunteer team during one of the largest career fairs in Bangladesh.",
      images: ["/JB1.jpg", "/JB2.jpg"],
      position: "object-center"
    },
    {
      id: 4,
      title: "Intra Department Cricket Tournament",
      role: "Champion Cricketer",
      location: "DIU Campus",
      date: "2025",
      story: "Winning the trophy alongside my teammates reminded me that the same precision I apply to data is what wins games on the field. A proud day for the Department of CSE.",
      images: ["/cseCT1.jpg", "/cseCT2.jpg", "/cseCT3.jpg"],
      position: "object-top" // This specifically fixes the portrait framing for this card
    }
  ];

  return (
    <section id="activities" className="min-h-screen px-8 md:px-20 py-20 bg-[#0d0d0d]">
      <RevealOnScroll direction="up">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Life & <span className="text-primary">Leadership</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto italic">
            Snapshots of my journey beyond the screen—where technical logic meets community leadership.
          </p>
        </div>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </section>
  );
};

export default Activities;