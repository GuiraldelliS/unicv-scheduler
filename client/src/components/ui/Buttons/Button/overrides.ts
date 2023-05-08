import { buttonTheme } from './buttonTheme'

const buttonHeightOptions = {
  large: '54px',
  compact: '48px',
  default: '40px',
  mini: '32px',
}

type OverridesParams = {
  size: 'large' | 'compact' | 'default' | 'mini'
  fontSize?: string
  fullWidth?: boolean
  width?: string
  fontWeight?: string
  kind:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'minimal'
    | 'minimalRound'
    | 'minimalSquare'
  shape: 'default' | 'square' | 'circle'
  baseButtonProps?: any
}

const overrides = ({
  size,
  fontSize,
  fullWidth,
  width,
  fontWeight,
  kind,
  shape,
  baseButtonProps = {},
}: OverridesParams) => {
  const shouldUseSameWidthAndHeight = shape === 'square' || shape === 'circle'

  const defaultStyles = {
    width: shouldUseSameWidthAndHeight
      ? buttonHeightOptions[size]
      : fullWidth
      ? '100%'
      : width,
    fontFamily: 'Poppins',
    fontWeight: fontWeight,
    fontSize: fontSize || '0.875rem',
    height: buttonHeightOptions[size],
  } as React.CSSProperties

  return {
    BaseButton: {
      style: {
        ...defaultStyles,
        ...buttonTheme(kind),
      },
      props: {
        ...baseButtonProps,
      },
    },
    StartEnhancer: {
      style: () => ({
        marginRight: '10px',
      }),
    },
    EndEnhancer: {
      style: () => ({
        marginLeft: '10px',
      }),
    },
  }
}

export default overrides
