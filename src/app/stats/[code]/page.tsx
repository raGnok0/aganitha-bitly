'use client'

import { useRouter, useParams } from "next/navigation";
import { BarChart3, TrendingUp, MousePointerClick, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState, } from 'react'
import { toast } from "sonner";

interface Link {
    code: string;
    url: string;
    clicks: number;
    createdAt: string,
    lastClicked: string | null;
}

const SingleStats = () => {
    const { code } = useParams();
    const [link, setLink] = useState<Link | null>(null)
    const navigate = useRouter();

    const fetchLinks = async () => {
        try {
            const res = await fetch(`/api/links/${code}`, { cache: "no-store" })
            const data = await res.json()
            setLink(data)
        } catch (err) {
            toast.error
        }
    }

    useEffect(() => {
        fetchLinks()
    }, [])

    if (!link) {
        return (
            <div className="p-8 text-center text-muted-foreground">
                Loading stats...
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => navigate.push("/stats")}
                        className="mb-4 text-black"
                    >
                        ← Back to All Stats
                    </Button>

                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-xl">
                            <BarChart3 className="h-8 w-8 text-blue-500" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-gray-600">Link Statistics</h1>
                            <p className="text-gray-500">
                                Detailed analytics for{" "}
                                <span className="font-mono text-gray-600 font-bold">
                                    {link.code}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <Card className="p-6 shadow-lg border-border/50">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <MousePointerClick className="h-5 w-5 text-blue-500" />
                                </div>
                                <div className="text-sm text-gray-500">Total Clicks</div>
                            </div>
                            <div className="text-3xl text-gray-700 font-bold">{link.clicks.toLocaleString()}</div>
                        </Card>

                        <Card className="p-6 shadow-lg border-border/50">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-accent/10 rounded-lg">
                                    <Calendar className="h-5 w-5 text-blue-500" />
                                </div>
                                <div className="text-sm text-gray-500">Last Clicked</div>
                            </div>
                            <div className="text-lg text-gray-700 font-semibold">
                                {link.lastClicked
                                    ? new Date(link.lastClicked).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })
                                    : "Never"}
                            </div>
                        </Card>

                        <Card className="p-6 shadow-lg border-border/50">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-accent/10 rounded-lg">
                                    <TrendingUp className="h-5 w-5 text-blue-500" />
                                </div>
                                <div className="text-sm text-gray-500">Average Daily</div>
                            </div>
                            <div className="text-3xl text-gray-700 font-bold">
                                {Math.round(link.clicks / 30).toLocaleString()}
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Link Details Table */}
                {/* <LinkTable title="Link Details" /> */}
            </div>
        </div>
    );
};

export default SingleStats;
