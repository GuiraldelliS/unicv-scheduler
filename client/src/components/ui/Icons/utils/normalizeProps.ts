import { IconProps } from '../types'

export const normalizeProps = (props: IconProps) => {
  const { color, size, ...rest } = props

  return {
    ...(size && { width: size, height: size }),
    ...(color && { color: color }),
    ...rest,
  }
}
