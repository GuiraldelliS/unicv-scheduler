/* eslint-disable react/display-name */

import { Block, BlockProps } from 'baseui/block'

import React, { CSSProperties } from 'react'

import { SIZES, STYLES } from './config'
import { overrides } from './overrides'

type FontSize = number | string

type TextProps = BlockProps & {
  lineHeight?: number | string
  fontSize?: FontSize | [FontSize, FontSize] | string[]
  textTransform?: CSSProperties['textTransform']
  textDecoration?: CSSProperties['textDecoration']
  textAlign?: CSSProperties['textAlign']
  href?: string
  fontWeight?: number | string
}

export type TypographyProps = TextProps & {
  type?: keyof typeof STYLES
  size?: keyof typeof SIZES
  children: React.ReactNode
}

type Props = Omit<TypographyProps, 'type' | 'size'>

const renderTypography = ({
  type,
  size,
  children,
  ...props
}: TypographyProps) => {
  const { href } = props

  const blockProps = overrides({ type, size, ...props }) as BlockProps

  if (href) {
    return (
      <a href={href}>
        <Block {...blockProps}>{children}</Block>
      </a>
    )
  }

  return <Block {...blockProps}>{children}</Block>
}

const getTypographySizes = (type: keyof typeof STYLES) => ({
  Large: ({ children, ...rest }: Props) =>
    renderTypography({ type, size: SIZES.Large, children, ...rest }),
  Medium: ({ children, ...rest }: Props) =>
    renderTypography({ type, size: SIZES.Medium, children, ...rest }),
  Small: ({ children, ...rest }: Props) =>
    renderTypography({ type, size: SIZES.Small, children, ...rest }),
  XSmall: ({ children, ...rest }: Props) =>
    renderTypography({ type, size: SIZES.XSmall, children, ...rest }),
})

const Display = getTypographySizes('Display')

const Paragraph = getTypographySizes('Paragraph')

const Heading = getTypographySizes('Heading')

const Highlight = ({ children, color, ...rest }: Props) =>
  renderTypography({
    type: 'Highlight',
    size: SIZES.Large,
    color: color || '#89AB7C',
    children,
    ...rest,
  })

export { Paragraph, Heading, Display, Highlight }
