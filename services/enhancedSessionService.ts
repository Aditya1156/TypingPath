import firebase from "firebase/compat/app";
import { auth } from '../firebaseConfig';

export interface SessionConfig {
  rememberMe: boolean;
  sessionDuration: number; // in days
  autoLogin: boolean;
  trustedDevice: boolean;
}

export interface SessionData {
  userId: string;
  email: string;
  displayName: string | null;
  loginTime: number;
  expiresAt: number;
  deviceFingerprint: string;
  sessionId: string;
  lastActivity: number;
}

export interface DeviceInfo {
  fingerprint: string;
  userAgent: string;
  trusted: boolean;
  firstSeen: number;
  lastUsed: number;
  nickname?: string;
}

class EnhancedSessionService {
  private readonly STORAGE_KEYS = {
    SESSION_DATA: 'typer_session_data',
    SESSION_CONFIG: 'typer_session_config', 
    TRUSTED_DEVICES: 'typer_trusted_devices',
    LAST_ACTIVITY: 'typer_last_activity'
  };

  private readonly DEFAULT_CONFIG: SessionConfig = {
    rememberMe: false,
    sessionDuration: 7, // 7 days default
    autoLogin: false, // Changed to false - no automatic login
    trustedDevice: false
  };

  private activityTimer: NodeJS.Timeout | null = null;
  private sessionWarningTimer: NodeJS.Timeout | null = null;

  constructor() {
    this.initializeSessionTracking();
    this.setupActivityTracking();
  }

  /**
   * Initialize Firebase Auth persistence and session tracking
   */
  async initializeSessionTracking(): Promise<void> {
    try {
      // Set Firebase persistence to LOCAL (survives browser restarts)
      await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      
      // Validate existing session on startup
      await this.validateExistingSession();
      
      console.log('Enhanced session tracking initialized');
    } catch (error) {
      console.error('Failed to initialize session tracking:', error);
    }
  }

  /**
   * Enhanced sign-in with session configuration
   */
  async signInWithRemember(
    email: string, 
    password: string, 
    config: Partial<SessionConfig> = {}
  ): Promise<firebase.User> {
    const sessionConfig = { ...this.DEFAULT_CONFIG, ...config };
    
    try {
      // Set appropriate persistence based on "remember me"
      const persistence = sessionConfig.rememberMe 
        ? firebase.auth.Auth.Persistence.LOCAL 
        : firebase.auth.Auth.Persistence.SESSION;
      
      await auth.setPersistence(persistence);
      
      // Sign in
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user!;
      
      // Create session data
      await this.createSession(user, sessionConfig);
      
      return user;
    } catch (error) {
      console.error('Enhanced sign-in failed:', error);
      throw error;
    }
  }

  /**
   * Create and store session data
   */
  async createSession(user: firebase.User, config: SessionConfig): Promise<void> {
    const now = Date.now();
    const expiresAt = now + (config.sessionDuration * 24 * 60 * 60 * 1000); // Convert days to ms
    const deviceFingerprint = this.generateDeviceFingerprint();
    
    const sessionData: SessionData = {
      userId: user.uid,
      email: user.email || '',
      displayName: user.displayName,
      loginTime: now,
      expiresAt,
      deviceFingerprint,
      sessionId: this.generateSessionId(),
      lastActivity: now
    };

    // Store session data
    this.setSecureItem(this.STORAGE_KEYS.SESSION_DATA, sessionData);
    this.setSecureItem(this.STORAGE_KEYS.SESSION_CONFIG, config);
    
    // Track device if trusted
    if (config.trustedDevice) {
      await this.addTrustedDevice(deviceFingerprint);
    }
    
    // Start session monitoring
    this.startSessionMonitoring(expiresAt);
    
    console.log(`Session created for ${user.email}, expires in ${config.sessionDuration} days`);
  }

