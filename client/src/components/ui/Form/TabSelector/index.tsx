import React from 'react'

import { Block } from 'baseui/block'
import { Control, Controller } from 'react-hook-form'
import FormControl from '../FormControl'
import { Container, Tab, TabProps } from './styles'

type Props = {
  children: React.ReactNode
  onChange?: (value: any) => void
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  value?: number | string | any
  label?: string
  name?: string
  control?: Control
}

const SIZES = {
  small: '32px',
  medium: '40px',
  large: '48px',
}

const BaseTabSelector = ({
  children,
  onChange,
  disabled = false,
  size = 'medium',
  value,
  label,
}: Props) => {
  const handleChange = (index: number) => {
    const newValue = getChildrenValueByIndex(index)
    const isActive = newValue == String(value)
    onChange?.(isActive ? null : newValue)
  }

  const getChildrenValueByIndex = (index: number) => {
    return children[index]?.props?.value
  }

  return (
    <Block
      overrides={{
        Block: {
          style: {
            pointerEvents: disabled ? 'none' : 'inherit',
          },
        },
      }}>
      <FormControl label={label} disabled={disabled}>
        <Container>
          {React.Children.map(
            children,
            (child: React.ReactElement<any>, index) => {
              return React.cloneElement(child as React.ReactElement<any>, {
                $active:
                  getChildrenValueByIndex(index) == String(value) ? 'true' : '',
                onClick: () => handleChange(index),
                $height: SIZES[size],
                $disabled: disabled || child.props.$disabled,
              })
            }
          )}
        </Container>
      </FormControl>
    </Block>
  )
}

const TabSelector = ({ control, name, children, ...rest }: Props) => {
  if (control && name) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <BaseTabSelector {...field} {...fieldState} {...rest}>
            {children}
          </BaseTabSelector>
        )}
      />
    )
  }

  return <BaseTabSelector {...rest}>{children}</BaseTabSelector>
}

TabSelector.Tab = Tab as any

export default TabSelector
