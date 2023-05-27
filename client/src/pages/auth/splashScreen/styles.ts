import { styled } from 'baseui'

export const WrapperActions = styled('div', () => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '1.5rem',
  gap: '1rem',
  '& > button': {
    flex: 1,
  },
}))
