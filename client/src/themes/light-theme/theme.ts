import {createTheme} from 'baseui';
import {Delete} from 'baseui/icon';
import {colors, lightThemeColors} from './colors';

const primitives = {
  ...lightThemeColors,
  primaryFontFamily: 'Poppins',
  fontFamily: 'Poppins',
};

const overrides = {
  borders: {
    buttonBorderRadius: '8px',
    inputBorderRadius: '8px',
  },
  icons: {
    DeleteAlt: Delete,
  },
  colors: {
    inputFill: colors.gray100,
    inputFillError: colors.red100,
    inputFillPositive: colors.green100,
    inputBorderError: colors.red,
    inputBorderPositive: colors.green,
    backgroundPrimary: colors.purple,
    inputBorder: 'rgba(0, 0, 0, 0.1)',
    ratingInactiveFill: colors.gray,
    ratingStroke: 'rgba(0, 0, 0, 0.1)',

    notificationNegativeBackground: 'rgba(255, 5, 5, 0.1)',
    notificationPositiveBackground: 'rgba(36, 212, 117, 0.1) ',
    notificationInfoBackground: '#EFE8FE',
  },
};

export const LightTheme = createTheme(primitives, overrides);
