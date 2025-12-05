"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./ui/SectionWrapper";
import { getIcon } from "@/lib/icons";
import { ISkill } from "@/models/Skill";

export default function Skills() {
    const [skills, setSkills] = useState<ISkill[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await fetch("/api/skills");
                if (res.ok) {
                    const data = await res.json();
                    setSkills(data);
                }
            } catch (error) {
                console.error("Failed to fetch skills", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSkills();
    }, []);

    if (loading) return null;

    return (
        <SectionWrapper id="skills">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                    Technical <span className="text-gradient">Skills</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    A comprehensive toolkit for building robust and scalable applications.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill, index) => {
                    const Icon = getIcon(skill.icon);
                    return (
                        <motion.div
                            key={String(skill._id)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-card p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                                    <Icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-white">{skill.category}</h3>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {skill.items.map((item) => (
                                    <span
                                        key={item}
                                        className="px-3 py-1 text-sm bg-white/5 border border-white/10 rounded-full text-gray-300 hover:text-white hover:border-primary/50 transition-colors"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </SectionWrapper>
    );
}
