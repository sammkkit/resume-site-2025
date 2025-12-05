
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { SiteConfig } from "@/models/SiteConfig";
import { isAuthenticated, unauthorizedResponse } from "@/lib/auth";

export async function GET() {
    try {
        await connectDB();
        const config = await SiteConfig.findOne();
        // Default to a placeholder if not found
        return NextResponse.json({
            resumeUrl: config?.resumeUrl || "/resume.pdf"
        });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    if (!isAuthenticated(request)) {
        return unauthorizedResponse();
    }

    try {
        await connectDB();
        const { resumeUrl } = await request.json();

        // Update the existing config or create a new one (upsert)
        const config = await SiteConfig.findOneAndUpdate(
            {},
            { resumeUrl },
            { upsert: true, new: true }
        );

        return NextResponse.json(config, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update resume URL" }, { status: 500 });
    }
}

