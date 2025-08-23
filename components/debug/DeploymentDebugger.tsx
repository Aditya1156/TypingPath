const DeploymentDebugger = () => {
  const handleTestAuth = async () => {
    try {
      console.log('🔍 Testing Google Auth...');
      // Test if the auth service is working
      const { authService } = await import('../../services/authService');
      await authService.signInWithGoogle();
    } catch (error: any) {
      console.error('❌ Auth test failed:', error);
      alert(`Auth Error: ${error.message}`);
    }
  };

  const handleCheckEnvironment = () => {
    const envInfo = {
      hostname: window.location.hostname,
      origin: window.location.origin,
      protocol: window.location.protocol,
      userAgent: navigator.userAgent,
      firebaseConfig: {
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? 'SET' : 'MISSING'
      }
    };
    
    console.log('🔍 Environment Info:', envInfo);
    alert(`Check console for environment info. Domain: ${envInfo.hostname}`);
  };

  // Only show on non-localhost environments
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-red-600 text-white p-3 rounded-lg shadow-lg z-50 text-sm">
      <div className="font-bold mb-2">🔧 Deployment Debug</div>
      <div className="space-y-2">
        <button 
          onClick={handleCheckEnvironment}
          className="block w-full px-2 py-1 bg-blue-600 rounded text-xs hover:bg-blue-700"
        >
          Check Environment
        </button>
        <button 
          onClick={handleTestAuth}
          className="block w-full px-2 py-1 bg-green-600 rounded text-xs hover:bg-green-700"
        >
          Test Google Auth
        </button>
        <div className="text-xs text-gray-300">
          Domain: {window.location.hostname}
        </div>
      </div>
    </div>
  );
};

export default DeploymentDebugger;
