import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import SectionHeading from "./SectionHeading";
import RevealOnScroll from "./RevealOnScroll";
import { useContent } from "./ContentContext";

const inputClass =
  "w-full rounded-xl border border-line bg-dark/60 px-4 py-3 text-sm text-light placeholder:text-muted/60 transition-all duration-300 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20";

const Contact = () => {
  const { content } = useContent();
  const profile = content.profile || {};

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: profile.email,
      link: `mailto:${profile.email}`,
    },
    {
      icon: Phone,
      title: "Phone",
      value: profile.phone,
      link: `tel:${String(profile.phone || "").replace(/[^\d+]/g, "")}`,
    },
    {
      icon: MapPin,
      title: "Present Address",
      value: profile.location,
      link: `https://maps.google.com/?q=${encodeURIComponent(profile.location || "")}`,
    },
    {
      icon: MapPin,
      title: "Hometown",
      value: profile.hometown,
      link: `https://maps.google.com/?q=${encodeURIComponent(profile.hometown || "")}`,
    },
  ].filter((info) => info.value);

  const socialLinks = [
    { icon: Github, url: profile.github, label: "GitHub" },
    { icon: Linkedin, url: profile.linkedin, label: "LinkedIn" },
  ].filter((social) => social.url);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const mailtoLink = `mailto:${profile.email}?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoLink;
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="section-shell relative overflow-hidden">

      <SectionHeading
        eyebrow="Contact"
        number="06"
        icon={Mail}
        title="Get In"
        highlight="Touch"
        description="Have a project in mind, a role to fill, or a dataset that needs clarity? Let's talk."
      />

      <div className="relative z-10 mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left: details */}
        <RevealOnScroll direction="right">
          <div className="space-y-6">
            <div className="rounded-3xl border border-line bg-surface/90 p-7">
              <h3 className="font-display text-xl font-bold text-light">Contact Information</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities
                to be part of your vision.
              </p>

              <div className="mt-7 space-y-3">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <motion.a
                      key={info.title}
                      href={info.link}
                      target={info.link.startsWith("http") ? "_blank" : "_self"}
                      rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                      whileHover={{ x: 5 }}
                      className="group flex items-center gap-4 rounded-xl border border-line bg-dark/40 p-3.5 transition-colors duration-300 hover:border-primary/40"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                        <Icon size={18} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-muted">
                          {info.title}
                        </span>
                        <span className="block truncate text-sm font-medium text-light">
                          {info.value}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={15}
                        className="ml-auto shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-line bg-surface/90 p-7">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Follow Me</h4>
              <div className="mt-4 flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -4 }}
                      aria-label={social.label}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-dark/40 text-primary transition-all duration-300 hover:border-primary/50 hover:bg-primary hover:text-white"
                    >
                      <Icon size={19} />
                    </motion.a>
                  );
                })}
              </div>
              <div className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3.5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Available for new opportunities
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Right: form */}
        <RevealOnScroll direction="left" delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="gradient-border relative overflow-hidden rounded-3xl border border-line bg-surface/90 p-6 md:p-8"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative z-10 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Project inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className={`${inputClass} resize-none`}
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="shine group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary via-secondary to-accent px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={17} className="relative z-10" />
                <span className="relative z-10">{isSubmitting ? "Sending..." : "Send Message"}</span>
              </motion.button>

              <p className="flex items-center justify-center gap-1.5 text-center text-[10px] text-muted">
                <Sparkles size={11} className="text-primary" />
                Usually replies within 24 hours
              </p>
            </div>
          </form>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Contact;
