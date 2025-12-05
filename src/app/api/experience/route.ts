import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Experience } from "@/models/Experience";
import { isAuthenticated, unauthorizedResponse } from "@/lib/auth";

export async function GET() {
    try {
        await connectDB();
        const experience = await Experience.find({}).sort({ order: 1 });
        return NextResponse.json(experience);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch experience" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    if (!isAuthenticated(request)) {
        return unauthorizedResponse();
    }

    try {
        await connectDB();
        const body = await request.json();
        const experience = await Experience.create(body);
        return NextResponse.json(experience, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create experience" }, { status: 500 });
    }
}
