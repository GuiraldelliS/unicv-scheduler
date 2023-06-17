import React, { createContext, useContext, useRef, useState } from 'react'

import { Button } from '../../components/ui/Buttons'
import { CircleCheckIcon, CircleXIcon } from '../../components/ui/Icons'
import { Heading } from '../../components/ui/Typography'
import { Modal } from '../../components/ui/Modal'

import { IAgendamentoContext, IRenderAlert, OpenArgs } from './types'

import { styled, useStyletron } from 'baseui'
import { colors } from '../../themes/light-theme'

const AlertContext = createContext<IAgendamentoContext>({
  open: () => {},
  close: () => {},
  success: () => {},
  error: () => {},
})

const AlertContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [, theme] = useStyletron()
  const alertsToRender = useRef(new Map<string, IRenderAlert>()).current
  const [isOpen, setIsOpen] = useState(false)

  const renderAlert = (props: IRenderAlert) => {
    const { handleClose, Component, defaultAlertProps } = props

    if (Component) {
      return <Component handleClose={handleClose} />
    }

    const { title, message, status } = defaultAlertProps

    const Icon = status === 'success' ? CircleCheckIcon : CircleXIcon
    const color = status === 'success' ? colors.green600 : colors.red
    return (
      <>
        <Icon color={color} />
        <Heading.Small textAlign='center'>{title}</Heading.Small>
        {message && (
          <Heading.Small color={theme.colors.mono700} textAlign='center'>
            {message}
          </Heading.Small>
        )}
        <Button kind='secondary' fullWidth onClick={handleClose}>
          Fechar
        </Button>
      </>
    )
  }

  const open = (props: OpenArgs) => {
    const id = Math.random().toString(36).substr(2, 9)
    alertsToRender.set(id, {
      Component: typeof props === 'function' ? props : (undefined as any),
      defaultAlertProps:
        typeof props === 'function' ? undefined : (props as any),
      handleClose: () => {
        close(id)
      },
    })

    setIsOpen(true)
    return id
  }

  const close = async (id: string) => {
    setIsOpen(false)
    setInterval(() => {
      alertsToRender.delete(id)
    }, 200)
  }

  const success: IAgendamentoContext['success'] = (props) => {
    if (typeof props === 'string') {
      return open({
        title: props,
        status: 'success',
      })
    }

    return open({
      ...props,
      status: 'success',
    })
  }

  const error: IAgendamentoContext['error'] = (props) => {
    if (typeof props === 'string') {
      return open({
        title: props,
        status: 'error',
      })
    }

    return open({
      ...props,
      status: 'error',
    })
  }

  const getAlertToRender = () => {
    const alertToRender = Array.from(alertsToRender.values()).pop()
    if (!alertToRender) return null
    return renderAlert(alertToRender)
  }

  return (
    <AlertContext.Provider
      value={{
        open,
        close,
        success,
        error,
      }}>
      <Modal size='auto' isOpen={isOpen}>
        <AlertModalContent>{getAlertToRender()}</AlertModalContent>
      </Modal>
      {children}
    </AlertContext.Provider>
  )
}

function useAlert() {
  const context = useContext(AlertContext)

  return context
}

export { AlertContextProvider, useAlert }

const AlertModalContent = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gridRowGap: '24px',
})
