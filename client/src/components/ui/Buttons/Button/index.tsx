import React from 'react'

import * as Styled from './styles'

type Props = React.ComponentProps<typeof Styled.Button> & {
  children: React.ReactNode
  kind?: 'primary' | 'secondary'
  customColor?: string
}

const Button = ({
  children,
  kind = 'primary',
  customColor,
  ...rest
}: Props) => {
  return (
    <Styled.Button kind={kind} customColor={customColor} {...rest}>
      {children}
    </Styled.Button>
  )
}

export default Button
