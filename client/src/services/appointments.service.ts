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
