import React from 'react'

import { Combobox as BaseCombobox } from 'baseui/combobox'
import Input from '../Input'

type Props = React.ComponentProps<typeof BaseCombobox> & {
  inputProps?: React.ComponentProps<typeof Input>
}

const Combobox: React.FC<Props> = ({
  size = 'default',
  inputProps,
  ...rest
}) => {
  return (
    <BaseCombobox
      size={size}
      overrides={{
        Input: {
          component: Input,
          props: {
            size,
            ...inputProps,
          },
        },
        ListBox: {
          style: {
            backgroundColor: 'white',
            borderRadius: '4px',
          },
        },
        Popover: {
          style: {
            borderRadius: '4px',
          },
        },
      }}
      {...rest}
    />
  )
}

export default Combobox
