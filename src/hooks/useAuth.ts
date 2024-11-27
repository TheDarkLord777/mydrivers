import { useEffect,useState } from 'react';
import { signInWithPopup, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebaseConfig';
import { useAuthStore } from '../store/useAuthStore';

export const useAuth = () => {
  const { user, isSigningIn, setUser, setIsSigningIn, setAuthLoading } = useAuthStore();
  const [authLoading, setLocalAuthLoading] = useState(true);

  useEffect(() => {
    // Set initial loading state
    setAuthLoading(true);
    
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      setLocalAuthLoading(false);
      
      if (currentUser) {
        try {
          const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: currentUser.displayName,
              email: currentUser.email,
              password: ''
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

    return () => {
      unsubscribe();
    };
  }, [setUser, setAuthLoading]);

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
      setUser(null); // Explicitly clear the user state
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return { 
    user, 
    signInWithGoogle, 
    logout, 
    authLoading: authLoading || isSigningIn 
  };
};