import { useEffect,useState } from 'react';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebaseConfig';
import { useAuthStore } from '../store/useAuthStore';

export const useAuth = () => {
  const { user, isSigningIn, setUser, setIsSigningIn, setAuthLoading } = useAuthStore();
  const [authLoading, setLocalAuthLoading] = useState(true);

  useEffect(() => {
    setAuthLoading(true);
    
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Check if user exists
          const checkResponse = await fetch(`/api/users/check?email=${currentUser.email}`);
          const checkData = await checkResponse.json();
          
          if (!checkData.exists) {
            // Only create if user doesn't exist
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
          }
          // Set user state regardless of whether user was created or already existed
          setUser(currentUser);
        } catch (error) {
          console.error('Error handling user data:', error);
        }
      } else {
        setUser(null);
      }
      setAuthLoading(false);
      setLocalAuthLoading(false);
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