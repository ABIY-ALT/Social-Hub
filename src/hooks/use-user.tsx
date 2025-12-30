'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import type { User, UserRole } from '@/lib/types';

interface UserContextType {
  user: User;
  setUserRole: (role: UserRole) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>({ name: 'Alex', role: 'Admin' });

  const setUserRole = (role: UserRole) => {
    setUser(prevUser => ({ ...prevUser, role }));
  };
  
  const value = useMemo(() => ({ user, setUserRole }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
