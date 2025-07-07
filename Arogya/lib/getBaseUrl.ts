export function getBaseUrl(): string {
  // SSR (Next.js server-side): running inside Docker container
  if (typeof window === "undefined") {
    return process.env.INTERNAL_API_URL || "http://localhost:80";
  }

  // Client-side: browser hitting host
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
}
