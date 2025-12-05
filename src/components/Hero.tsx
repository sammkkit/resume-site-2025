"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Button from "./ui/Button";
import Background3D from "./Background3D";
import { siteConfig } from "@/config/site";
import { useState, useEffect } from "react";

export default function Hero() {
    const [resumeUrl, setResumeUrl] = useState(siteConfig.resumeUrl);

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const res = await fetch("/api/resume");
                if (res.ok) {
                    const data = await res.json();
                    if (data.resumeUrl) {
                        setResumeUrl(data.resumeUrl);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch resume URL", error);
            }
        };
        fetchResume();
    }, []);

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            <Background3D />

            <div className="z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-sm text-primary mb-6 backdrop-blur-md">
                            Available for Work
                        </span>
                    </motion.div>

                    <h2 className="text-xl md:text-2xl font-medium text-primary mb-4">
                        Hello, I&apos;m
                    </h2>
                    <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 tracking-tight">
                        Samkit <span className="text-gradient">Jain</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                        A passionate <span className="text-white font-semibold">Android Developer</span> and <span className="text-white font-semibold">Machine Learning Enthusiast</span> crafting innovative digital experiences.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                            size="lg"
                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            View My Work <ArrowRight className="ml-2" />
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => window.open(resumeUrl, "_blank")}
                        >
                            Download Resume <Download className="ml-2" />
                        </Button>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
            >
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-primary rounded-full animate-scroll" />
                </div>
            </motion.div>
        </section>
    );
}