  /**
   * Validate existing session on app startup
   */
  async validateExistingSession(): Promise<boolean> {
    const sessionData = this.getSecureItem<SessionData>(this.STORAGE_KEYS.SESSION_DATA);
    const sessionConfig = this.getSecureItem<SessionConfig>(this.STORAGE_KEYS.SESSION_CONFIG);
    
    if (!sessionData || !sessionConfig) {
      return false;
    }

    const now = Date.now();
    
    // Check if session has expired
    if (now > sessionData.expiresAt) {
      console.log('Session expired, cleaning up');
      await this.clearSession();
      return false;
    }

    // Check device fingerprint for security
    const currentFingerprint = this.generateDeviceFingerprint();
    if (currentFingerprint !== sessionData.deviceFingerprint && !sessionConfig.trustedDevice) {
      console.log('Device fingerprint mismatch, clearing session');
      await this.clearSession();
      return false;
    }

    // Update last activity
    sessionData.lastActivity = now;
    this.setSecureItem(this.STORAGE_KEYS.SESSION_DATA, sessionData);
    
    // Restart session monitoring
    this.startSessionMonitoring(sessionData.expiresAt);
    
    console.log('Session validated successfully');
    return true;
  }

  /**
   * Update session configuration
   */
  async updateSessionConfig(updates: Partial<SessionConfig>): Promise<void> {
    const currentConfig = this.getSecureItem<SessionConfig>(this.STORAGE_KEYS.SESSION_CONFIG) || this.DEFAULT_CONFIG;
    const newConfig = { ...currentConfig, ...updates };
    
    this.setSecureItem(this.STORAGE_KEYS.SESSION_CONFIG, newConfig);
    
    // If session duration changed, update expiration
    if (updates.sessionDuration) {
      const sessionData = this.getSecureItem<SessionData>(this.STORAGE_KEYS.SESSION_DATA);
      if (sessionData) {
        const now = Date.now();
        sessionData.expiresAt = now + (newConfig.sessionDuration * 24 * 60 * 60 * 1000);
        this.setSecureItem(this.STORAGE_KEYS.SESSION_DATA, sessionData);
        this.startSessionMonitoring(sessionData.expiresAt);
      }
    }
  }

  /**
   * Get current session configuration
   */
  getSessionConfig(): SessionConfig {
    return this.getSecureItem<SessionConfig>(this.STORAGE_KEYS.SESSION_CONFIG) || this.DEFAULT_CONFIG;
  }

  /**
   * Get current session data
   */
  getSessionData(): SessionData | null {
    return this.getSecureItem<SessionData>(this.STORAGE_KEYS.SESSION_DATA);
  }

  /**
   * Check if current device is trusted
   */
  isDeviceTrusted(): boolean {
    const fingerprint = this.generateDeviceFingerprint();
    const trustedDevices = this.getTrustedDevices();
    return trustedDevices.some(device => device.fingerprint === fingerprint && device.trusted);
  }

  /**
   * Add current device as trusted
   */
  async addTrustedDevice(fingerprint?: string): Promise<void> {
    const deviceFingerprint = fingerprint || this.generateDeviceFingerprint();
    const trustedDevices = this.getTrustedDevices();
    
    const existingDevice = trustedDevices.find(d => d.fingerprint === deviceFingerprint);
    
    if (existingDevice) {
      existingDevice.trusted = true;
      existingDevice.lastUsed = Date.now();
    } else {
      const newDevice: DeviceInfo = {
        fingerprint: deviceFingerprint,
        userAgent: navigator.userAgent,
        trusted: true,
        firstSeen: Date.now(),
        lastUsed: Date.now(),
        nickname: this.generateDeviceNickname()
      };
      trustedDevices.push(newDevice);
    }
    
    this.setSecureItem(this.STORAGE_KEYS.TRUSTED_DEVICES, trustedDevices);
  }

  /**
   * Remove trusted device
   */
  async removeTrustedDevice(fingerprint: string): Promise<void> {
    const trustedDevices = this.getTrustedDevices();
    const filtered = trustedDevices.filter(d => d.fingerprint !== fingerprint);
    this.setSecureItem(this.STORAGE_KEYS.TRUSTED_DEVICES, filtered);
  }

  /**
   * Get all trusted devices
   */
  getTrustedDevices(): DeviceInfo[] {
    return this.getSecureItem<DeviceInfo[]>(this.STORAGE_KEYS.TRUSTED_DEVICES) || [];
  }

