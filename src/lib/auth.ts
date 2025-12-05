import { NextResponse } from "next/server";

export function isAuthenticated(request: Request): boolean {
    const apiKey = request.headers.get("x-admin-key");
    const validApiKey = process.env.ADMIN_API_KEY;

    // If no API key is set in env, we default to blocking everything for security
    // or you could allow it for dev, but better to be safe.
    if (!validApiKey) {
        console.warn("ADMIN_API_KEY is not set in environment variables.");
        return false;
    }

    return apiKey === validApiKey;
}

export function unauthorizedResponse() {
    return NextResponse.json(
        { error: "Unauthorized. Invalid or missing API key." },
        { status: 401 }
    );
}
