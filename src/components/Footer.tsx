import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-surface border-t border-white/10 py-12">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold font-heading text-white">Samkit Jain</h3>
                    <p className="text-gray-400 text-sm mt-2">
                        Building digital experiences that matter.
                    </p>
                </div>

                <div className="flex gap-6">
                    <a
                        href="https://github.com/samkitjain"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-primary transition-colors"
                    >
                        <Github size={20} />
                    </a>
                    <a
                        href="https://linkedin.com/in/samkitjain"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-secondary transition-colors"
                    >
                        <Linkedin size={20} />
                    </a>
                    <a
                        href="mailto:samkitjain430@gmail.com"
                        className="text-gray-400 hover:text-accent transition-colors"
                    >
                        <Mail size={20} />
                    </a>
                </div>

                <div className="text-gray-500 text-sm">
                    © {new Date().getFullYear()} Samkit Jain. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
