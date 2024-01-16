/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        disableStaticImages: true,
        domains: [
            "avatars.githubusercontent.com"
        ],
    },
}

module.exports = nextConfig
