import { NextResponse } from "next/server";
import os from "os";

export async function GET() {
  const uptime = os.uptime();         // seconds
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;

  const cpuLoad = os.loadavg()[0];    // 1 min CPU avg
  const cores = os.cpus().length;

  return NextResponse.json({
    status: "healthy",
    environment: process.env.NODE_ENV,
    version: "1.0.0",
    uptime: `${Math.floor(uptime / 86400)} days, ${Math.floor((uptime % 86400) / 3600)} hours`,
    
    cpu: {
      cores,
      usage: `${Math.floor((cpuLoad / cores) * 100)}%`
    },

    memory: {
      used: `${(usedMem / 1024 / 1024 / 1024).toFixed(2)} GB`,
      total: `${(totalMem / 1024 / 1024 / 1024).toFixed(2)} GB`,
      percentage: Math.round((usedMem / totalMem) * 100),
    },

    database: {
      status: "connected",     // You can replace with real DB ping
      connections: 5,
      responseTime: "20ms",
    },

    lastChecked: new Date().toISOString(),
  });
}
