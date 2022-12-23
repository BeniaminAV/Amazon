

const { default: Stripe } = require("stripe");

module.exports = {
  experimental: {
    appDir: false,
  },
  images: {
    domains: ["fakestoreapi.com"],
  },
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
};
