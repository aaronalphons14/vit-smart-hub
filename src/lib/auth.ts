// Default user codes and admin code
export const DEFAULT_USER_CODES = [
  '1001', '1002', '1003', '1004', '1005',
  '1006', '1007', '1008', '1009', '1010'
];

export const DEFAULT_ADMIN_CODE = '9999';

// Default charging durations in minutes
export const DEFAULT_DURATIONS = {
  short: 30,
  medium: 60,
  long: 90
};

export type UserRole = 'user' | 'admin';

export interface AuthResult {
  success: boolean;
  role?: UserRole;
  userId?: string;
}

export function authenticateUser(code: string, userCodes: string[], adminCode: string): AuthResult {
  if (code === adminCode) {
    return { success: true, role: 'admin', userId: 'admin' };
  }
  
  const userIndex = userCodes.findIndex(c => c === code);
  if (userIndex !== -1) {
    return { success: true, role: 'user', userId: `user-${userIndex + 1}` };
  }
  
  return { success: false };
}

export function validateCode(code: string, userCodes: string[], adminCode: string): boolean {
  return code === adminCode || userCodes.includes(code);
}
