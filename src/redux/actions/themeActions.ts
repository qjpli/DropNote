import AsyncStorage from '@react-native-async-storage/async-storage';
import { toggleTheme } from '../slices/themeSlice';
import { AppDispatch, RootState } from '../store'; 

export const loadTheme = () => async (dispatch: AppDispatch) => {
  try {
    const storedValue = await AsyncStorage.getItem('theme');
    if (storedValue !== null) {
      const isDark = JSON.parse(storedValue);
      if (isDark) {
        dispatch(toggleTheme());
      }
    }
  } catch (e) {
    console.error('Failed to load theme', e);
  }
};

export const persistTheme = (isDark: boolean) => async () => {
  try {
    await AsyncStorage.setItem('theme', JSON.stringify(isDark));
  } catch (e) {
    console.error('Failed to save theme', e);
  }
};

export const toggleAndPersistTheme = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const isDark = getState().theme.isDark;

  console.log('Theme is dark? ', isDark);

  dispatch(toggleTheme());
  await dispatch(persistTheme(!isDark));
};
