import { styled } from 'baseui'

export const Section = styled('section', () => ({
  backgroundColor: 'transparent',

  '@media (max-width: 1280px)': {
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
}))

export const Content = styled('div', () => ({
  width: '100%',
  maxWidth: '1280px',
  margin: '0 auto',
}))

type SectionProps = {
  bg?: string
}
