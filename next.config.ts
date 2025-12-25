import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_KEYGEN_API_URL:
      process.env.NEXT_PUBLIC_KEYGEN_API_URL ?? process.env.KEYGEN_API_URL,
    NEXT_PUBLIC_KEYGEN_ACCOUNT_ID:
      process.env.NEXT_PUBLIC_KEYGEN_ACCOUNT_ID ?? process.env.KEYGEN_ACCOUNT_ID,
  },
}

export default nextConfig
