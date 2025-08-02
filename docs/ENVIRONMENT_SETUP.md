# 🔐 Environment Variables Setup Guide

This guide explains how to set up environment variables for TypingPath development and deployment.

## 📋 Required Environment Variables

### 🤖 Gemini AI (Required for AI features)
```bash
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```
**How to get:** Visit [Google AI Studio](https://aistudio.google.com/app/apikey) and create a new API key.

### 🔥 Firebase Configuration (Required for authentication and database)
```bash
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```
**How to get:** 
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings > General > Your apps
4. Scroll down to "Firebase SDK snippet" and select "Config"

## 🚀 Setup Instructions

### For Local Development
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your actual API keys in `.env.local`

3. **Never commit `.env.local` to git** - it's already in `.gitignore`

### For Production Deployment

#### Vercel
1. Go to your project dashboard on Vercel
2. Navigate to Settings > Environment Variables
3. Add each variable with its corresponding value
4. Redeploy your application

#### Netlify
1. Go to your site dashboard on Netlify
2. Navigate to Site settings > Environment variables
3. Add each variable with its corresponding value
4. Trigger a new deployment

#### Other Platforms
Consult your hosting platform's documentation for setting environment variables.

## ⚠️ Security Best Practices

1. **Never commit API keys to git**
2. **Use different API keys for development and production**
3. **Rotate API keys regularly**
4. **Restrict API key permissions where possible**
5. **Monitor API key usage**

## 🔍 Troubleshooting

### "Firebase configuration incomplete" Error
This error means one or more required Firebase environment variables are missing. Check that all `VITE_FIREBASE_*` variables are set.

### API Key Not Working
1. Verify the API key is correctly copied (no extra spaces)
2. Check that the API key has the correct permissions
3. Ensure the API key is for the correct project/service

### Development vs Production Issues
Make sure you're using the correct environment variables for each environment. Development and production should use separate Firebase projects when possible.

## 📞 Support

If you encounter issues with environment setup, check:
1. This documentation
2. The `.env.example` file for the latest variable names
3. Firebase/Google AI Studio documentation for API key setup

---

🔒 **Remember: Keep your API keys secure and never share them publicly!**
