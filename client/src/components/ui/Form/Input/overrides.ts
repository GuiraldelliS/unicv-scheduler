const SIZES = {
  mini: '32px',
  default: '40px',
  compact: '48px',
  large: '56px',
}

type Size = keyof typeof SIZES

export const overrides = ({ size }: { size: Size }) => ({
  Root: {
    style: ({ $disabled }: { $disabled: boolean }) => ({
      height: SIZES[size],
      paddingLeft: '16px',
      paddingRight: '16px',

      borderTopWidth: '1px',
      borderBottomWidth: '1px',
      borderLeftWidth: '1px',
      borderRightWidth: '1px',

      opacity: $disabled ? 0.2 : 1,
    }),
  },
  Input: {
    style: () => ({
      paddingLeft: '0px',
      paddingRight: '0px',
    }),
  },
  StartEnhancer: {
    style: () => ({
      paddingLeft: '0px',
    }),
  },
})
