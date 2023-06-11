import { styled } from 'baseui'

export const WrapperActions = styled('div', () => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '1.5rem',

  '& > button': {
    flex: 1,
    width: '100%',
  },
}))
