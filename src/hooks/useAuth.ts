import { useEffect, useState } from 'react';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebaseConfig';
import { useAuthStore } from '../store/useAuthStore';
import { useRouter } from 'next/router';

// Foydalanuvchi rolini olish
const getUserRole = async (email: string) => {
  const response = await fetch(`/api/users/${email}/role`);
  if (!response.ok) throw new Error('Foydalanuvchi rolini olishda xatolik');
  const { role } = await response.json();
  return role;
};

// Yangi foydalanuvchini yaratish
const createNewUser = async (username: string, email: string, password: string, phone: string) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: username, email, password, phone, userRole: 'user' }),
  });
  if (!response.ok) throw new Error('Yangi foydalanuvchini yaratishda xatolik');
  const { user } = await response.json();
  return user.role;
};

export const useAuth = () => {
  const { user, userRole, isSigningIn, setUser, setUserRole, setIsSigningIn, setAuthLoading } = useAuthStore();
  const [authLoading, setLocalAuthLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setAuthLoading(true);

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          let role;
          // Check if user exists
          const checkResponse = await fetch(`/api/users/check?email=${currentUser.email}`);
          const checkData = await checkResponse.json();

          if (!checkData.exists) {
            // Create user and get role
            role = await createNewUser(currentUser.displayName!, currentUser.email!, 'defaultPassword', 'defaultPhone');
          } else {
            // Get existing role
            role = await getUserRole(currentUser.email!);
          }

          setUser(currentUser);
          setUserRole(role);
        } catch (error) {
          console.error('Auth error:', error);
          setUser(null);
          setUserRole(null);
        }
      } else {
        setUser(null);
        setUserRole(null);
      }

      setAuthLoading(false);
      setLocalAuthLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setUserRole, setAuthLoading]);

  const signInWithGoogle = async () => {
    if (isSigningIn) return;
    setIsSigningIn(true);
  
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const role = await getUserRole(result.user.email!);
      setUserRole(role);
  
      router.push(role === 'taxi' ? '/taxi-dashboard' : '/dashboard');
    } catch (error) {
      console.error('Sign-in error:', error);
      setUserRole(null);
    } finally {
      setIsSigningIn(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserRole(null);
      router.push('/login');
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  const updateUserRole = async (newRole: 'user' | 'taxi') => {
    if (!user?.email) return;
    try {
      const response = await fetch(`/api/users/${user.email}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });
      if (!response.ok) throw new Error('Failed to update user role');
      setUserRole(newRole);
      router.push(newRole === 'taxi' ? '/taxi-dashboard' : '/dashboard');
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  return { user, userRole, signInWithGoogle, logout, updateUserRole, authLoading: authLoading || isSigningIn };
};