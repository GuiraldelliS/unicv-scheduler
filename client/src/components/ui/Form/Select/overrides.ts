const SIZES = {
  mini: '32px',
  default: '40px',
  compact: '48px',
  large: '56px',
}

type OverridesParams = {
  size: 'mini' | 'default' | 'compact' | 'large'
}

export const overrides = ({ size }: OverridesParams) => ({
  ControlContainer: {
    style: ({
      $isOpen,
      $theme,
      $disabled,
    }: {
      $isOpen: boolean
      $theme: any
      $disabled: boolean
    }) => ({
      height: SIZES[size],
      borderBottomLeftRadius: $isOpen ? 0 : $theme.borders.inputBorderRadius,
      borderBottomRightRadius: $isOpen ? 0 : $theme.borders.inputBorderRadius,
      borderTopWidth: '1px',
      borderBottomWidth: '1px',
      borderLeftWidth: '1px',
      borderRightWidth: '1px',
      borderRightColor: '#ECECEC',
      borderLeftColor: '#ECECEC',
      borderTopColor: '#ECECEC',
      borderBottomColor: '#ECECEC',
      backgroundColor: '#ECECEC',
      paddingRight: '14px',
      paddingLeft: '4px',
      opacity: $disabled ? 0.2 : 1,
    }),
  },
  DropdownContainer: {
    style: {
      boxShadow: '0px 10px 40px rgba(18, 18, 18, 0.1)',
      backgroundColor: 'white',
      borderBottomLeftRadius: '1rem',
      borderBottomRightRadius: '1rem',
    },
  },
  Dropdown: {
    style: {
      backgroundColor: 'white',
      boxShadow: 'none',
      borderBottomLeftRadius: '1rem',
      borderBottomRightRadius: '1rem',

      maxHeight: '200px',

      '::-webkit-scrollbar': {
        width: '10px',
      },

      '::-webkit-scrollbar-track': {
        background: 'white',
        borderRadius: '13px',
      },

      '::-webkit-scrollbar-thumb': {
        backgroundColor: '#D9D9D9',
        backgroundClip: 'content-box',
        border: '3px solid transparent',
        borderRadius: '9px',
      },
    },
  },
  DropdownListItem: {
    style: {
      fontWeight: 500,
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: '#D8D8D8',
      paddingTop: '12px',
      paddingBottom: '12px',
      paddingLeft: '12px',
      paddingRight: '12px',
    },
  },
  Input: {
    style: {
      maxWidth: '100% !important',
      width: '95%',
    },
  },
  InputContainer: {
    style: {
      width: '100%',
    },
  },
  Placeholder: {
    style: {
      position: 'absolute',
    },
  },
  SingleValue: {
    style: {
      maxWidth: '95% !important',
      position: 'absolute',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
    },
  },
  IconsContainer: {
    style: {
      paddingRight: '8px',
    },
  },
})
