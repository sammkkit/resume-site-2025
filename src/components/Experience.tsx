"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./ui/SectionWrapper";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import { IExperience } from "@/models/Experience";

export default function Experience() {
    const [experiences, setExperiences] = useState<IExperience[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const res = await fetch("/api/experience");
                if (res.ok) {
                    const data = await res.json();
                    setExperiences(data);
                }
            } catch (error) {
                console.error("Failed to fetch experience", error);
            } finally {
                setLoading(false);
            }
        };

        fetchExperience();
    }, []);

    if (loading) return null;

    return (
        <SectionWrapper id="experience" className="bg-surface/50">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                    Experience & <span className="text-gradient">Education</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    My professional journey and academic background.
                </p>
            </div>

            <div className="max-w-4xl mx-auto relative">
                {/* Vertical Line */}
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />

                <div className="space-y-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={String(exp._id)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Timeline Dot */}
                            <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-[5px] md:-translate-x-1/2 mt-1.5 ring-4 ring-background z-10 hidden md:block" />

                            {/* Content */}
                            <div className="flex-1 md:w-1/2">
                                <div className="glass-card p-6 rounded-2xl relative">
                                    <div className="flex items-center gap-2 mb-2 text-primary text-sm font-medium">
                                        <Calendar className="w-4 h-4" />
                                        {exp.period}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                                    <div className="flex items-center gap-2 text-gray-400 mb-4">
                                        {exp.type === "work" ? (
                                            <Briefcase className="w-4 h-4" />
                                        ) : (
                                            <GraduationCap className="w-4 h-4" />
                                        )}
                                        {exp.company}
                                    </div>
                                    <ul className="space-y-2">
                                        {exp.description.map((item, i) => (
                                            <li key={i} className="text-gray-400 text-sm flex gap-2">
                                                <span className="text-primary mt-1.5">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Empty Space for alignment */}
                            <div className="flex-1 hidden md:block" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper >
    );
}
