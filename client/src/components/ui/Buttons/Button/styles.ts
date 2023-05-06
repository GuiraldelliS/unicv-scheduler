import styled from 'styled-components'
import { IonButton } from '@ionic/react'

type ButtonProps = {
  kind: 'primary' | 'secondary'
  customColor?: string
}

const Button = styled(IonButton)`
  width: 100%;
  --background: ${({ kind, customColor }: ButtonProps) =>
    customColor ? customColor : kind === 'primary' ? '#4A5A3B' : '#FFFFFF'};
  --color: ${({ kind }: ButtonProps) =>
    kind === 'primary' ? '#FFFFFF' : '#000000'};
  --border-radius: 10px;
  font-weight: 400;
  font-size: 1rem;
  line-height: 18px;
  text-transform: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  min-height: 48px;
`

export { Button }
