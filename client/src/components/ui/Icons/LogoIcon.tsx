import React from 'react'
import { IconProps } from './types'
import { normalizeProps } from './utils/normalizeProps'

export const LogoIcon = (props: IconProps) => {
  return (
    <svg
      width='54'
      height='51'
      viewBox='0 0 54 51'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      xmlns:xlink='http://www.w3.org/1999/xlink'
      {...normalizeProps(props)}>
      <rect width='54' height='51' fill='url(#pattern0)' />
      <defs>
        <pattern
          id='pattern0'
          patternContentUnits='objectBoundingBox'
          width='1'
          height='1'>
          <use
            xlink:href='#image0_102_2390'
            transform='matrix(0.00909091 0 0 0.00962567 0 -0.0871658)'
          />
        </pattern>
        <image
          id='image0_102_2390'
          width='110'
          height='122'
          xlink:href='data:image/png;base64,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'
        />
      </defs>
    </svg>
  )
}
