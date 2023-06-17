import { useEffect, useState } from 'react'
import { IonContent, IonPage } from '@ionic/react'
import { Block } from 'baseui/block'
import { DatePicker } from 'baseui/datepicker'
import { useAuth0 } from '@auth0/auth0-react'

import TabSelector from '../../components/ui/Form/TabSelector'
import Header from '../../components/layout/Header'
import Select from '../../components/ui/Form/Select'
import { Button } from '../../components/ui/Buttons'

import { useAlert } from '../../contexts/AlertContext'

import {
  createAppointment,
  findAllDepartaments,
  findAllProfessionals,
  findStudentLogado,
} from '../../services/appointments.service'

import { mockScheduleData } from './mock'
import { DATE_PICKER_OVERIDES } from './overrides'
import { getVariablesAppointment } from './utils'
import { getScheduleByPeriods } from './utils/getScheduleByPeriods'

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
  const [student, setStudent] = useState(null)
  const [professionalSelect, setProfessionalSelect] = useState(null)
  const [departamentSelect, setDepartamentSelect] = useState(null)
  const [resourceSelect, setResourceSelect] = useState(null)
  const [dateSelect, setDateSelect] = useState(new Date())

  const { user } = useAuth0()
  const alert = useAlert()

  const getStudentLogado = async () => {
    try {
      const variables = { userMasterId: user.sub }
      const response = await findStudentLogado(variables)
      setStudent(response)
    } catch (error) {
      console.error(error)
      setStudent(null)
    }
  }

  const findAllDepartments = async () => {
    try {
      const response = await findAllDepartaments()
      setDepartments(response as any)
    } catch (error) {
      console.error(error)
      setDepartments([])
    }
  }

  const findAllProfessional = async () => {
    try {
      const response = await findAllProfessionals()
      setProfessional(response as any)
    } catch (error) {
      console.error(error)
      setProfessional([])
    }
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

  const handleSubmit = async () => {
    console.log('variables', student)
    try {
      const variables = getVariablesAppointment({
        horarioSelect,
        dateSelect,
        professionalSelect,
        resourceSelect,
        student,
      })
      console.log(variables)
      await createAppointment(variables)
      alert.open({
        status: 'success',
        title: 'Sucesso!',
        message: 'Agendamento realizado com sucesso!',
      })
    } catch (error) {
      alert.open({
        status: 'error',
        title: 'ERRO!',
        message: 'Opss! Ocorreu um erro ao realizar o agendamento!',
      })
    }
  }

  useEffect(() => {
    getStudentLogado()
    findAllDepartments()
    findAllProfessional()
  }, [])

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
              { id: 'IN_PERSON', description: 'Presencial' },
              { id: 'REMOTE', description: 'Remoto' },
            ]}
            value={resourceSelect}
            onChange={(params) => setResourceSelect(params.value)}
            labelKey='description'
            valueKey='id'
          />
          <DatePicker
            placeholder='Selecione a data'
            formatString='dd/MM/yyyy'
            value={dateSelect}
            onChange={({ date }) => setDateSelect(date)}
            overrides={DATE_PICKER_OVERIDES}
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

          <Button size='large' fullWidth onClick={handleSubmit}>
            Agendar
          </Button>
        </Block>
      </IonContent>
    </IonPage>
  )
}

export default Home
