"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";

export default function AdminPage() {
    const [apiKey, setApiKey] = useState("");
    const [resumeUrl, setResumeUrl] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch current resume URL on load
    useEffect(() => {
        fetch("/api/resume")
            .then((res) => res.json())
            .then((data) => {
                if (data.resumeUrl) setResumeUrl(data.resumeUrl);
            })
            .catch((err) => console.error("Failed to load resume URL", err));
    }, []);

    const handleUpdateResume = async () => {
        if (!apiKey) {
            setStatus("Please enter the Admin API Key");
            return;
        }
        if (!resumeUrl) {
            setStatus("Please enter a Resume URL");
            return;
        }

        setLoading(true);
        setStatus("Updating resume...");

        try {
            const res = await fetch("/api/resume", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-key": apiKey,
                },
                body: JSON.stringify({ resumeUrl }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("Success: Resume URL updated!");
            } else {
                setStatus("Error: " + (data.error || "Failed to update"));
            }
        } catch (error) {
            setStatus("Network Error: " + (error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const handleSeed = async () => {
        if (!apiKey) {
            setStatus("Please enter the Admin API Key");
            return;
        }

        if (!confirm("WARNING: This will delete ALL existing data and reset it to defaults. Are you sure?")) {
            return;
        }

        setLoading(true);
        setStatus("Seeding database...");

        try {
            const res = await fetch("/api/seed", {
                method: "GET",
                headers: {
                    "x-admin-key": apiKey,
                },
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("Success: " + (data.message || "Operation completed"));
            } else {
                setStatus("Error: " + (data.error || "Failed to seed"));
            }
        } catch (error) {
            setStatus("Network Error: " + (error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 px-4 flex flex-col items-center justify-center bg-background text-white">
            <div className="max-w-md w-full glass-card p-8 rounded-2xl">
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Panel</h1>

                <div className="space-y-6">
                    {/* API Key Section */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Admin API Key</label>
                        <input
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary transition-colors"
                            placeholder="Enter your secret key"
                        />
                    </div>

                    <div className="h-px bg-white/10 my-4" />

                    {/* Resume Update Section */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Update Resume</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Resume URL</label>
                                <input
                                    type="url"
                                    value={resumeUrl}
                                    onChange={(e) => setResumeUrl(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary transition-colors"
                                    placeholder="https://drive.google.com/..."
                                />
                            </div>
                            <Button
                                onClick={handleUpdateResume}
                                disabled={loading}
                                className="w-full"
                            >
                                {loading ? "Updating..." : "Update Resume URL"}
                            </Button>
                        </div>
                    </div>

                    <div className="h-px bg-white/10 my-4" />

                    {/* Danger Zone */}
                    <div>
                        <h2 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h2>
                        <Button
                            onClick={handleSeed}
                            disabled={loading}
                            variant="outline"
                            className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        >
                            {loading ? "Seeding..." : "Reset Database (Seed)"}
                        </Button>
                    </div>

                    {/* Status Message */}
                    {status && (
                        <div className={`p-4 rounded-lg text-sm ${status.startsWith("Success") ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                            {status}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
