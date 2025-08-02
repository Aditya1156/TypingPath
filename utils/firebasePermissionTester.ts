import { auth, db } from '../firebaseConfig';

/**
 * Utility to test Firebase permissions and connection
 * Helps diagnose CLI and Firebase rule issues
 */
export class FirebasePermissionTester {
  
  /**
   * Test basic Firebase Auth connection
   */
  static async testAuthConnection(): Promise<boolean> {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.warn('[Firebase Test] No authenticated user found');
        return false;
      }
      
      // Test token refresh
      await user.getIdToken(true);
      console.log('✅ [Firebase Test] Auth connection successful');
      return true;
    } catch (error) {
      console.error('❌ [Firebase Test] Auth connection failed:', error);
      return false;
    }
  }
  
  /**
   * Test Firestore permissions for current user
   */
  static async testFirestorePermissions(): Promise<{
    canRead: boolean;
    canWrite: boolean;
    errors: string[];
  }> {
    const result = {
      canRead: false,
      canWrite: false,
      errors: [] as string[]
    };
    
    const user = auth.currentUser;
    if (!user) {
      result.errors.push('No authenticated user');
      return result;
    }
    
    try {
      // Test read permissions
      console.log('[Firebase Test] Testing read permissions...');
      await db.collection('users').doc(user.uid).get();
      result.canRead = true;
      console.log('✅ [Firebase Test] Read permissions working');
    } catch (error: any) {
      result.errors.push(`Read failed: ${error.message}`);
      console.error('❌ [Firebase Test] Read permissions failed:', error);
    }
    
    try {
      // Test write permissions
      console.log('[Firebase Test] Testing write permissions...');
      await db.collection('users').doc(user.uid).set({
        lastPermissionTest: new Date().toISOString()
      }, { merge: true });
      result.canWrite = true;
      console.log('✅ [Firebase Test] Write permissions working');
    } catch (error: any) {
      result.errors.push(`Write failed: ${error.message}`);
      console.error('❌ [Firebase Test] Write permissions failed:', error);
    }
    
    return result;
  }
  
  /**
   * Test progress collection permissions
   */
  static async testProgressPermissions(): Promise<boolean> {
    const user = auth.currentUser;
    if (!user) return false;
    
    try {
      // Test progress read/write
      await db.collection('progress').doc(user.uid).set({
        testEntry: { wpm: 1, accuracy: 100, tier: 'test', timestamp: Date.now() }
      }, { merge: true });
      
      await db.collection('progress').doc(user.uid).get();
      console.log('✅ [Firebase Test] Progress permissions working');
      return true;
    } catch (error) {
      console.error('❌ [Firebase Test] Progress permissions failed:', error);
      return false;
    }
  }
  
  /**
   * Run all Firebase tests and return comprehensive report
   */
  static async runAllTests(): Promise<{
    authOk: boolean;
    firestoreRead: boolean;
    firestoreWrite: boolean;
    progressOk: boolean;
    errors: string[];
    recommendations: string[];
  }> {
    console.log('🔍 [Firebase Test] Running comprehensive Firebase permission tests...');
    
    const authOk = await this.testAuthConnection();
    const firestorePerms = await this.testFirestorePermissions();
    const progressOk = await this.testProgressPermissions();
    
    const report = {
      authOk,
      firestoreRead: firestorePerms.canRead,
      firestoreWrite: firestorePerms.canWrite,
      progressOk,
      errors: firestorePerms.errors,
      recommendations: [] as string[]
    };
    
    // Generate recommendations based on test results
    if (!authOk) {
      report.recommendations.push('Sign out and sign back in to refresh authentication');
    }
    
    if (!firestorePerms.canRead) {
      report.recommendations.push('Check Firestore security rules for read permissions');
    }
    
    if (!firestorePerms.canWrite) {
      report.recommendations.push('Check Firestore security rules for write permissions');
      report.recommendations.push('Verify user is properly authenticated');
    }
    
    if (!progressOk) {
      report.recommendations.push('Progress saving may not work - check progress collection rules');
    }
    
    if (report.errors.length > 0) {
      report.recommendations.push('Run "firebase deploy --only firestore:rules" to update security rules');
      report.recommendations.push('Check Firebase Console for any configuration issues');
    }
    
    console.log('📊 [Firebase Test] Test results:', report);
    return report;
  }
}

/**
 * Quick utility function to test permissions and log results
 */
export async function testFirebasePermissions(): Promise<void> {
  const results = await FirebasePermissionTester.runAllTests();
  
  console.group('🔍 Firebase Permission Test Results');
  console.log('Auth Connection:', results.authOk ? '✅' : '❌');
  console.log('Firestore Read:', results.firestoreRead ? '✅' : '❌');
  console.log('Firestore Write:', results.firestoreWrite ? '✅' : '❌');
  console.log('Progress Collection:', results.progressOk ? '✅' : '❌');
  
  if (results.errors.length > 0) {
    console.group('❌ Errors');
    results.errors.forEach(error => console.log('•', error));
    console.groupEnd();
  }
  
  if (results.recommendations.length > 0) {
    console.group('💡 Recommendations');
    results.recommendations.forEach(rec => console.log('•', rec));
    console.groupEnd();
  }
  
  console.groupEnd();
}
