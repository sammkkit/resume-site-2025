import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Project } from "@/models/Project";
import { isAuthenticated, unauthorizedResponse } from "@/lib/auth";

export async function GET() {
    try {
        await connectDB();
        const projects = await Project.find({}).sort({ order: 1 });
        return NextResponse.json(projects);
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
        const body = await request.json();
        const project = await Project.create(body);
        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}

