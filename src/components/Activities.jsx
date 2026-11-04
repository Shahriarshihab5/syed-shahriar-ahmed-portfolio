import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Camera, MapPin, Quote } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useContent } from "./ContentContext";

const ActivityCard = ({ activity, index }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const images = activity.images && activity.images.length ? activity.images : ["/vite.svg"];

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentImg((previous) => (previous + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group gradient-border relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface/75 backdrop-blur-md transition-colors duration-300 hover:border-primary/40"
    >
      <div className="relative h-72 overflow-hidden bg-dark">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[currentImg % images.length]}
            src={images[currentImg % images.length]}
            alt={activity.title}
            loading="lazy"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.85, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
              activity.position || "object-center"
            }`}
          />
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-surface/25 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <span className="absolute left-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-dark/65 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-light backdrop-blur-md">
          <Quote size={10} className="text-primary" />
          {activity.role}
        </span>

        {images.length > 1 && (
          <div className="absolute bottom-4 left-5 z-20 flex gap-1.5">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`h-1 rounded-full transition-all duration-300 ${
                  idx === currentImg % images.length ? "w-6 bg-primary" : "w-2 bg-white/25"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-grow flex-col p-6">
        <h3 className="font-display text-lg font-bold leading-snug text-light transition-colors duration-300 group-hover:text-primary">
          {activity.title}
        </h3>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[9px] font-bold uppercase tracking-wider text-muted">
          <span className="flex items-center gap-1.5">
            <MapPin size={11} className="text-primary" />
            {activity.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={11} className="text-primary" />
            {activity.date}
          </span>
        </div>

        {activity.story && (
          <p className="mt-4 border-l-2 border-primary/30 pl-4 text-xs italic leading-relaxed text-muted">
            &ldquo;{activity.story}&rdquo;
          </p>
        )}
      </div>
    </motion.article>
  );
};

const Activities = () => {
  const { content } = useContent();
  const activities = (content.activities || []).filter((item) => item.visible !== false);

  return (
    <section id="activities" className="section-shell relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/3 top-10 h-72 w-72 rounded-full bg-accent/10 blur-[130px]" />

      <SectionHeading
        eyebrow="Beyond the Screen"
        icon={Camera}
        title="Life &"
        highlight="Leadership"
        description="Snapshots of my journey beyond the screen — where technical logic meets community leadership."
      />

      {activities.length === 0 ? (
        <p className="text-center text-sm text-muted">
          No activities are listed right now. Please check back soon.
        </p>
      ) : (
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity, index) => (
            <ActivityCard key={activity.id} activity={activity} index={index} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Activities;
