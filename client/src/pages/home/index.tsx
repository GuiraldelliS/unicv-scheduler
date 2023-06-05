import { useState } from 'react'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'

import { useAlert } from '../../contexts/AlertContext'

import TabSelector from '../../components/ui/Form/TabSelector'
import { mockScheduleData } from './mock'
import { Block } from 'baseui/block'
import { Paragraph } from '../../components/ui/Typography'
import Header from '../../components/layout/Header'
import { DatePicker } from 'baseui/datepicker'
import Select from '../../components/ui/Form/Select'
import { Button } from '../../components/ui/Buttons'

interface ScheduleItem {
  date: string
  schedules: {
    startTime: string
    endTime: string
  }[]
}

const PERIODOS = [
  { id: 'morning', label: 'Manhã' },
  { id: 'afternoon', label: 'Tarde' },
  { id: 'night', label: 'Noite' },
]

const Home: React.FC = () => {
  const [periodSelect, setPeriodSelect] = useState('')
  const [horarioSelect, setHorarioSelect] = useState('')
  const alert = useAlert()

  const handleTestAlert = () => {
    try {
      alert.open({
        status: 'error',
        title: 'Sucesso!',
        message: 'Sua solicitação foi enviada com sucesso!',
      })
    } catch (error) {
      alert.open({
        status: 'error',
        title: 'ERRO!',
        message: 'Sua solicitação foi enviada com sucesso!',
      })
    }
  }

  const getScheduleByPeriods = (scheduleData: ScheduleItem[]) => {
    const scheduleByPeriods = {
      morning: { period: 'Manhã', schedules: [] },
      afternoon: { period: 'Tarde', schedules: [] },
      night: { period: 'Noite', schedules: [] },
    }

    const periodIntervals = {
      morning: { start: '08:00', end: '12:00' },
      afternoon: { start: '13:00', end: '17:00' },
      night: { start: '18:00', end: '23:59:59' },
    }

    scheduleData.forEach((item) => {
      item.schedules.forEach((schedule) => {
        const startTime = new Date(
          `${item.date}T${schedule.startTime}:00Z`
        ).getTime()
        const endTime = new Date(
          `${item.date}T${schedule.endTime}:00Z`
        ).getTime()

        Object.entries(periodIntervals).forEach(([period, interval]) => {
          const start = new Date(`${item.date}T${interval.start}:00Z`).getTime()
          const end = new Date(`${item.date}T${interval.end}:00Z`).getTime()

          if (startTime >= start && endTime <= end) {
            scheduleByPeriods[period].schedules.push(schedule)
          }
        })
      })
    })

    return scheduleByPeriods
  }

  const getScheduleByPeriodSelected = () => {
    if (!periodSelect) return []
    const scheduleByPeriods = getScheduleByPeriods(mockScheduleData)
    return scheduleByPeriods[periodSelect]?.schedules
  }

  const scheduleByPeriodSelected = getScheduleByPeriodSelected()

  const handlePeriodsChange = (periodSelect: string) => {
    setPeriodSelect(periodSelect)
  }

  const handleHorarioChange = (horarioSelect: string) => {
    setHorarioSelect(horarioSelect)
  }

  return (
    <IonPage>
      <Header isAuth />
      <IonContent fullscreen>
        <Block display='flex' flexDirection='column' gridRowGap='16px'>
          <Select placeholder='Selecione o departamento' />
          <Select placeholder='Selecione o profissional' />
          <Select placeholder='Selecione o recurso' />
          <DatePicker
            placeholder='Selecione a data'
            overrides={{
              Input: {
                style: ({ $theme }) => ({
                  borderBottom: 'none',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  backgroundColor: 'red',
                }),
              },
            }}
          />
          <TabSelector
            label='Período'
            value={periodSelect}
            onChange={handlePeriodsChange}>
            {PERIODOS.map((data, index) => (
              <TabSelector.Tab key={index} value={data.id} $disabled={!data}>
                {data.label}
              </TabSelector.Tab>
            ))}
          </TabSelector>
          {scheduleByPeriodSelected.length > 0 && periodSelect ? (
            <TabSelector
              label='Horários disponíveis'
              value={horarioSelect}
              onChange={handleHorarioChange}>
              {scheduleByPeriodSelected.map((data, index) => (
                <TabSelector.Tab
                  key={index}
                  value={data.startTime}
                  $disabled={!data}>
                  {data.startTime}
                </TabSelector.Tab>
              ))}
            </TabSelector>
          ) : (
            <Block marginTop='20px'>
              <Paragraph.Small>Não há horários disponíveis.</Paragraph.Small>
            </Block>
          )}
          <Button size='large' fullWidth>
            Agendar
          </Button>
        </Block>
      </IonContent>
    </IonPage>
  )
}

export default Home
