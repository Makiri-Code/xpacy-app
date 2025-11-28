/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "app.xpacy.com",
        port: "",
        pathname: "/src/upload/properties/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
// module.exports = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "app.xpacy.com",
//         port: "",
//         pathname: "/src/upload/homepage_slider/**",
//       },
//     ],
//   },
// };
