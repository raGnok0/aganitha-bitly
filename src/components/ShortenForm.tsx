'use client'

import { useState } from "react";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { Link2, Loader2 } from "lucide-react";

interface UrlShortenerFormProps {
  onSuccess?: () => void;
}

export default function UrlShortenForm({ onSuccess }: UrlShortenerFormProps) {
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url) {
      toast.error("Please enter a URL");
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      await fetch("/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          customCode,
        }),
      })

      toast.success("URL shortened successfully!");
      setUrl("");
      setCustomCode("");
      onSuccess?.();
    } catch (error) {
      toast.error("Failed to shorten URL");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 shadow-lg border-border/50">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="url" className="text-base font-medium text-gray-600">
            Enter your long URL
          </Label>
          <div className="relative">
            <Input
              id="url"
              type="url"
              placeholder="https://example.com/very/long/url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="h-12 text-base  text-black"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="customCode" className="text-base font-medium text-gray-600">
            Custom short code (optional)
          </Label>
          <Input
            id="customCode"
            type="text"
            placeholder="my-custom-link"
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            className="h-12 text-base text-black"
          />
          <p className="text-sm text-gray-500">
            Leave empty for a random short code
          </p>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 text-base font-medium bg-blue-500"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Shortening...
            </>
          ) : (
            <>
              <Link2 className="mr-2 h-5 w-5" />
              Shorten URL
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};
