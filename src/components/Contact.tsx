"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./ui/SectionWrapper";
import Button from "./ui/Button";
import { Send, Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        window.location.href = `mailto:samkitjain430@gmail.com?subject=Contact from Portfolio&body=${formState.message}`;
    };

    return (
        <SectionWrapper id="contact">
            <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                        Let's <span className="text-gradient">Connect</span>
                    </h2>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi,
                        I'll try my best to get back to you!
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Email</h3>
                                <a href="mailto:samkitjain430@gmail.com" className="text-gray-400 hover:text-primary transition-colors">
                                    samkitjain430@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Phone</h3>
                                <a href="tel:+919301722713" className="text-gray-400 hover:text-secondary transition-colors">
                                    +91 9301722713
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Location</h3>
                                <p className="text-gray-400">Bhopal, India</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="glass-card p-8 rounded-2xl"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary text-white transition-colors"
                                placeholder="Your Name"
                                value={formState.name}
                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary text-white transition-colors"
                                placeholder="your@email.com"
                                value={formState.email}
                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                required
                                rows={4}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary text-white transition-colors resize-none"
                                placeholder="Your message..."
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                            />
                        </div>

                        <Button type="submit" className="w-full">
                            Send Message <Send className="ml-2 w-4 h-4" />
                        </Button>
                    </form>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
