/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: `${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.amazonaws.com`,
                port: '',
            },
        ],
    },
}

module.exports = nextConfig
