import { useState, useEffect } from "react";
import { signInWithPopup, onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth, googleProvider } from "../config/firebaseConfig";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Send user data to server to store in PostgreSQL
        try {
          const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: currentUser.displayName,
              email: currentUser.email,
              password: '' // You may want to handle passwords differently
            })
          });
          if (!response.ok) {
            throw new Error('Failed to save user data');
          }
        } catch (error) {
          console.error('Error saving user data:', error);
        }
      }
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    if (isSigningIn) return;
    setIsSigningIn(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error during sign-in:", error);
    } finally {
      setIsSigningIn(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return { user, signInWithGoogle, logout };
};