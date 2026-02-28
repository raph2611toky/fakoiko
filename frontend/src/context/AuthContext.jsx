import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charger l'utilisateur depuis localStorage au démarrage
  useEffect(() => {
    const savedUser = localStorage.getItem('ecolink_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Fonction de connexion
  const login = (userData) => {
    const user = {
      id: userData.id || Date.now(),
      email: userData.email,
      name: userData.name,
      role: userData.role, // 'citizen', 'collector', 'validator', 'municipality'
      avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`,
      createdAt: new Date().toISOString(),
    };
    setUser(user);
    localStorage.setItem('ecolink_user', JSON.stringify(user));
    return user;
  };

  // Fonction de connexion avec Google (simulation)
  const loginWithGoogle = async (googleUser) => {
    const user = {
      id: googleUser.sub || Date.now(),
      email: googleUser.email,
      name: googleUser.name,
      role: 'citizen', // Rôle par défaut pour Google
      avatar: googleUser.picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${googleUser.email}`,
      provider: 'google',
      createdAt: new Date().toISOString(),
    };
    setUser(user);
    localStorage.setItem('ecolink_user', JSON.stringify(user));
    return user;
  };

  // Fonction de déconnexion
  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecolink_user');
  };

  // Fonction de mise à jour du profil
  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('ecolink_user', JSON.stringify(updatedUser));
    return updatedUser;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
}
