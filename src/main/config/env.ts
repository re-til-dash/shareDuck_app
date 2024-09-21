// /config/env.js
const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    apiUrl: "http://localhost:3000/api",
  },
  production: {
    apiUrl: process.env.VITE_BASEAPI_KEY,
  },
  test: {},
};

export default config[env as "development" | "test" | "production"];
