// services/localStorage.ts

// Ma'lumotni localStorage'ga saqlash
export const setItem = (key: string, value: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  };
  
  // Ma'lumotni localStorage'dan olish
  export const getItem = (key: string): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }
    return null;
  };
  
  // Ma'lumotni localStorage'dan o'chirish
  export const removeItem = (key: string) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  };
  
  // Foydalanuvchining autentifikatsiya tokenini olish
  export const getAuthToken = (): string | null => {
    return getItem('authToken');
  };
  
  // Foydalanuvchining autentifikatsiya tokenini saqlash
  export const setAuthToken = (token: string) => {
    setItem('authToken', token);
  };
  