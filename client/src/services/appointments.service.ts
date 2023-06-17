import axios from 'axios'
import { BACK_END_URL } from '../config/constants'

export const findAllDepartaments = async () => {
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
  if (response.data.errors) {
    throw new Error(response.data.errors[0].message)
  }
  return response.data.data.findAllDepartment.content
}

export const findAllProfessionals = async () => {
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
  if (response.data.errors) {
    throw new Error(response.data.errors[0].message)
  }
  return response.data.data.findAllProfessional.content
}

export const findStudentLogado = async (variables) => {
  const response = await axios.post(BACK_END_URL, {
    query: `
      query ($userMasterId: String) {
        findStudantLogado(userMasterId: $userMasterId) {
          name
          id
          }
        }
      `,
    variables,
  })
  if (response.data.errors) {
    throw new Error(response.data.errors[0].message)
  }
  return response.data.data.findStudantLogado
}

export const createAppointment = async (variables) => {
  const response = await axios.post(BACK_END_URL, {
    query: `
        mutation ($appointment: AppointmentInput){
          createAppointment(appointment: $appointment){
            id
          }
        }
      `,
    variables,
  })
  if (response.data.errors) {
    throw new Error(response.data.errors[0].message)
  }
  return response.data.data.createAppointment
}

export const createUser = async (variables) => {
  const response = await axios.post(BACK_END_URL, {
    query: `
        mutation ($userMaster: UserMasterInput){
          createUser(userMaster: $userMaster){
            id
          }
        }
      `,
    variables,
  })
  if (response.data.errors) {
    throw new Error(response.data.errors[0].message)
  }
  return response.data.data.createUser
}

export const findAllAppointments = async (variables) => {
  const response = await axios.post(BACK_END_URL, {
    query: `
      query ($date: LocalDate, $studantId: Long, $pageableDTO: PageableDTOInput){
        findAllAppointment(date: $date, studantId: $studantId, pageableDTO: $pageableDTO){
          content {
            id
            date
            appointmentStatus
            startTime
            endTime
            professional {
              name
              id
            }
          }
        }
      }
    `,
    variables,
  })
  if (response.data.errors) {
    throw new Error(response.data.errors[0].message)
  }
  return response.data.data.findAllAppointment.content
}

export const updateStatusAppointment = async (variables) => {
  const response = await axios.post(BACK_END_URL, {
    query: `
      mutation ($appointment: AppointmentInput, $appointmentStatus: AppointmentStatus){
        alterStatusAppointment(appointment: $appointment, appointmentStatus: $appointmentStatus){
          id
        }
      }
    `,
    variables,
  })
  if (response.data.errors) {
    throw new Error(response.data.errors[0].message)
  }
  return response.data.data.alterStatusAppointment
}
