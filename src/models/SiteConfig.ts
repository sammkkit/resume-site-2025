import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISiteConfig extends Document {
    resumeUrl: string;
}

const SiteConfigSchema = new Schema<ISiteConfig>(
    {
        resumeUrl: { type: String, required: true },
    },
    { timestamps: true }
);

// Singleton pattern: We'll only ever have one document in this collection
export const SiteConfig: Model<ISiteConfig> =
    mongoose.models.SiteConfig || mongoose.model<ISiteConfig>("SiteConfig", SiteConfigSchema);
