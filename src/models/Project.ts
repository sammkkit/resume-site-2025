import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
    title: string;
    description: string;
    tags: string[];
    icon: string; // We'll store the icon name (e.g., "Smartphone")
    links: {
        name: string;
        href: string;
        icon: string; // Icon name
    }[];
    stats: string[];
    order: number;
}

const ProjectSchema = new Schema<IProject>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        tags: [{ type: String }],
        icon: { type: String, default: "Code" },
        links: [
            {
                name: { type: String, required: true },
                href: { type: String, required: true },
                icon: { type: String, default: "ExternalLink" },
            },
        ],
        stats: [{ type: String }],
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export const Project: Model<IProject> =
    mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
