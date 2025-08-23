// Firebase Auth Debug Script
// Run this in browser console to diagnose Google Auth issues

console.log('🔥 Firebase Auth Debug Starting...');

// Check Firebase configuration
console.log('📋 Firebase Config:');
console.log('Auth Domain:', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
console.log('Project ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID);
console.log('App ID:', import.meta.env.VITE_FIREBASE_APP_ID);

// Check current auth state
import { auth } from './firebaseConfig';
console.log('🔐 Current Auth State:');
console.log('Current User:', auth.currentUser);
console.log('Auth Domain:', auth.app.options.authDomain);

// Check Google provider configuration
import firebase from 'firebase/compat/app';
const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');

console.log('🌐 Google Provider:');
console.log('Scopes:', provider.scopes);
console.log('Custom Parameters:', provider.customParameters);

// Test redirect setup
console.log('🔄 Redirect Test:');
console.log('Current URL:', window.location.href);
console.log('Expected redirect domain:', `https://${import.meta.env.VITE_FIREBASE_AUTH_DOMAIN}`);

// Check for redirect result immediately
auth.getRedirectResult()
  .then((result) => {
    console.log('✅ Redirect Result:', result);
    if (result && result.user) {
      console.log('🎉 User from redirect:', {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        provider: result.user.providerData[0]?.providerId
      });
    } else {
      console.log('⚠️ No redirect result found');
    }
  })
  .catch((error) => {
    console.error('❌ Redirect Error:', error);
  });

// Test auth state changes
const unsubscribe = auth.onAuthStateChanged((user) => {
  console.log('🔄 Auth State Changed:', user ? `User: ${user.uid}` : 'No user');
});

console.log('🔥 Firebase Auth Debug Complete!');
console.log('💡 Try running: auth.signInWithRedirect(provider) to test');
