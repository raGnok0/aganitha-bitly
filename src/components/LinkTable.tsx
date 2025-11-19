'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, ExternalLink, Copy } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Link {
  code: string;
  url: string;
  clicks: number;
  lastClicked: string | null;
}

interface LinkTableProps {
  title?: string;
}

export default function LinkTable({ title = "Your Links" }: LinkTableProps) {

  const [links, setLinks] = useState<Link[]>([])
  const router = useRouter()

  const fetchLinks = async () => {
    try {
      const res = await fetch('/api/links', { cache: "no-store" })
      const data = await res.json()
      setLinks(data)
    } catch (err) {
      toast.error
    }
  }

  useEffect(() => {
    fetchLinks()
  }, [])

  const handleCopy = (code: string) => {
    const shortUrl = `${window.location.origin}/${code}`;
    navigator.clipboard.writeText(shortUrl);
    toast.success("Short URL copied to clipboard!");
  };

  const handleDelete = async (code: string) => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      try {
        const res = await fetch(`/api/links/${code}`, {
          method: "DELETE"
        })

        if (!res.ok) {
          toast.error("Failed to delete")
          return;
        }

        await fetchLinks();

        toast.success("Link deleted successfully");

      } catch (err) {
        toast.error("Something went wrong!")
      }
    }
  };

  if (links.length === 0) {
    return (
      <Card className="p-8 text-center shadow-lg border-border/50">
        <div className="flex flex-col items-center gap-3">
          <ExternalLink className="h-12 w-12 text-muted-foreground" />
          <h3 className="text-xl font-semibold">No links yet</h3>
          <p className="text-muted-foreground">
            Create your first shortened URL to get started
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-border/50 overflow-hidden bg-gray-20">
      <div className="p-6 border-b border-border/50 bg-muted/30">
        <h2 className="text-2xl font-bold text-gray-700">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-muted/50 text-gray-500">
              <TableHead className="font-semibold">Short Code</TableHead>
              <TableHead className="font-semibold">Target URL</TableHead>
              <TableHead className="font-semibold text-center">Clicks</TableHead>
              <TableHead className="font-semibold">Last Clicked</TableHead>
              <TableHead className="font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {links.map((link) => (
              <TableRow key={link.code} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-mono font-medium text-primary">
                  <div className="flex items-center gap-2 text-blue-500">
                    {link.code}
                    <Button
                      variant="default"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleCopy(link.code)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="max-w-md truncate">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-400 transition-colors flex items-center gap-1"
                  >
                    {link.url}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </TableCell>
                <TableCell className="text-center font-semibold text-black">
                  <Button
                    variant="default"
                    size="icon"
                    onClick={() => router.push(`/stats/${link.code}`)}
                    className="text-destructive hover:text-destructive hover:bg-blue-300"
                  >
                    {link.clicks.toLocaleString()}
                  </Button>
                </TableCell>
                <TableCell className="text-gray-700">
                  {link.lastClicked
                    ? new Date(link.lastClicked).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                    : "Never"}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="default"
                    size="icon"
                    onClick={() => handleDelete(link.code)}
                    className="text-destructive hover:text-destructive bg-blue-500 hover:bg-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card >
  );
};
