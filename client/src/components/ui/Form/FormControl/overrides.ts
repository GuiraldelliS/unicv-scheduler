type OverridesParams = {
  $disabled: boolean
  $error: boolean
  $theme: any
}

export const overrides = () => ({
  Label: {
    style: ({ $disabled }: OverridesParams) => ({
      fontSize: '12px',
      fontWeight: 400,
      marginBottom: '4px',
      color: '#6F738A',
      opacity: $disabled ? 0.2 : 1,
    }),
  },
  Caption: {
    style: ({ $error, $theme, $disabled }: OverridesParams) => ({
      fontSize: '14px',
      marginTop: '4px',
      color: $error ? $theme.colors.negative : 'black',
      opacity: $disabled ? 0.2 : 1,
    }),
  },
  ControlContainer: {
    style: ({ $disabled }: OverridesParams) => ({
      opacity: $disabled ? 0.2 : 1,
    }),
  },
})
