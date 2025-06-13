import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  matricula: string;
  nome: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  signIn: (matricula: string, senha: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('@UniQuadra:user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const signIn = async (matricula: string, senha: string) => {
    try {
      // Aqui você implementaria a chamada real à API
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matricula, senha }),
      });

      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }

      const userData = await response.json();
      setUser(userData);
      localStorage.setItem('@UniQuadra:user', JSON.stringify(userData));
    } catch (error) {
      throw error;
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('@UniQuadra:user');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}; 