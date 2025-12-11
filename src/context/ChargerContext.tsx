import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { DEFAULT_USER_CODES, DEFAULT_ADMIN_CODE, DEFAULT_DURATIONS, authenticateUser, UserRole } from '@/lib/auth';

interface ChargingSession {
  userId: string;
  startTime: Date;
  duration: number;
  remainingSeconds: number;
  isActive: boolean;
}

interface ChargerContextType {
  // Auth
  userCodes: string[];
  adminCode: string;
  currentUser: string | null;
  currentRole: UserRole | null;
  login: (code: string) => { success: boolean; role?: UserRole };
  logout: () => void;
  
  // Charging
  durations: { short: number; medium: number; long: number };
  setDurations: (durations: { short: number; medium: number; long: number }) => void;
  chargingSession: ChargingSession | null;
  startCharging: (duration: number, userId: string) => void;
  stopCharging: (code: string) => boolean;
  
  // Emergency
  isEmergencyStop: boolean;
  triggerEmergencyStop: () => void;
  resetEmergencyStop: () => void;
  
  // All sessions for admin monitoring
  allSessions: ChargingSession[];
}

const ChargerContext = createContext<ChargerContextType | undefined>(undefined);

export function ChargerProvider({ children }: { children: React.ReactNode }) {
  const [userCodes] = useState<string[]>(DEFAULT_USER_CODES);
  const [adminCode] = useState<string>(DEFAULT_ADMIN_CODE);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [durations, setDurations] = useState(DEFAULT_DURATIONS);
  const [chargingSession, setChargingSession] = useState<ChargingSession | null>(null);
  const [isEmergencyStop, setIsEmergencyStop] = useState(false);
  const [allSessions, setAllSessions] = useState<ChargingSession[]>([]);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const login = useCallback((code: string) => {
    const result = authenticateUser(code, userCodes, adminCode);
    if (result.success && result.role && result.userId) {
      setCurrentUser(result.userId);
      setCurrentRole(result.role);
    }
    return result;
  }, [userCodes, adminCode]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setCurrentRole(null);
  }, []);

  const startCharging = useCallback((duration: number, userId: string) => {
    const newSession: ChargingSession = {
      userId,
      startTime: new Date(),
      duration,
      remainingSeconds: duration * 60,
      isActive: true
    };
    setChargingSession(newSession);
    setAllSessions(prev => [...prev.filter(s => s.userId !== userId), newSession]);
  }, []);

  const stopCharging = useCallback((code: string) => {
    if (chargingSession && (code === adminCode || userCodes.includes(code))) {
      setChargingSession(prev => prev ? { ...prev, isActive: false } : null);
      setAllSessions(prev => prev.filter(s => s.userId !== chargingSession.userId));
      return true;
    }
    return false;
  }, [chargingSession, adminCode, userCodes]);

  const triggerEmergencyStop = useCallback(() => {
    setIsEmergencyStop(true);
    setChargingSession(prev => prev ? { ...prev, isActive: false } : null);
    setAllSessions([]);
  }, []);

  const resetEmergencyStop = useCallback(() => {
    setIsEmergencyStop(false);
    setChargingSession(null);
  }, []);

  // Timer effect
  useEffect(() => {
    if (chargingSession?.isActive && !isEmergencyStop) {
      timerRef.current = setInterval(() => {
        setChargingSession(prev => {
          if (!prev || prev.remainingSeconds <= 1) {
            return prev ? { ...prev, remainingSeconds: 0, isActive: false } : null;
          }
          const updated = { ...prev, remainingSeconds: prev.remainingSeconds - 1 };
          setAllSessions(sessions => 
            sessions.map(s => s.userId === prev.userId ? updated : s)
          );
          return updated;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [chargingSession?.isActive, isEmergencyStop]);

  return (
    <ChargerContext.Provider value={{
      userCodes,
      adminCode,
      currentUser,
      currentRole,
      login,
      logout,
      durations,
      setDurations,
      chargingSession,
      startCharging,
      stopCharging,
      isEmergencyStop,
      triggerEmergencyStop,
      resetEmergencyStop,
      allSessions
    }}>
      {children}
    </ChargerContext.Provider>
  );
}

export function useCharger() {
  const context = useContext(ChargerContext);
  if (!context) {
    throw new Error('useCharger must be used within a ChargerProvider');
  }
  return context;
}
