import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const mailtoLink = `mailto:shahriarshihab1123@gmail.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email",
      value: "shahriarshihab1123@gmail.com",
      link: "mailto:shahriarshihab1123@gmail.com",
    },
    {
      icon: <Phone size={24} />,
      title: "Phone",
      value: "+880 1737712021",
      link: "tel:+8801737712021",
    },
    {
      icon: <MapPin size={24} />,
      title: "Location",
      value: "Dhaka, Bangladesh",
      link: "#",
    },
  ];

  const socialLinks = [
    {
      icon: <Github size={24} />,
      url: "https://github.com/Shahriarshihab5",
      label: "GitHub",
    },
    {
      icon: <Linkedin size={24} />,
      url: "https://www.linkedin.com/in/syed-shahriar-ahmed-183233208/",
      label: "LinkedIn",
    },
  ];

  return (
    <section
      id="contact"
      className="min-h-screen px-8 md:px-20 py-20 bg-[#0d0d0d] text-light"
    >
      {/* Section Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Get In <span className="text-primary">Touch</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out!
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Left Side - Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">
              Contact Information
            </h3>
            <p className="text-gray-400 mb-8">
              Feel free to contact me anytime. I'm always open to discussing new
              projects, creative ideas, or opportunities to be part of your visions.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.link}
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-center gap-4 p-4 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] hover:border-primary transition-all group cursor-pointer"
              >
                <div className="text-primary group-hover:scale-110 transition-transform">
                  {info.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500">{info.title}</p>
                  <p className="text-white font-medium">{info.value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="w-12 h-12 flex items-center justify-center bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] text-primary hover:bg-primary hover:text-dark hover:shadow-[0_0_20px_#ff4c29] transition-all"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-[#1a1a1a] p-8 rounded-xl border border-[#2a2a2a] space-y-6"
          >
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                placeholder="John Doe"
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Your Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                placeholder="[email protected]"
              />
            </div>

            {/* Subject Input */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                placeholder="Project Inquiry"
              />
            </div>

            {/* Message Textarea */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-dark font-semibold rounded-lg hover:shadow-[0_0_20px_#ff4c29] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
