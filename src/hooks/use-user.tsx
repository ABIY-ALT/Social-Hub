'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import type { User, UserRole } from '@/lib/types';

interface UserContextType {
  user: User;
  // setUserRole is no longer needed as role switching is removed
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>({ name: 'Alex', role: 'Admin' });

  // The ability to set user role is removed from the public context
  // It will be managed through proper settings pages in a real app
  
  const value = useMemo(() => ({ user }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
