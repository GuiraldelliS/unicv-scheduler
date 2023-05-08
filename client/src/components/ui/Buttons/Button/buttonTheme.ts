import { colors } from '../../../../themes/light-theme'

export const buttonTheme = (kind: string) => {
  const outlineBorderStyles = {
    borderTopWidth: '1px',
    borderBottomWidth: '1px',
    borderLeftWidth: '1px',
    borderRightWidth: '1px',

    borderTopStyle: 'solid',
    borderBottomStyle: 'solid',
    borderLeftStyle: 'solid',
    borderRightStyle: 'solid',
  } as React.CSSProperties

  const overrides = {
    primary: {
      backgroundColor: colors.green,
      ':hover': {
        backgroundColor: colors.green700,
      },
      ':active': {
        backgroundColor: colors.green900,
      },
      ':disabled': {
        backgroundColor: colors.green700,
        opacity: '20%',
        ':active': {
          backgroundColor: colors.green700,
        },
      },
    },
    secondary: {
      backgroundColor: colors.gray800,
      ':hover': {
        backgroundColor: colors.gray700,
      },
      ':active': {
        backgroundColor: colors.gray800,
      },
      ':disabled': {
        backgroundColor: colors.gray500,
        opacity: '20%',
        color: colors.white,
        ':hover': {
          backgroundColor: colors.gray500,
        },
      },
    },
    tertiary: {
      backgroundColor: colors.gray150,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      color: colors.gray800,
      ...outlineBorderStyles,
      ':hover': {
        backgroundColor: colors.gray200,
      },
      ':active': {
        backgroundColor: colors.gray300,
      },
      ':disabled': {
        backgroundColor: colors.gray150,
        opacity: '20%',
        color: colors.gray500,
        ':hover': {
          backgroundColor: colors.gray150,
        },
      },
    },
    outline: {
      ...outlineBorderStyles,
      backgroundColor: 'transparent',
      color: colors.green,
      borderColor: colors.green,
      ':hover': {
        backgroundColor: 'transparent',
        borderColor: colors.green700,
      },
      ':active': {
        backgroundColor: 'transparent',
        borderColor: colors.green900,
      },
      ':disabled': {
        backgroundColor: 'transparent',
        borderColor: colors.green700,
        opacity: '20%',
        ':active': {
          backgroundColor: 'transparent',
          borderColor: colors.green700,
        },
      },
    },
    green: {
      backgroundColor: colors.green,
      ':hover': {
        backgroundColor: colors.green500,
      },
      ':active': {
        backgroundColor: colors.green900,
      },
      ':disabled': {
        backgroundColor: colors.green,
        color: colors.white,
        opacity: '20%',
        ':hover': {
          backgroundColor: colors.green,
        },
      },
    },
    red: {
      backgroundColor: colors.red,
      ':hover': {
        backgroundColor: colors.red500,
      },
      ':active': {
        backgroundColor: colors.red900,
      },
      ':disabled': {
        backgroundColor: colors.red,
        opacity: '20%',
        color: colors.white,
        ':hover': {
          backgroundColor: colors.red,
        },
      },
    },
    transparent: {
      backgroundColor: 'transparent',
      color: colors.black,
      ':hover': {
        backgroundColor: 'transparent',
      },
      ':active': {
        backgroundColor: 'transparent',
      },
      ':disabled': {
        opacity: '20%',
      },
    },
    'outline-dark': {
      ...outlineBorderStyles,
      backgroundColor: 'transparent',
      color: colors.gray600,
      borderColor: colors.gray600,
      ':hover': {
        backgroundColor: 'transparent',
        borderColor: colors.gray600,
      },
      ':active': {
        backgroundColor: 'transparent',
        borderColor: colors.gray600,
      },
      ':disabled': {
        backgroundColor: 'transparent',
        borderColor: colors.gray600,
        opacity: '20%',
        ':active': {
          backgroundColor: 'transparent',
          borderColor: colors.gray600,
        },
      },
    },
  }

  return overrides[kind as keyof typeof overrides]
}
