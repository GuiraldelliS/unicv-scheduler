import * as Styled from './styles'

type Props = React.ComponentProps<typeof Styled.Input> & {
  kind?: 'primary' | 'secondary'
}

const Input = ({ kind = 'primary', ...rest }: Props) => {
  return <Styled.Input kind={kind} {...rest} />
}

export default Input
