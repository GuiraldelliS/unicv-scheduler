import { useEffect, useState } from 'react'
import { IonContent, IonPage } from '@ionic/react'

import Header from '../../components/layout/Header'
import WeeklyCalendar from './components/WeeklyCalendar'
import CardAppointments from './components/CardAppointments'
import { Block } from 'baseui/block'
import { useAuth0 } from '@auth0/auth0-react'
import {
  findAllAppointments,
  findStudentLogado,
  updateStatusAppointment,
} from '../../services/appointments.service'
import { Paragraph } from '../../components/ui/Typography'

const Schedule: React.FC = () => {
  const [student, setStudent] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [dateSelect, setDateSelect] = useState(
    new Date().toISOString().split('T')[0]
  )
  const { user } = useAuth0()

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

  const getAllAppointments = async () => {
    try {
      const variables = {
        date: dateSelect,
        studantId: student.id,
        pageableDTO: {
          pageNumber: 0,
          pageSize: 999,
        },
      }
      const response = await findAllAppointments(variables)
      console.log(response)
      setAppointments(response)
    } catch (error) {
      console.error(error)
      setAppointments([])
    }
  }

  const updateAppointment = async (id) => {
    try {
      const variables = {
        appointment: {
          id,
        },
        appointmentStatus: 'FINISHED',
      }
      await updateStatusAppointment(variables)
    } catch (error) {
      console.error(error)
    }
  }

  const handleClickConfirm = async (id) => {
    updateAppointment(id)
    getAllAppointments()
  }

  useEffect(() => {
    getStudentLogado()
  }, [])

  useEffect(() => {
    if (student) {
      getAllAppointments()
    }
  }, [student, dateSelect])

  return (
    <IonPage>
      <Header title='Agenda' />
      <IonContent fullscreen>
        <Block paddingLeft='0.5rem' paddingRight='0.5rem'>
          <WeeklyCalendar
            handleClickDay={(date) =>
              setDateSelect(date.toISOString().split('T')[0])
            }
          />
          <Block paddingTop='1rem' paddingBottom='1rem'>
            <Block display='flex' flexDirection='column' gridRowGap='1rem'>
              {appointments.length > 0 ? (
                <>
                  {appointments.map((item, index) => (
                    <CardAppointments
                      key={index}
                      status={item.appointmentStatus}
                      option={item}
                      handleClick={() => handleClickConfirm(item.id)}
                    />
                  ))}
                </>
              ) : (
                <Block
                  display='flex'
                  justifyContent='center'
                  alignItems='center'>
                  <Paragraph.Small>
                    Nenhum agendamento encontrado!
                  </Paragraph.Small>
                </Block>
              )}
            </Block>
          </Block>
        </Block>
      </IonContent>
    </IonPage>
  )
}

export default Schedule
