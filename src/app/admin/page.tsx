"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function AdminPage() {
    const [apiKey, setApiKey] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSeed = async () => {
        if (!apiKey) {
            setStatus("Please enter the Admin API Key");
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
                setStatus("Success: " + data.message);
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

                <div className="space-y-4">
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

                    <Button
                        onClick={handleSeed}
                        disabled={loading}
                        className="w-full"
                    >
                        {loading ? "Seeding..." : "Seed Database"}
                    </Button>

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
