"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionWrapper from "./ui/SectionWrapper";
import Button from "./ui/Button";
import { ArrowRight } from "lucide-react";

export default function About() {
    return (
        <SectionWrapper id="about" className="bg-surface/50">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Image Column */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative group"
                >
                    <div className="relative w-full aspect-square max-w-md mx-auto rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-primary/50 transition-colors duration-500">
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
                        <Image
                            src="/profile.jpg"
                            alt="Samkit Jain"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-primary/50 rounded-tl-3xl -z-10" />
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-secondary/50 rounded-br-3xl -z-10" />
                </motion.div>

                {/* Text Column */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                        About <span className="text-gradient">Me</span>
                    </h2>

                    <div className="space-y-4 text-gray-400 leading-relaxed">
                        <p>
                            I'm a passionate Software Developer currently pursuing my B.Tech in Information Technology at IIIT Bhopal.
                            With a strong foundation in <span className="text-white font-medium">Android Development, Web Technologies, and Machine Learning</span>,
                            I love building scalable and user-centric applications.
                        </p>
                        <p>
                            My journey involves architecting production-ready apps, optimizing performance, and solving complex problems through code.
                            I've interned at <span className="text-white font-medium">TheCarePal</span>, where I reduced user churn by 12% and accelerated release timelines.
                        </p>
                        <p>
                            Beyond coding, I'm an active competitive programmer (Max Rating 1630 on CodeChef) and have led campus-wide coding events.
                            I'm always eager to learn new technologies and contribute to impactful projects.
                        </p>
                    </div>

                    <div className="mt-8 flex gap-4">
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold text-white">1000+</span>
                            <span className="text-sm text-gray-500">Problems Solved</span>
                        </div>
                        <div className="w-px bg-white/10" />
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold text-white">8.9</span>
                            <span className="text-sm text-gray-500">CGPA</span>
                        </div>
                        <div className="w-px bg-white/10" />
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold text-white">Top 15</span>
                            <span className="text-sm text-gray-500">IIIT Bhopal CP</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
