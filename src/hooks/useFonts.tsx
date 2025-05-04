import { useEffect, useState } from 'react';
import * as Font from 'expo-font';

const useFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Montserrat-Black': require('../assets/fonts/Montserrat/Montserrat-Black.ttf'),
        'Montserrat-Bold': require('../assets/fonts/Montserrat/Montserrat-Bold.ttf'),
        'Montserrat-ExtraBold': require('../assets/fonts/Montserrat/Montserrat-ExtraBold.ttf'),
        'Montserrat-ExtraLight': require('../assets/fonts/Montserrat/Montserrat-ExtraLight.ttf'),
        'Montserrat-Light': require('../assets/fonts/Montserrat/Montserrat-Light.ttf'),
        'Montserrat-Medium': require('../assets/fonts/Montserrat/Montserrat-Medium.ttf'),
        'Montserrat-Regular': require('../assets/fonts/Montserrat/Montserrat-Regular.ttf'),
        'Montserrat-SemiBold': require('../assets/fonts/Montserrat/Montserrat-SemiBold.ttf'),
        'Montserrat-Thin': require('../assets/fonts/Montserrat/Montserrat-Thin.ttf'),
        'Montserrat-BoldItalic': require('../assets/fonts/Montserrat/Montserrat-BoldItalic.ttf'),
        'Montserrat-LightItalic': require('../assets/fonts/Montserrat/Montserrat-LightItalic.ttf'),
        'Montserrat-MediumItalic': require('../assets/fonts/Montserrat/Montserrat-MediumItalic.ttf'),
        'Montserrat-SemiBoldItalic': require('../assets/fonts/Montserrat/Montserrat-SemiBoldItalic.ttf'),
        'Montserrat-ExtraBoldItalic': require('../assets/fonts/Montserrat/Montserrat-ExtraBoldItalic.ttf'),
        'Montserrat-ThinItalic': require('../assets/fonts/Montserrat/Montserrat-ThinItalic.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  return fontsLoaded;
};

export default useFonts;