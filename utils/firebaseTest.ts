// Firebase Auth Test
import { auth } from '../firebaseConfig';

export const testFirebaseAuth = () => {
  console.log('🔥 Testing Firebase Auth Configuration...');
  
  // Test 1: Check if auth is initialized
  if (!auth) {
    console.error('❌ Firebase Auth not initialized');
    return false;
  }
  console.log('✅ Firebase Auth initialized');
  
  // Test 2: Check current user
  const currentUser = auth.currentUser;
  console.log('👤 Current user:', currentUser ? currentUser.uid : 'Not signed in');
  
  // Test 3: Check auth domain
  console.log('🌐 Auth domain:', (auth.app.options as any).authDomain);
  
  // Test 4: Test auth state listener
  const unsubscribe = auth.onAuthStateChanged((user) => {
    console.log('🔄 Auth state changed:', user ? `User: ${user.uid}` : 'No user');
    unsubscribe(); // Remove listener after first call
  });
  
  return true;
};

// Test email verification capabilities
export const testEmailVerification = async () => {
  console.log('📧 Testing Email Verification Capabilities...');
  
  const currentUser = auth.currentUser;
  if (!currentUser) {
    console.log('ℹ️ No user signed in - cannot test email verification');
    return false;
  }
  
  console.log('📧 User email:', currentUser.email);
  console.log('✅ Email verified:', currentUser.emailVerified);
  
  return true;
};
