import React from 'react'
import { Textarea as BaseTextarea, TextareaProps } from 'baseui/textarea'

import { Control, Controller } from 'react-hook-form'
import FormControl from '../FormControl'
import { overrides } from './overrides'
import { mergeOverrides } from 'baseui'
import { Overrides } from 'baseui/overrides'

export type Props = Omit<React.ComponentProps<typeof BaseTextarea>, 'error'> & {
  control?: Control
  caption?: string
  label?: string
  error?: string | boolean
}

const Textarea = React.forwardRef((props: Props, ref: any) => {
  const { control, name, ...inputProps } = props

  if (control && name) {
    return (
      <Controller
        render={({
          field: { value, ...rest },
          fieldState: { error, isDirty },
          formState: { isSubmitted },
        }) => {
          return renderTextarea({
            ...inputProps,
            ...rest,
            value: value || '',
            error: error?.message || !!error,
            positive: !error && (isDirty || isSubmitted),
          })
        }}
        name={name}
        control={control}
        {...inputProps}
      />
    )
  }

  return renderTextarea({ ...inputProps, inputRef: ref })
})

Textarea.displayName = 'Textarea'

const renderTextarea = (props: Props) => {
  const { label, caption, error, overrides: propsOverrides, ...rest } = props

  const getInputComponent = () => {
    return (
      <BaseTextarea
        {...rest}
        error={!!error}
        overrides={mergeOverrides(
          overrides as Overrides<unknown>,
          propsOverrides as Overrides<unknown>
        )}
      />
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

export default Textarea
