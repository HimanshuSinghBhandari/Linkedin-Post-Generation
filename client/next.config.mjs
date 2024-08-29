/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['picsum.photos'],  
      remotePatterns:[
        {
            protocol:'https',
            hostname:'lh3.googleusercontent.com',

        }
      ]
    },
  };
  
  export default nextConfig;
  