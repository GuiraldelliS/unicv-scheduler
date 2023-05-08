import React from 'react'

import {
  Select as BaseSelect,
  TYPE,
  SelectProps,
  SelectOverrides,
} from 'baseui/select'
import { Block } from 'baseui/block'
import { Control, Controller } from 'react-hook-form'

import FormControl from '../FormControl'
import { ChevronDownIcon } from '../../Icons'
import { FiSearch, FiX } from 'react-icons/fi'

import { mergeOverrides, useStyletron } from 'baseui'

import { overrides as defaultOverrides } from './overrides'
import { Overrides } from 'baseui/overrides'

export type Props = Omit<SelectProps, 'error'> & {
  startEnhancer?: React.ReactElement | null
  control?: Control
  name?: string
  label?: string
  caption?: string
  error?: string | boolean
}

const Select = ({
  type = 'select',
  size = 'compact',
  startEnhancer = null,
  noResultsMsg = 'Sem resultados',
  control,
  overrides: propsOverrides,
  placeholder = 'Selecione',
  ...props
}: Props) => {
  const [css] = useStyletron()

  const isSearchType = type === 'search'
  const shouldShowStartEnhancer = startEnhancer && !isSearchType

  const overrides = {
    ...defaultOverrides({ size }),
    SelectArrow: ({ $isOpen, $isLoading }) => (
      <Block
        display={$isLoading ? 'none' : 'grid'}
        placeContent='center'
        className={css({
          rotate: $isOpen ? '180deg' : 'none',
          transition: 'rotate 0.3s ease-in-out',
        })}>
        <ChevronDownIcon />
      </Block>
    ),
    ClearIcon: (props) => (
      <FiX
        {...props}
        size={'24px'}
        className={css({
          cursor: 'pointer',
          paddingRight: isSearchType ? '0px' : '12px',
        })}
      />
    ),
    SearchIcon: () => {
      if (shouldShowStartEnhancer) return startEnhancer
      else return <FiSearch size={24} />
    },
  } as SelectOverrides

  const selectProps = {
    ...props,
    overrides: mergeOverrides(
      overrides as Overrides<unknown>,
      propsOverrides as Overrides<unknown>
    ),
    type: TYPE[startEnhancer ? 'search' : type],
    noResultsMsg,
    placeholder,
  }

  if (control && props.name) {
    return (
      <Controller
        control={control}
        name={props.name}
        render={({
          field: { onChange, value, ...rest },
          formState: { isSubmitted },
          fieldState: { error, isDirty },
        }) =>
          renderSelect({
            ...rest,
            ...selectProps,
            onChange: (params) =>
              onChange(props.multi ? params.value : params.option),
            value: value ? (props.multi ? value || [] : [value]) : [],

            error: (isDirty || isSubmitted) && (error?.message || !!error),
            positive: !error && (isDirty || isSubmitted),
          })
        }
      />
    )
  }
  return renderSelect(selectProps)
}

const renderSelect = (props: Props) => {
  const { error, label, caption, ...rest } = props

  const formControlProps = {
    label,
    caption,
    error,
    disabled: props.disabled,
    positive: props.positive,
  }

  if (label || caption || typeof error === 'string') {
    return (
      <FormControl {...formControlProps}>
        <BaseSelect {...rest} error={!!error} />
      </FormControl>
    )
  }

  return <BaseSelect {...rest} error={!!error} />
}

export default Select
