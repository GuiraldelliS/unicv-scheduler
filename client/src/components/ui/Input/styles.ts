import styled from 'styled-components'
import { IonInput } from '@ionic/react'

interface InputProps {
  kind?: 'primary' | 'secondary'
}

const Input = styled(IonInput)`
  --highlight-color-focused: ${({ kind }: InputProps) =>
    kind === 'primary' ? '#000000' : '#AC884D'};
  --border-width: 1px;
  --border-style: solid;
  border-bottom: ${({ kind }: InputProps) =>
    kind === 'primary' ? '1px solid #000000' : '1px solid #AC884D'};
  --placeholder-color: white;
  --placeholder-font-style: normal;
  --placeholder-font-weight: 400;
  --placeholder-font-size: 12px;
  color: white;
`

export { Input }
