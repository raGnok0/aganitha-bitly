"use client"

import UrlShortenForm from "@/components/ShortenForm";
import LinkTable from "@/components/LinkTable";
import { useState } from 'react'

export default function DashboardPage() { 
  const [refreshKey, setRefreshKey] = useState(0); 

  const handleSuccess= ()=> {
    setRefreshKey(prev => prev+1)
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 text-center">
          <p className="text-4xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-gray-500">
            TinyLink doesn't just create 😎links we create memories🔥✨
          </p>
        </div>
        {/* URL Shortener Form */}
        <div className="mb-12 max-w-3xl mx-auto">
          <UrlShortenForm onSuccess={handleSuccess} />
        </div>

        {/* Links Table */}
        <div className="max-w-6xl mx-auto">
          <LinkTable title="Your Shortened Links" key={refreshKey} />
        </div>
      </div>
    </div>
  );
}
