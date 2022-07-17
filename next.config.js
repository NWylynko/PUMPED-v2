
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  // compiler: {
  //   styledComponents: true,
  // },
  env: {
    NEXT_PUBLIC_FIREBASE_API_Key: "AIzaSyB5K65ad5R8JDRa4DnFvJOspU9zOWzyj-o",
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "pumped-kicks.firebaseapp.com",
    // NEXT_PUBLIC_FIREBASE_DATABASE_URL: "",
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: "pumped-kicks",
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "pumped-kicks.appspot.com",
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "545027604759",
    NEXT_PUBLIC_FIREBASE_APP_ID: "1:545027604759:web:8927b834f5e53c3f233752",
    // NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: "",
    GOOGLE_APPLICATION_CREDENTIALS: "./service-account.json"
  }
}

module.exports = nextConfig