"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./ui/SectionWrapper";
import { Trophy, Star, Code } from "lucide-react";

const achievements = [
    {
        title: "1st Place - Project Competition",
        description: "Won 1st place at IIIT Bhopal for developing GeoLog, a location-based logging solution.",
        icon: <Trophy className="w-8 h-8 text-yellow-400" />,
    },
    {
        title: "3-Star CodeChef Rating",
        description: "Achieved a top performance of 1630, demonstrating consistent high performance in global contests.",
        icon: <Star className="w-8 h-8 text-primary" />,
    },
    {
        title: "1000+ Problems Solved",
        description: "Completed 700+ DSA-focused problems on Leetcode and GeeksforGeeks.",
        icon: <Code className="w-8 h-8 text-secondary" />,
    },
];

export default function Achievements() {
    return (
        <SectionWrapper id="achievements" className="bg-surface/50">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                    Key <span className="text-gradient">Achievements</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {achievements.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="glass-card p-8 rounded-2xl text-center hover:bg-white/10 transition-colors"
                    >
                        <div className="mx-auto w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                            {item.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                        <p className="text-gray-400">{item.description}</p>
                    </motion.div>
                ))}
            </div>
        </SectionWrapper>
    );
}
