import { useEffect, useState } from 'react'
import { IonContent, IonPage } from '@ionic/react'

import { useAlert } from '../../contexts/AlertContext'

import TabSelector from '../../components/ui/Form/TabSelector'
import { mockScheduleData } from './mock'
import { Block } from 'baseui/block'
import { Paragraph } from '../../components/ui/Typography'
import Header from '../../components/layout/Header'
import { DatePicker } from 'baseui/datepicker'
import Select from '../../components/ui/Form/Select'
import { Button } from '../../components/ui/Buttons'
import axios from 'axios'
import { BACK_END_URL } from '../../config/constants'

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
  const [departments, setDepartments] = useState([])
  const [professional, setProfessional] = useState([])

  const [professionalSelect, setProfessionalSelect] = useState(null)
  const [departamentSelect, setDepartamentSelect] = useState(null)
  const [resourceSelect, setResourceSelect] = useState(null)
  const alert = useAlert()

  const findAllDepartments = async () => {
    try {
      const response = await axios.post(BACK_END_URL, {
        query: `
          query {
            findAllDepartment(pageableDTO: { pageNumber: 0, pageSize: 999}) {
              content {
                description
                id
                }
              }
            }
          `,
      })
      setDepartments(response.data.data.findAllDepartment.content)
    } catch (error) {
      console.error(error)
      setDepartments([])
    }
  }

  const findAllProfessional = async () => {
    try {
      const response = await axios.post(BACK_END_URL, {
        query: `
          query {
            findAllProfessional(pageableDTO: { pageNumber: 0, pageSize: 999}) {
              content {
                name
                id
                }
              }
            }
          `,
      })
      setProfessional(response.data.data.findAllProfessional.content)
    } catch (error) {
      console.error(error)
      setProfessional([])
    }
  }

  useEffect(() => {
    findAllDepartments()
    findAllProfessional()
  }, [])

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
      night: { start: '18:00', end: '23:00' },
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
        <Block
          display='flex'
          flexDirection='column'
          gridRowGap='1rem'
          paddingTop='1rem'
          paddingLeft='0.5rem'
          paddingRight='0.5rem'>
          <Select
            placeholder='Selecione o departamento'
            labelKey='description'
            valueKey='id'
            options={departments}
            value={departamentSelect}
            onChange={(params) => setDepartamentSelect(params.value)}
          />
          <Select
            placeholder='Selecione o profissional'
            options={professional}
            value={professionalSelect}
            onChange={(params) => setProfessionalSelect(params.value)}
            labelKey='name'
            valueKey='id'
          />
          <Select
            placeholder='Selecione o recurso'
            options={[
              { id: '1', description: 'Presencial' },
              { id: '2', description: 'Remoto' },
            ]}
            value={resourceSelect}
            onChange={(params) => setResourceSelect(params.value)}
            labelKey='description'
            valueKey='id'
          />
          <DatePicker
            placeholder='Selecione a data'
            formatString='dd/MM/yyyy'
            overrides={{
              Input: {
                props: {
                  overrides: {
                    Root: {
                      style: () => ({
                        borderTopWidth: '0px',
                        borderRightWidth: '0px',
                        borderLeftWidth: '0px',
                        borderBottomWidth: '0px',
                      }),
                    },
                  },
                },
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
          {periodSelect && (
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
