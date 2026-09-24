// Client-side authentication utility for personal-use access control

export const ALLOWED_EMAIL = 'bmahaswettha@gmail.com';

const SESSION_STORAGE_KEY = 'striver_tracker_auth_session';

// Precomputed SHA-256 digest for credential verification
const AUTH_PASSWORD_HASH = '9da96299cf17668385c62ce197372a016d431ba33bfd367fd6fa834fbc915382';

/**
 * Hash a string using SHA-256 with Web Crypto API
 */
export async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Verify login credentials (email and password hash)
 */
export async function verifyCredentials(email: string, password: string): Promise<boolean> {
  if (!email || !password) return false;
  
  const normalizedEmail = email.trim().toLowerCase();
  const expectedEmail = ALLOWED_EMAIL.toLowerCase();

  if (normalizedEmail !== expectedEmail) {
    return false;
  }

  const inputHash = await hashString(password);
  return inputHash === AUTH_PASSWORD_HASH;
}

/**
 * Check if the user is currently authenticated in the active browser session
 */
export function isAuthenticatedSession(): boolean {
  try {
    const session = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!session) return false;
    const parsed = JSON.parse(session);
    return parsed && parsed.authenticated === true && parsed.email?.toLowerCase() === ALLOWED_EMAIL.toLowerCase();
  } catch {
    return false;
  }
}

/**
 * Store authenticated session in sessionStorage
 */
export function createSession(email: string): void {
  const sessionData = {
    authenticated: true,
    email: email.trim().toLowerCase(),
    loginTime: Date.now()
  };
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
}

/**
 * Clear session on logout
 */
export function destroySession(): void {
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
}
