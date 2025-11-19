'use client'

import LinkTable from "@/components/LinkTable";
import { BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Stats = () => {
  const navigate = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate.push('/')}
            className="mb-4 text-black"
          >
            ← Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-xl">
              <BarChart3 className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-600">All Statistics</h1>
              <p className="text-gray-500">
                Overview of all your shortened links
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-card border border-border/50 rounded-lg p-6 shadow-lg">
              <div className="text-sm text-gray-600 mb-1">Total Links</div>
              {/* <div className="text-3xl font-bold">{totalLinks}</div> */}
            </div>
            <div className="bg-card border border-border/50 rounded-lg p-6 shadow-lg">
              <div className="text-sm text-gray-600 mb-1">Total Clicks</div>
              {/* <div className="text-3xl font-bold">{totalClicks.toLocaleString()}</div> */}
            </div>
          </div>
        </div>

        {/* Links Table */}
        <LinkTable title="All Links Statistics" />
      </div>
    </div>
  );
};

export default Stats;
