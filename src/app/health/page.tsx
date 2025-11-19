'use client'

import { Card } from "@/components/ui/card";
import { Activity, Server, Database, Cpu, HardDrive, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react'


const Health = () => {
  const navigate = useRouter();
  const [serverInfo, setServerInfo] = useState<any>(null)

  const fetchHealth = async () => {
    try {
      const res = await fetch("/api/health", { cache: "no-store" });
      const data = await res.json();
      setServerInfo(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  if (!serverInfo) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Checking server health...
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
            onClick={() => navigate.push("/")}
            className="mb-4 text-black"
          >
            ← Back to Dashboard
          </Button>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-xl">
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <h1 className="text-4xl font-bol text-gray-600">System Health</h1>
              <p className="text-gray-500">
                Server status and performance metrics
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 border border-accent/20 rounded-full">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-medium">
              System {serverInfo.status}
            </span>
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Server Info */}
          <Card className="p-6 shadow-lg border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Server className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-500">Server</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-400">Uptime</div>
                <div className="text-base font-medium text-black">{serverInfo.uptime}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Version</div>
                <div className="text-base font-medium font-mono text-black">{serverInfo.version}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 ">Environment</div>
                <div className="text-base font-medium capitalize text-black">{serverInfo.environment}</div>
              </div>
            </div>
          </Card>

          {/* CPU Info */}
          <Card className="p-6 shadow-lg border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Cpu className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-500">CPU</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-400">Usage</div>
                <div className="text-2xl font-bold text-black">{serverInfo.cpu.usage}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Cores</div>
                <div className="text-base font-medium text-black">{serverInfo.cpu.cores}</div>
              </div>
            </div>
          </Card>

          {/* Memory Info */}
          <Card className="p-6 shadow-lg border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <HardDrive className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-500">Memory</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-400">Used / Total</div>
                <div className="text-base font-medium text-black">
                  {serverInfo.memory.used} / {serverInfo.memory.total}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-2">Usage</div>
                <div className="w-full bg-red-500 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${serverInfo.memory.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-black mt-1">
                  {serverInfo.memory.percentage}%
                </div>
              </div>
            </div>
          </Card>

          {/* Database Info */}
          <Card className="p-6 shadow-lg border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Database className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-500">Database</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-400">Status</div>
                <div className="text-base text-black font-medium capitalize flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  {serverInfo.database.status}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Connections</div>
                <div className="text-base font-medium text-black">{serverInfo.database.connections}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Response Time</div>
                <div className="text-base font-medium text-black">{serverInfo.database.responseTime}</div>
              </div>
            </div>
          </Card>

          {/* Last Checked */}
          <Card className="p-6 shadow-lg border-border/50 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-500">Last Health Check</h3>
            </div>
            <div className="text-base text-black">
              {new Date(serverInfo.lastChecked).toLocaleString("en-US", {
                dateStyle: "full",
                timeStyle: "long",
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Health;
