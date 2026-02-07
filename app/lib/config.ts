/**
 * Application Configuration
 * Centralized configuration for environment variables and app constants
 */

// Validate required environment variables
const requiredEnvVars = [
    'MONGODB_URI',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
] as const;

for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.warn(`Warning: ${envVar} environment variable is not set`);
    }
}

// Application configuration
export const config = {
    // Database
    database: {
        uri: process.env.MONGODB_URI || '',
    },

    // Authentication
    auth: {
        secret: process.env.NEXTAUTH_SECRET || '',
        url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        },
    },

    // Admin
    admin: {
        signupTokens: process.env.ADMIN_SIGNUP_TOKENS?.split(',') || [],
        whatsappNumber: process.env.ADMIN_WHATSAPP_NUMBER || '+250785657398',
    },

    // Email
    email: {
        resendApiKey: process.env.RESEND_API_KEY || '',
    },

    // Cloudinary
    cloudinary: {
        cloudName: process.env.CLOUD_NAME || '',
        apiKey: process.env.CLOUDINARY_API_KEY || '',
        apiSecret: process.env.CLOUDINARY_API_SECRET || '',
    },

    // Application
    app: {
        currency: process.env.CURRENCY || 'rwf',
        nodeEnv: process.env.NODE_ENV || 'development',
    },
} as const;

// Type-safe config access
export type AppConfig = typeof config;
