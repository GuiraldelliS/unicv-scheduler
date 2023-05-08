import { lightThemePrimitives } from 'baseui'

const colors = {
  green: '#89AB7C',
  green100: '#e6faef',
  green200: '#b3f2d1',
  green300: '#80e9b3',
  green400: '#4de095',
  green500: '#00A844',
  green600: '#008c3d',
  green700: '#007534',
  green800: '#00632c',
  green900: '#007523',

  greenDark: '#1D8F5D',
  greenDark50: '#E5F3ED',
  greenDark100: '#C8E7D9',
  greenDark200: '#A5D8BD',
  greenDark300: '#81C89F',
  greenDark400: '#64B885',
  greenDark500: '#48A26B',
  greenDark600: '#3F9361',
  greenDark700: '#347C51',
  greenDark800: '#2B6641',
  greenDark900: '#1D8F5D',

  greenMedium: '#1F9C56',
  greenMedium50: '#E7F4ED',
  greenMedium100: '#CDE6D7',
  greenMedium200: '#AED6BC',
  greenMedium300: '#8FC69F',
  greenMedium400: '#76B287',
  greenMedium500: '#5C9B6E',
  greenMedium600: '#518F65',
  greenMedium700: '#447B55',
  greenMedium800: '#396646',
  greenMedium900: '#2C5033',

  red: '#FF0505',
  red100: '#ffe3e3',
  red500: '#DF0007',
  red900: '#C60000',

  orange: '#FFB905',

  blue: '#0587FF',

  black: '#000000',

  white: '#FFFFFF',

  gray: '#BDBDBD',
  gray50: '#FFFFFF',
  gray100: '#F2F2F2',
  gray150: '#F5F5F5',
  gray200: '#EEEEEE',
  gray300: '#E5E5E5',
  gray400: '#BDBDBD',
  gray500: '#868686',
  gray600: '#656565',
  gray700: '#505050',
  gray800: '#333333',
  gray900: '#111827',
}

const lightThemeColors = {
  ...lightThemePrimitives,

  negative50: colors.red,
  negative100: colors.red100,
  negative500: colors.red500,
  negative900: colors.red900,

  positive50: colors.green,
  positive100: colors.green100,
  positive500: colors.green500,
  positive900: colors.green900,

  warning50: colors.orange,
  warning100: colors.orange,
  warning200: colors.orange,
  warning400: colors.orange,
  warning500: colors.orange,
  warning900: colors.orange,

  mono100: colors.gray100,
  mono150: colors.gray150,
  mono200: colors.gray200,
  mono300: colors.gray300,
  mono400: colors.gray400,
  mono500: colors.gray500,
  mono600: colors.gray600,
  mono700: colors.gray700,
  mono800: colors.gray800,
}

export { colors, lightThemeColors }
