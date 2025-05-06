import { useSelector } from "react-redux";
import { darkColors } from "../themes/dark-theme";
import { lightColors } from "../themes/light-theme";
import { RootState } from "../redux/store";

export const getThemeStyles = (isDark: boolean) => {
    return isDark ? darkColors : lightColors;
};