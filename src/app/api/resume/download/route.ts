import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { SiteConfig } from "@/models/SiteConfig";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        await connectDB();
        const config = await SiteConfig.findOne();
        let url = config?.resumeUrl || "/resume.pdf";
        
        // Use regex to extract valid URL in case the user typed extra text like "resume link - https://..."
        const urlMatch = url.match(/https?:\/\/[^\s]+/);
        if (urlMatch) {
            url = urlMatch[0];
        }
        
        if (url.startsWith("/")) {
            return NextResponse.redirect(new URL(url, request.url));
        }
        
        return NextResponse.redirect(url);
    } catch (error) {
        console.error("[DOWNLOAD ROUTE] error:", error);
        return NextResponse.redirect(new URL("/resume.pdf", request.url));
    }
}
