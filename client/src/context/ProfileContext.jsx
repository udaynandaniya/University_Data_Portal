import { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [tempProfile, setTempProfile] = useState(null);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, tempProfile, setTempProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
