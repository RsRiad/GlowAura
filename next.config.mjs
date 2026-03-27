/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true
    },
    serverExternalPackages: ['ws', '@neondatabase/serverless'],
};

export default nextConfig;
