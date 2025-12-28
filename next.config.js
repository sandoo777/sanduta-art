/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['ro', 'ru', 'en'],
    defaultLocale: 'ro',
  },
  images: { domains: ['localhost'] },
};
module.exports = nextConfig;
