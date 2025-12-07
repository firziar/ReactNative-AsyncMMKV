import { auth } from '@/config/firebase';
import {
    isLoggedIn as checkIsLoggedIn,
    clearAuthStorage,
    getUserData,
    saveUserData,
    saveUserEmail,
    saveUserId,
    saveUserToken,
    setLoggedIn
} from '@/utils/storage';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
    UserCredential,
} from 'firebase/auth';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user was previously logged in
    const checkStoredAuth = async () => {
      const isUserLoggedIn = await checkIsLoggedIn();
      if (isUserLoggedIn) {
        const storedUserData = await getUserData();
        if (storedUserData) {
          // User data exists in storage
          console.log('User found in storage:', storedUserData.email);
        }
      }
    };

    checkStoredAuth();

    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        
        // Save to AsyncStorage
        const token = await firebaseUser.getIdToken();
        await saveUserToken(token);
        await saveUserEmail(firebaseUser.email || '');
        await saveUserId(firebaseUser.uid);
        await setLoggedIn(true);
        
        // Save complete user data
        await saveUserData({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        });
        
        console.log('User signed in:', firebaseUser.email);
      } else {
        setUser(null);
        await clearAuthStorage();
        console.log('User signed out');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string): Promise<UserCredential> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered:', userCredential.user.email);
      return userCredential;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string): Promise<UserCredential> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user.email);
      return userCredential;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      console.log('Starting logout process...');
      console.log('Calling signOut...');
      await signOut(auth);
      console.log('SignOut completed, clearing storage...');
      await clearAuthStorage();
      console.log('Storage cleared, logout completed');
    } catch (error) {
      console.error('Logout error:', error);
      console.error('Logout error details:', JSON.stringify(error));
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signUp,
    signIn,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
