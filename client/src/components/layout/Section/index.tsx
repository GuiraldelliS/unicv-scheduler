import { useStyletron } from 'baseui'
import React from 'react'

import * as Styled from './styles'

type Props = {
  children: React.ReactNode
  padding?: string
  className?: string
  as?: typeof Styled.Section
  id?: string
}

const Section = ({
  children,
  padding = '0px 0px 0px 0px',
  className,
  as: Component = Styled.Section,
  id,
}: Props) => {
  const [css] = useStyletron()

  return (
    <Component className={`${className} ${css({ padding })}`} id={id}>
      <Styled.Content>{children}</Styled.Content>
    </Component>
  )
}

export const StyledSection = Styled.Section
export const StyledSectionContent = Styled.Content

export default Section
