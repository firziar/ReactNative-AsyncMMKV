import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys untuk storage
export const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_EMAIL: 'user_email',
  USER_ID: 'user_id',
  IS_LOGGED_IN: 'is_logged_in',
  USER_DATA: 'user_data',
};

// Helper functions untuk AsyncStorage
export const saveUserToken = async (token: string) => {
  await AsyncStorage.setItem(STORAGE_KEYS.USER_TOKEN, token);
};

export const getUserToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(STORAGE_KEYS.USER_TOKEN);
};

export const saveUserEmail = async (email: string) => {
  await AsyncStorage.setItem(STORAGE_KEYS.USER_EMAIL, email);
};

export const getUserEmail = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(STORAGE_KEYS.USER_EMAIL);
};

export const saveUserId = async (userId: string) => {
  await AsyncStorage.setItem(STORAGE_KEYS.USER_ID, userId);
};

export const getUserId = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(STORAGE_KEYS.USER_ID);
};

export const setLoggedIn = async (isLoggedIn: boolean) => {
  await AsyncStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, isLoggedIn.toString());
};

export const isLoggedIn = async (): Promise<boolean> => {
  const value = await AsyncStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN);
  return value === 'true';
};

export const saveUserData = async (userData: any) => {
  await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
};

export const getUserData = async (): Promise<any | null> => {
  const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
  return data ? JSON.parse(data) : null;
};

export const clearAuthStorage = async () => {
  console.log('clearAuthStorage called');
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.USER_TOKEN,
      STORAGE_KEYS.USER_EMAIL,
      STORAGE_KEYS.USER_ID,
      STORAGE_KEYS.IS_LOGGED_IN,
      STORAGE_KEYS.USER_DATA,
    ]);
    console.log('AsyncStorage cleared successfully');
  } catch (error) {
    console.error('Error clearing storage:', error);
    throw error;
  }
};

export const clearAllStorage = async () => {
  console.log('clearAllStorage called');
  await AsyncStorage.clear();
  console.log('All storage cleared');
};
