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
    {
    source: "/register",
    destination: "https://docs.google.com/forms/d/e/1FAIpQLSegXXPLh07SWnrUMq_xB-tZTaLgeegsITC4WhjiMqZtjDL7Dg/viewform?usp=send_form",
    permanent: true,},
    ];
  },
};

module.exports = nextConfig;
