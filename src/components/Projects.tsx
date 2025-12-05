"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./ui/SectionWrapper";
import Button from "./ui/Button";
import { getIcon } from "@/lib/icons";
import { IProject } from "@/models/Project";

export default function Projects() {
    const [projects, setProjects] = useState<IProject[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch("/api/projects");
                if (res.ok) {
                    const data = await res.json();
                    setProjects(data);
                }
            } catch (error) {
                console.error("Failed to fetch projects", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) return null; // Or a loading skeleton

    return (
        <SectionWrapper id="projects">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                    Featured <span className="text-gradient">Projects</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Showcasing my work in Mobile Development and Machine Learning.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => {
                    const Icon = getIcon(project.icon);
                    return (
                        <motion.div
                            key={String(project._id)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-card rounded-2xl overflow-hidden flex flex-col h-full group"
                        >
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="mb-6 p-4 bg-white/5 rounded-xl w-fit group-hover:bg-primary/10 transition-colors duration-300">
                                    <Icon className="w-10 h-10 text-primary" />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-gray-400 mb-6 flex-1">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded-md text-gray-300"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="space-y-2 mb-6">
                                    {project.stats.map((stat) => (
                                        <div key={stat} className="flex items-center gap-2 text-sm text-gray-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                            {stat}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 pt-0 mt-auto">
                                <div className="flex gap-3">
                                    {project.links.map((link) => {
                                        const LinkIcon = getIcon(link.icon);
                                        return (
                                            <Button
                                                key={link.name}
                                                variant="outline"
                                                size="sm"
                                                onClick={() => window.open(link.href, "_blank")}
                                                className="w-full"
                                            >
                                                {link.name} <LinkIcon size={16} className="ml-2" />
                                            </Button>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </SectionWrapper>
    );
}
