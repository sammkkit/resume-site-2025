import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Project } from "@/models/Project";
import { Skill } from "@/models/Skill";
import { Experience } from "@/models/Experience";
import { SiteConfig } from "@/models/SiteConfig";

const initialProjects = [
    {
        title: "RentTrack",
        description: "Fintech-style rent management Android app streamlining tenant onboarding and automating invoice generation.",
        tags: ["Jetpack Compose", "Firebase", "Hilt", "MVVM", "WorkManager"],
        icon: "Smartphone",
        links: [
            { name: "Play Store", href: "https://play.google.com/store/apps/details?id=com.samapp.renttrack", icon: "ExternalLink" },
        ],
        stats: ["98% Crash-free Users", "45% Reduced Missed Payments"],
        order: 1,
    },
    {
        title: "Email Spam Classifier",
        description: "Machine learning web application to classify emails as spam or not spam with 97%+ accuracy.",
        tags: ["Streamlit", "Python", "Scikit-learn", "NLTK", "Pandas"],
        icon: "Brain",
        links: [
            { name: "Live Demo", href: "https://samkits-email-classifier.streamlit.app/", icon: "ExternalLink" },
        ],
        stats: ["97%+ Accuracy", "30% Reduced False Positives"],
        order: 2,
    },
    {
        title: "Camex App",
        description: "AI-powered camera app enabling real-time object and landmark detection using TensorFlow Lite models.",
        tags: ["CameraX", "TensorFlow Lite", "Kotlin"],
        icon: "Camera",
        links: [
            { name: "GitHub", href: "https://github.com/sammkkit/CameraApp", icon: "Github" },
        ],
        stats: ["92% Detection Accuracy", "15% Reduced Storage"],
        order: 3,
    },
];

const initialSkills = [
    {
        category: "Languages",
        icon: "Code2",
        items: ["Java", "Python", "Kotlin", "C++", "JavaScript", "TypeScript", "SQL", "HTML/CSS"],
        order: 1,
    },
    {
        category: "Frameworks & Libraries",
        icon: "Layout",
        items: ["React", "Next.js", "Node.js", "Express.js", "Jetpack Compose", "Flask", "TailwindCSS"],
        order: 2,
    },
    {
        category: "Machine Learning",
        icon: "Cpu",
        items: ["TensorFlow", "Keras", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
        order: 3,
    },
    {
        category: "Tools & Platforms",
        icon: "Terminal",
        items: ["Git", "GitHub", "Docker", "AWS", "Firebase", "MongoDB", "Postman", "Android Studio"],
        order: 4,
    },
    {
        category: "CS Fundamentals",
        icon: "Database",
        items: ["Data Structures", "Algorithms", "OOP", "DBMS", "OS", "Computer Networks"],
        order: 5,
    },
];

const initialExperience = [
    {
        type: "work",
        role: "App Development Intern",
        company: "TheCarePal",
        period: "July 2025 – August 2025",
        description: [
            "Architected and delivered a production-ready Android app in Jetpack Compose from scratch.",
            "Achieved full feature parity with iOS version and accelerated cross-platform release timelines by 25%.",
            "Revamped onboarding flow using Firebase analytics, decreasing churn by 12%.",
            "Integrated real-time pedometer tracking, nurse booking, and medication reminders.",
        ],
        order: 1,
    },
    {
        type: "work",
        role: "CP Team Member",
        company: "Codame Student Club, IIIT Bhopal",
        period: "December 2024 – July 2025",
        description: [
            "Ranked among top 15 competitive programmers at IIIT Bhopal.",
            "Directed planning and execution of three campus-wide coding events (110+ participants).",
            "Improved weekly participation in club contests by 40% through peer mentorship.",
        ],
        order: 2,
    },
    {
        type: "education",
        role: "B. Tech – Information Technology",
        company: "Indian Institute of Information Technology, Bhopal",
        period: "July 2023 – August 2027",
        description: [
            "CGPA: 8.9",
            "Relevant Coursework: Data Structures & Algorithms, OOP, DBMS.",
        ],
        order: 3,
    },
];

export async function GET() {
    try {
        await connectDB();

        // Clear existing data
        await Project.deleteMany({});
        await Skill.deleteMany({});
        await Experience.deleteMany({});
        await SiteConfig.deleteMany({});

        // Seed new data
        await Project.insertMany(initialProjects);
        await Skill.insertMany(initialSkills);
        await Experience.insertMany(initialExperience);

        // Seed initial resume URL
        await SiteConfig.create({
            resumeUrl: "/resume.pdf" // Default value
        });

        return NextResponse.json({ message: "Database seeded successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
    }
}
