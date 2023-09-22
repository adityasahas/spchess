/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/preferences',
        destination: 'https://forms.gle/Kf9MMamsGefABYLm8',
        permanent: true, 
      },
    ];
  },
};

module.exports = nextConfig;
