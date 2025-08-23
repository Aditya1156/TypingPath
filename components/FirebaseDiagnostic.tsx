import { useState } from 'react';
import { auth } from '../firebaseConfig';

const FirebaseDiagnostic = () => {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const runDiagnostics = async () => {
    setIsLoading(true);
    setTestResults([]);
    
    addResult('🔥 Starting Firebase diagnostics...');

    // Test 1: Check Firebase initialization
    try {
      if (auth) {
        addResult('✅ Firebase Auth initialized successfully');
        const options = auth.app.options as any;
        addResult(`📍 Auth domain: ${options.authDomain}`);
        addResult(`🔑 API key: ${options.apiKey?.substring(0, 10)}...`);
      } else {
        addResult('❌ Firebase Auth not initialized');
      }
    } catch (error: any) {
      addResult(`❌ Firebase init error: ${error.message}`);
    }

    // Test 2: Check environment variables
    const envVars = [
      'VITE_FIREBASE_API_KEY',
      'VITE_FIREBASE_AUTH_DOMAIN',
      'VITE_FIREBASE_PROJECT_ID'
    ];
    
    envVars.forEach(varName => {
      const value = import.meta.env[varName];
      if (value) {
        addResult(`✅ ${varName}: ${value.substring(0, 10)}...`);
      } else {
        addResult(`❌ Missing: ${varName}`);
      }
    });

    // Test 3: Test email provider availability
    try {
      const providers = await auth.fetchSignInMethodsForEmail('test@example.com');
      addResult(`✅ Email provider check: ${providers.length} methods available`);
    } catch (error: any) {
      if (error.code === 'auth/invalid-email') {
        addResult('✅ Email provider available (invalid email expected)');
      } else {
        addResult(`❌ Email provider error: ${error.code} - ${error.message}`);
      }
    }

    // Test 4: Test user creation (will fail but shows detailed error)
    try {
      await auth.createUserWithEmailAndPassword('test@example.com', 'password123');
      addResult('⚠️ Unexpected: Test user creation succeeded');
    } catch (error: any) {
      if (error.code === 'auth/invalid-email') {
        addResult('✅ User creation endpoint available (invalid email expected)');
      } else if (error.code === 'auth/operation-not-allowed') {
        addResult('❌ CRITICAL: Email/Password authentication not enabled in Firebase Console');
      } else if (error.code === 'auth/weak-password') {
        addResult('✅ User creation endpoint available (weak password expected)');
      } else {
        addResult(`❌ User creation error: ${error.code} - ${error.message}`);
      }
    }

    // Test 5: Check current auth state
    const currentUser = auth.currentUser;
    if (currentUser) {
      addResult(`👤 Current user: ${currentUser.uid} (${currentUser.email})`);
      addResult(`📧 Email verified: ${currentUser.emailVerified}`);
    } else {
      addResult('👤 No current user (expected for diagnostic)');
    }

    addResult('🏁 Diagnostics complete');
    setIsLoading(false);
  };

  return (
    <div className="fixed top-4 right-4 bg-secondary border border-border-primary rounded-lg p-4 max-w-md z-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-text-primary">Firebase Diagnostic</h3>
        <button
          onClick={runDiagnostics}
          disabled={isLoading}
          className="px-3 py-1 bg-accent text-primary text-sm rounded hover:bg-accent/90 disabled:opacity-50"
        >
          {isLoading ? 'Testing...' : 'Run Test'}
        </button>
      </div>
      
      <div className="bg-tertiary rounded p-3 max-h-64 overflow-y-auto">
        {testResults.length === 0 ? (
          <p className="text-text-secondary text-sm">Click "Run Test" to diagnose Firebase setup</p>
        ) : (
          testResults.map((result, index) => (
            <div key={index} className="text-xs font-mono mb-1 text-text-primary">
              {result}
            </div>
          ))
        )}
      </div>
      
      {testResults.some(r => r.includes('❌ CRITICAL')) && (
        <div className="mt-3 p-2 bg-danger/20 border border-danger/30 rounded text-xs text-danger">
          <strong>Action Required:</strong> Enable Email/Password authentication in Firebase Console
        </div>
      )}
    </div>
  );
};

export default FirebaseDiagnostic;
