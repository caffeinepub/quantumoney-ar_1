import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface LocalProfile {
  gender: 'male' | 'female' | 'other' | null;
  avatarImage: string | null;
  monsterAvatarId: string | null;
}

interface LocalProfileContextType {
  profile: LocalProfile;
  setGender: (gender: 'male' | 'female' | 'other') => void;
  setAvatarImage: (imageDataUrl: string) => void;
  setMonsterAvatar: (monsterId: string) => void;
  clearProfile: () => void;
}

const LocalProfileContext = createContext<LocalProfileContextType | undefined>(undefined);

const STORAGE_KEY = 'quantumoney_local_profile';

const defaultProfile: LocalProfile = {
  gender: null,
  avatarImage: null,
  monsterAvatarId: null,
};

export function LocalProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<LocalProfile>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (error) {
      console.error('Failed to save profile to localStorage:', error);
    }
  }, [profile]);

  const setGender = (gender: 'male' | 'female' | 'other') => {
    setProfile((prev) => ({ ...prev, gender }));
  };

  const setAvatarImage = (imageDataUrl: string) => {
    setProfile((prev) => ({ ...prev, avatarImage: imageDataUrl, monsterAvatarId: null }));
  };

  const setMonsterAvatar = (monsterId: string) => {
    setProfile((prev) => ({ ...prev, monsterAvatarId: monsterId, avatarImage: null }));
  };

  const clearProfile = () => {
    setProfile(defaultProfile);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <LocalProfileContext.Provider
      value={{
        profile,
        setGender,
        setAvatarImage,
        setMonsterAvatar,
        clearProfile,
      }}
    >
      {children}
    </LocalProfileContext.Provider>
  );
}

export function useLocalProfile() {
  const context = useContext(LocalProfileContext);
  if (!context) {
    throw new Error('useLocalProfile must be used within LocalProfileProvider');
  }
  return context;
}
