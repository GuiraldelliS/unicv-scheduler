import React from 'react'
import { Control, Controller } from 'react-hook-form'

import { Input as BaseInput, MaskedInput, InputProps } from 'baseui/input'
import FormControl from '../FormControl'

import { VscEye, VscEyeClosed } from 'react-icons/vsc'
import { FiX } from 'react-icons/fi'

import { mergeOverrides, useStyletron } from 'baseui'
import { overrides as defaultOverrides } from './overrides'
import { Overrides as BaseOverrides } from 'baseui/overrides'

export type Props = Omit<InputProps, 'error'> & {
  mask?: string | null
  size?: 'mini' | 'default' | 'compact' | 'large'
  control?: Control
  caption?: string
  label?: string
  error?: string | boolean
}

const Input = React.forwardRef(
  (
    {
      mask = null,
      size = 'compact',
      control,
      name,
      overrides: propsOverrides,
      ...props
    }: Props,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const [css] = useStyletron()

    const overrides = mergeOverrides(
      {
        ...defaultOverrides({ size }),
        MaskToggleHideIcon: () => <VscEye size={24} />,
        MaskToggleShowIcon: () => <VscEyeClosed size={24} />,
        ClearIcon: (props: any) => (
          <FiX {...props} size={24} className={css({ cursor: 'pointer' })} />
        ),
      } as any,
      propsOverrides as BaseOverrides<unknown>
    )

    const inputProps = { ...props, mask, overrides, ref }

    if (control && name) {
      return (
        <Controller
          render={({
            field: { value, ...rest },
            fieldState: { error, isDirty },
            formState: { isSubmitted },
          }) => {
            return renderInput({
              ...inputProps,
              ...rest,
              value: value || '',
              error: (isDirty || isSubmitted) && (error?.message || !!error),
              positive: !error && (isDirty || isSubmitted),
            })
          }}
          name={name}
          control={control}
          {...inputProps}
        />
      )
    }

    return renderInput({ ...inputProps })
  }
)

Input.displayName = 'Input'

const renderInput = (props: Props) => {
  const { mask, label, caption, error, ...rest } = props

  const getInputComponent = () => {
    return mask ? (
      <MaskedInput {...rest} mask={mask} error={!!error} />
    ) : (
      <BaseInput {...rest} error={!!error} />
    )
  }

  const formControlProps = {
    label,
    caption,
    error,
    disabled: props.disabled,
    positive: props.positive,
  }

  if (label || caption || typeof error === 'string') {
    return (
      <FormControl {...formControlProps}>{getInputComponent()}</FormControl>
    )
  }

  return getInputComponent()
}

export default Input
