import React from 'react'

import * as Styled from './styles'

type Props = {
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
