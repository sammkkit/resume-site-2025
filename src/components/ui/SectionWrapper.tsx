"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
    children: React.ReactNode;
    id: string;
    className?: string;
}

export default function SectionWrapper({ children, id, className }: SectionWrapperProps) {
    return (
        <section id={id} className={cn("py-20 md:py-32 relative overflow-hidden", className)}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-7xl mx-auto px-6 relative z-10"
            >
                {children}
            </motion.div>
        </section>
    );
}
