import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "applicant" | "recruiter" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  title?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string, role?: UserRole) => boolean;
  register: (name: string, email: string, role: UserRole) => boolean;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "career_connect_user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved user", e);
      }
    }
    // Default demo user for seamless exploration if desired
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = (email: string, _password?: string, role: UserRole = "applicant"): boolean => {
    const newUser: User = {
      id: "u_" + Date.now(),
      name: email.split("@")[0] || "User",
      email: email,
      role: role,
      avatar: email.substring(0, 2).toUpperCase(),
    };
    setUser(newUser);
    return true;
  };

  const register = (name: string, email: string, role: UserRole): boolean => {
    const newUser: User = {
      id: "u_" + Date.now(),
      name,
      email,
      role,
      avatar: name.substring(0, 2).toUpperCase(),
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
