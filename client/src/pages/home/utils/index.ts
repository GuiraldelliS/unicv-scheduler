import { TIME_SCHEDULE } from '../../../config/constants'

export const getVariablesAppointment = ({
  horarioSelect,
  dateSelect,
  professionalSelect,
  resourceSelect,
  student,
}) => {
  const endTimeParts = horarioSelect.split(':')
  const horaFinal = parseInt(endTimeParts[0])
  const minutoFinal = parseInt(endTimeParts[1])
  let minutoInicio = minutoFinal - TIME_SCHEDULE
  let horaInicio = horaFinal
  if (minutoInicio < 0) {
    minutoInicio += 60
    horaInicio -= 1
  }
  const horarioInicio = `${horaInicio
    .toString()
    .padStart(2, '0')}:${minutoInicio.toString().padStart(2, '0')}`
  const variables = {
    appointment: {
      appointmentStatus: 'SCHEDULED',
      date: dateSelect.toISOString().split('T')[0],
      endTime: horarioSelect,
      professional: {
        id: professionalSelect[0].id,
      },
      resourceType: resourceSelect[0].id,
      startTime: horarioInicio,
      studant: {
        id: student.id,
      },
    },
  }
  return variables
}
