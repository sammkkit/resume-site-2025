import mongoose, { Schema, Document, Model } from "mongoose";

export interface IExperience extends Document {
    type: "work" | "education";
    role: string;
    company: string;
    period: string;
    description: string[];
    order: number;
}

const ExperienceSchema = new Schema<IExperience>(
    {
        type: { type: String, enum: ["work", "education"], required: true },
        role: { type: String, required: true },
        company: { type: String, required: true },
        period: { type: String, required: true },
        description: [{ type: String }],
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export const Experience: Model<IExperience> =
    mongoose.models.Experience ||
    mongoose.model<IExperience>("Experience", ExperienceSchema);
