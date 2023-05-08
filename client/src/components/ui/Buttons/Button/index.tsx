import React, { Ref } from 'react'
import {
  Button as DefaultButton,
  ButtonProps as BaseButtonProps,
} from 'baseui/button'
import overrides from './overrides'
import { mergeOverrides } from 'baseui'
import { Overrides } from 'baseui/overrides'

type HTMLButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

type Props = HTMLButtonProps & {
  fontSize?: string
  fullWidth?: boolean
  width?: string
  fontWeight?: number
  kind?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'outline'
    | 'green'
    | 'red'
    | 'transparent'
    | 'outline-dark'
  href?: string
} & Omit<BaseButtonProps, 'kind'>

const defaultProps = {
  kind: 'primary',
  size: 'compact',
  fontSize: '14px',
  fullWidth: false,
  width: 'max-content',
  fontWeight: 500,
} as Props

export const Button = React.forwardRef(
  (
    {
      children,
      kind,
      size,
      fontSize,
      fullWidth,
      width,
      fontWeight,
      href,
      overrides: propsOverrides,
      ...props
    }: Props,
    ref: Ref<HTMLButtonElement>
  ) => {
    const buttonOverrides = mergeOverrides(
      overrides({
        size,
        fontSize,
        fullWidth,
        width,
        fontWeight,
        kind,
        shape: props.shape,
        baseButtonProps: props,
      }),
      propsOverrides as Overrides<unknown>
    )

    if (href) {
      return (
        <a href={href}>
          <DefaultButton overrides={buttonOverrides} {...props} ref={ref}>
            {children}
          </DefaultButton>
        </a>
      )
    }

    return (
      <DefaultButton {...props} overrides={buttonOverrides} ref={ref}>
        {children}
      </DefaultButton>
    )
  }
)

Button.defaultProps = defaultProps
Button.displayName = 'Button'

export type ButtonProps = Props
