import React, { useEffect, useState } from 'react'
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
} from '@ionic/react'
import { StatefulPopover, PLACEMENT, TRIGGER_TYPE } from 'baseui/popover'
import { RouteComponentProps, withRouter } from 'react-router'
import { Avatar } from 'baseui/avatar'
import { Block } from 'baseui/block'
import { Heading, Paragraph } from '../../ui/Typography'
import { Button, KIND, SIZE } from 'baseui/button'
import { ButtonOverrides } from './overrides'
import { truncate } from '../../../utils/truncate'
import { useAuth0 } from '@auth0/auth0-react'
import {
  findStudentById,
  findStudentLogado,
} from '../../../services/appointments.service'

interface HeaderProps extends RouteComponentProps {
  title?: string
  isAuth?: boolean
}

const Header: React.FC<HeaderProps> = ({ title, history, isAuth = false }) => {
  const { user, logout } = useAuth0()

  const [student, setStudent] = useState(null)

  const getStudentLogado = async () => {
    try {
      const studentLogado = await findStudentLogado({
        userMasterId: user.sub,
      })
      const response = await findStudentById(studentLogado.id)
      setStudent(response)
    } catch (error) {
      console.error(error)
      setStudent(null)
    }
  }

  useEffect(() => {
    getStudentLogado()
  }, [])

  const OPTIONS_PROFILE = [
    {
      id: 'agenda',
      label: 'Minha Agenda',
      onClick: () => {
        history.push('/schedule')
      },
    },
    { divider: true },
    {
      id: 'profile',
      label: 'Configurações do perfil',
      onClick: () => {
        history.push('/profile')
      },
    },
    { divider: true },
    { id: 'logout', label: 'Sair', onClick: () => logout() },
  ]

  return (
    <>
      {isAuth ? (
        <IonHeader
          collapse='fade'
          mode='md'
          style={{
            '&::after': {
              content: 'none !important',
            },
          }}>
          <IonToolbar>
            <Block
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              padding='0 1rem'>
              <IonTitle
                color='black'
                style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  paddingInline: '0px',
                }}>
                Unidule
              </IonTitle>
              <StatefulPopover
                placement={PLACEMENT.bottomLeft}
                triggerType={TRIGGER_TYPE.click}
                content={({ close }) => (
                  <Block
                    minWidth='200px'
                    backgroundColor='white'
                    overrides={{
                      Block: {
                        style: {
                          borderBottomLeftRadius: '8px',
                          borderBottomRightRadius: '8px',
                          borderTopLeftRadius: '8px',
                          borderTopRightRadius: '8px',
                        },
                      },
                    }}>
                    <>
                      <Block
                        display='flex'
                        alignItems='center'
                        gridColumnGap='8px'
                        padding='0.5rem 0.5rem'>
                        <Avatar
                          name={user?.name}
                          size='scale1000'
                          src={user?.picture}
                        />
                        <Block
                          display='flex'
                          flexDirection='column'
                          gridColumnGap='8px'>
                          <Heading.XSmall>
                            {student?.name || user?.name}
                          </Heading.XSmall>
                          <Paragraph.Small>
                            {truncate(user?.email, 20)}
                          </Paragraph.Small>
                        </Block>
                      </Block>
                      {OPTIONS_PROFILE.map((option) => {
                        if (option.divider) {
                          return (
                            <Block height='1px' backgroundColor='#E6E6E6' />
                          )
                        }
                        return (
                          <Block
                            padding='0.5rem 0.5rem'
                            onClick={() => {
                              if (option.id === 'logout') {
                                history.push('/login')
                              }
                            }}>
                            <Button
                              kind={KIND.tertiary}
                              size={SIZE.mini}
                              overrides={{
                                BaseButton: {
                                  style: {
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                    paddingLeft: '0px',
                                    paddingRight: '0px',
                                    paddingTop: '0px',
                                    paddingBottom: '0px',
                                  },
                                },
                              }}
                              onClick={() => {
                                option?.onClick?.()
                                close()
                              }}>
                              <Paragraph.Medium>
                                {option.label}
                              </Paragraph.Medium>
                            </Button>
                          </Block>
                        )
                      })}
                    </>
                  </Block>
                )}
                accessibilityType={'tooltip'}>
                <Button overrides={ButtonOverrides}>
                  <Avatar
                    name={user?.name}
                    size='scale1000'
                    src={user?.picture}
                  />
                </Button>
              </StatefulPopover>
            </Block>
          </IonToolbar>
        </IonHeader>
      ) : (
        <IonHeader
          collapse='fade'
          mode='md'
          style={{
            '&::after': {
              content: 'none !important',
            },
          }}>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonBackButton defaultHref='/' />
            </IonButtons>
            {title && (
              <IonTitle
                color='black'
                style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  paddingInline: '0px',
                }}>
                {title}
              </IonTitle>
            )}
          </IonToolbar>
        </IonHeader>
      )}
    </>
  )
}

export default withRouter(Header)
