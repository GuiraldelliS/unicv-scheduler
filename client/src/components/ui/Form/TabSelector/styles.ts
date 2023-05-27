import { styled, Theme } from 'baseui'

export const Container = styled('div', (props: any) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',

  minHeight: props.$height || '40px',
  borderRadius: '8px',
  overflow: 'hidden',
  border: '1px solid rgba(0, 0, 0, 0.1)',
}))

export const Tab = styled('div', (props: TabProps | any) => ({
  display: 'flex',
  flex: 1,
  minWidth: 'calc(max-content)',
  paddingInline: '1rem',

  flexFlow: 'row nowrap',

  alignItems: 'center',
  justifyContent: 'center',

  height: props.$height || '40px',

  backgroundColor: props.$active ? '#DA973C' : '#f5f5f5',
  color: props.$active ? 'white' : 'black',
  fontSize: '14px',
  outline: '1px solid rgba(0, 0, 0, 0.1)',

  transition: '0.15s',
  cursor: 'pointer',

  ':hover': {
    color: 'white',
    opacity: 0.5,
    ...(!props.$active && { backgroundColor: '#DA973C' }),
  },

  opacity: props.$disabled ? 0.5 : 1,
  pointerEvents: props.$disabled ? 'none' : 'inherit',
}))

export type TabProps = {
  $theme?: Theme
  $active?: boolean
  $disabled?: boolean
  value: any
  $height?: string
}
