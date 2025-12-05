import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Skill } from "@/models/Skill";
import { isAuthenticated, unauthorizedResponse } from "@/lib/auth";

export async function GET() {
    try {
        await connectDB();
        const skills = await Skill.find({}).sort({ order: 1 });
        return NextResponse.json(skills);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    if (!isAuthenticated(request)) {
        return unauthorizedResponse();
    }

    try {
        await connectDB();
        const body = await request.json();
        const skill = await Skill.create(body);
        return NextResponse.json(skill, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create skill" }, { status: 500 });
    }
}

