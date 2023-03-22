export default {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    ORIGIN: process.env.ORIGIN,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID: process.env.CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.CLIENT_SECRET,
    GOOGLE_OAUTH_REDIRECT_URI: process.env.GOOGLE_OAUTH_REDIRECT_URI,
    SERVER_ROOT_URI: process.env.SERVER_ROOT_URI,
}

// export default {
//     dbName: 'MONGODB_USERNAME',
//     dbPass: 'MONGODB_PASSWORD',
    
//     accessTokenPrivateKey: 'ACCESS_TOKEN_PRIVATE_KEY',
//     accessTokenPublicKey: 'ACCESS_TOKEN_PUBLIC_KEY',
//     refreshTokenPrivateKey: 'REFRESH_TOKEN_PRIVATE_KEY',
//     refreshTokenPublicKey: 'REFRESH_TOKEN_PUBLIC_KEY',
  
//     googleClientId: 'GOOGLE_OAUTH_CLIENT_ID',
//     googleClientSecret: 'GOOGLE_OAUTH_CLIENT_SECRET',
//     googleOauthRedirect: 'GOOGLE_OAUTH_REDIRECT_URL',
//   };
  