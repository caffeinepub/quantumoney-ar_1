import { useState, useEffect } from 'react';

export interface LocalProfile {
  gender: 'male' | 'female' | 'other' | null;
  avatarImage: string | null;
  monsterAvatarId: string | null;
}

const STORAGE_KEY = 'quantumoney_local_profile';

const defaultProfile: LocalProfile = {
  gender: null,
  avatarImage: null,
  monsterAvatarId: null,
};

export function useLocalProfile() {
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

  return {
    profile,
    setGender,
    setAvatarImage,
    setMonsterAvatar,
    clearProfile,
  };
}
