import { Block } from 'baseui/block'
import React from 'react'
import { Heading, Paragraph } from '../../../../components/ui/Typography'
import { Avatar } from 'baseui/avatar'
import { Button } from '../../../../components/ui/Buttons'
import { truncate } from '../../../../utils/truncate'

const STATUS = {
  SCHEDULED: 'SCHEDULED',
  FINISHED: 'FINISHED',
}

const CONFIGS_BY_STATUS = {
  [STATUS.SCHEDULED]: {
    color: '#DA973C',
    text: 'Agendamento pendente',
  },
  [STATUS.FINISHED]: {
    color: '#2ECC71',
    text: 'Agendamento concluído',
  },
}
type CardAppointmentsProps = {
  status?: 'FINISHED' | 'SCHEDULED'
  option: {
    startTime: string
    endTime: string
    professional: {
      name: string
      avatar: string
    }
  }
  handleClick: () => void
}
const CardAppointments: React.FC<CardAppointmentsProps> = ({
  status,
  option,
  handleClick,
}) => {
  console.log({ status })
  console.log(CONFIGS_BY_STATUS[status])
  return (
    <Block
      display='flex'
      flexDirection='column'
      gridRowGap='0.5rem'
      paddingLeft='0.5rem'
      paddingRight='0.5rem'
      overrides={{
        Block: {
          style: {
            borderLeftColor: CONFIGS_BY_STATUS[status]?.color,
            borderLeftWidth: '2px',
            borderLeftStyle: 'solid',
          },
        },
      }}>
      <Block
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'>
        <Heading.Small>{CONFIGS_BY_STATUS[status]?.text}</Heading.Small>
        <Block display='flex' flexDirection='column' gridColumnGap='0.5rem'>
          <Heading.XSmall>{option.startTime}</Heading.XSmall>
          <Heading.XSmall color='#ACACAC'>{option.endTime}</Heading.XSmall>
        </Block>
      </Block>
      <Block display='flex' flexDirection='row' justifyContent='space-between'>
        <Block
          display='flex'
          flexDirection='row'
          gridColumnGap='0.5rem'
          alignItems='center'>
          <Avatar
            name='Jane Doe'
            size='scale900'
            src='https://avatars.dicebear.com/api/human/yard.svg?width=285&mood=happy'
          />
          <Paragraph.Small>
            {truncate(option.professional.name, 20)}
          </Paragraph.Small>
        </Block>
        {status === 'SCHEDULED' && (
          <Button
            size='mini'
            onClick={handleClick}
            overrides={{
              BaseButton: {
                style: {
                  fontSize: '0.7rem',
                  paddingLeft: '0.2rem',
                  paddingRight: '0.2rem',
                  paddingTop: '0rem',
                  paddingBottom: '0rem',
                },
              },
            }}>
            Concluir agendamento
          </Button>
        )}
      </Block>
    </Block>
  )
}

export default CardAppointments
