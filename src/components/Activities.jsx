import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Quote } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

const ActivityCard = ({ activity }) => {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % activity.images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [activity.images.length]);

  return (
    <motion.div 
      className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#2a2a2a] flex flex-col h-full hover:border-primary/40 transition-colors group"
      whileHover={{ y: -10 }}
    >
      {/* Image Carousel Area */}
      <div className="relative h-72 overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          <motion.img
            key={activity.images[currentImg]}
            src={activity.images[currentImg]}
            alt={activity.title}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.8, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute bottom-4 left-4 flex gap-1.5 z-20">
          {activity.images.map((_, idx) => (
            <div key={idx} className={`h-1.5 rounded-full transition-all ${idx === currentImg ? "bg-primary w-6" : "bg-white/20 w-2"}`} />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
      </div>

      {/* Story/Caption Area */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-2">
          <Quote size={14} /> {activity.role}
        </div>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
          {activity.title}
        </h3>
        
        <div className="flex flex-wrap gap-4 text-gray-500 text-xs mb-4">
          <span className="flex items-center gap-1"><MapPin size={12}/> {activity.location}</span>
          <span className="flex items-center gap-1"><Calendar size={12}/> {activity.date}</span>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed italic">
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
      story: "Presented our research on CNN-based Osteoporosis detection to an audience of global academics. It was a defining moment for my career in AI and data intelligence.",
      images: ["/QPAIN.jpg", "/QPAIN22.jpg", "/QPAIN2.jpg"] 
    },
    {
      id: 2,
      title: "Rajshahi Students Association DIU",
      role: "Vice President",
      location: "Daffodil International University",
      date: "2024 - 2025",
      story: "Led and organized massive events for 300+ students, managing everything from logistics to stakeholder coordination. A journey that strengthened my leadership and teamwork capabilities.",
      images: ["/OitjjerHat.jpg"]
    },
    {
      id: 3,
      title: "DIU Job Utsob 2025",
      role: "Protocol Officer",
      location: "DIU Campus",
      date: "2025",
      story: "Managed protocol responsibilities for high-profile corporate guests and led a 6-member volunteer team. Ensured a smooth experience during one of the largest career fairs in the country.",
      images: ["/JB1.jpg", "/JB2.jpg"]
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
            Snapshots of my journey beyond the screen—where leadership meets community.
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