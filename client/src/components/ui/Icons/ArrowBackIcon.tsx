import { IconProps } from './types'
import { normalizeProps } from './utils/normalizeProps'

export const ArrowBackIcon = (props: IconProps) => {
  return (
    <svg
      width='12'
      height='22'
      viewBox='0 0 12 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...normalizeProps(props)}>
      <path
        d='M11 1L1.21559 10.4949C0.928137 10.7739 0.928138 11.2261 1.21559 11.5051L11 21'
        stroke='currentColor'
        stroke-width='2'
        stroke-linecap='round'
      />
    </svg>
  )
}