  /**
   * Clear session and logout
   */
  async clearSession(): Promise<void> {
    try {
      // Clear stored session data
      localStorage.removeItem(this.STORAGE_KEYS.SESSION_DATA);
      localStorage.removeItem(this.STORAGE_KEYS.SESSION_CONFIG);
      localStorage.removeItem(this.STORAGE_KEYS.LAST_ACTIVITY);
      
      // Clear timers
      if (this.activityTimer) {
        clearTimeout(this.activityTimer);
        this.activityTimer = null;
      }
      
      if (this.sessionWarningTimer) {
        clearTimeout(this.sessionWarningTimer);
        this.sessionWarningTimer = null;
      }
      
      // Sign out from Firebase
      await auth.signOut();
      
      console.log('Session cleared successfully');
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  }

  /**
   * Setup activity tracking
   */
  private setupActivityTracking(): void {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const updateActivity = () => {
      const sessionData = this.getSecureItem<SessionData>(this.STORAGE_KEYS.SESSION_DATA);
      if (sessionData) {
        sessionData.lastActivity = Date.now();
        this.setSecureItem(this.STORAGE_KEYS.SESSION_DATA, sessionData);
      }
    };

    // Throttled activity update (max once per minute)
    let lastUpdate = 0;
    const throttledUpdate = () => {
      const now = Date.now();
      if (now - lastUpdate > 60000) { // 1 minute
        updateActivity();
        lastUpdate = now;
      }
    };

    events.forEach(event => {
      document.addEventListener(event, throttledUpdate, true);
    });
  }

  /**
   * Start session monitoring with warnings
   */
  private startSessionMonitoring(expiresAt: number): void {
    // Clear existing timers
    if (this.sessionWarningTimer) {
      clearTimeout(this.sessionWarningTimer);
    }

    const now = Date.now();
    const timeToExpiry = expiresAt - now;
    
    // Set warning 30 minutes before expiry
    const warningTime = timeToExpiry - (30 * 60 * 1000);
    
    if (warningTime > 0) {
      this.sessionWarningTimer = setTimeout(() => {
        this.showSessionWarning();
      }, warningTime);
    }
  }

  /**
   * Show session expiration warning
   */
  private showSessionWarning(): void {
    const event = new CustomEvent('sessionWarning', {
      detail: {
        message: 'Your session will expire in 30 minutes. Click to extend.',
        action: () => this.extendSession()
      }
    });
    window.dispatchEvent(event);
  }

  /**
   * Extend current session
   */
  async extendSession(): Promise<void> {
    const sessionData = this.getSecureItem<SessionData>(this.STORAGE_KEYS.SESSION_DATA);
    const sessionConfig = this.getSessionConfig();
    
    if (sessionData) {
      const now = Date.now();
      sessionData.expiresAt = now + (sessionConfig.sessionDuration * 24 * 60 * 60 * 1000);
      sessionData.lastActivity = now;
      
      this.setSecureItem(this.STORAGE_KEYS.SESSION_DATA, sessionData);
      this.startSessionMonitoring(sessionData.expiresAt);
      
      console.log('Session extended successfully');
    }
  }

  /**
   * Generate device fingerprint for security
   */
  private generateDeviceFingerprint(): string {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx?.fillText('fingerprint', 2, 2);
    
    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset(),
      canvas.toDataURL()
    ].join('|');
    
    return btoa(fingerprint).slice(0, 32);
  }

  /**
   * Generate session ID
   */
  private generateSessionId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Generate device nickname
   */
  private generateDeviceNickname(): string {
    const ua = navigator.userAgent;
    if (ua.includes('Chrome')) return 'Chrome Browser';
    if (ua.includes('Firefox')) return 'Firefox Browser';
    if (ua.includes('Safari')) return 'Safari Browser';
    if (ua.includes('Edge')) return 'Edge Browser';
    return 'Unknown Browser';
  }

  /**
   * Secure localStorage helpers
   */
  private setSecureItem<T>(key: string, value: T): void {
    try {
      const encrypted = btoa(JSON.stringify({
        data: value,
        timestamp: Date.now()
      }));
      localStorage.setItem(key, encrypted);
    } catch (error) {
      console.error('Failed to store secure item:', error);
    }
  }

  private getSecureItem<T>(key: string): T | null {
    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;
      
      const decrypted = JSON.parse(atob(encrypted));
      return decrypted.data as T;
    } catch (error) {
      console.error('Failed to retrieve secure item:', error);
      return null;
    }
  }
}

// Create singleton instance
export const enhancedSessionService = new EnhancedSessionService();

export default EnhancedSessionService;
