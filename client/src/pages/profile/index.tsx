import React from 'react'
import { useEffect, useState } from 'react'
import { IonContent, IonPage } from '@ionic/react'
import { Block } from 'baseui/block'
import { DatePicker } from 'baseui/datepicker'
import { Avatar } from 'baseui/avatar'
import { useAuth0 } from '@auth0/auth0-react'

import TabSelector from '../../components/ui/Form/TabSelector'
import Header from '../../components/layout/Header'
import Select from '../../components/ui/Form/Select'
import { Button } from '../../components/ui/Buttons'

import { useAlert } from '../../contexts/AlertContext'

import {
  findStudentById,
  findStudentLogado,
  updateStudent,
} from '../../services/appointments.service'
import Input from '../../components/ui/Form/Input'

const Profile: React.FC = () => {
  const [student, setStudent] = useState(null)

  const { user } = useAuth0()
  const alert = useAlert()

  const getStudentLogado = async () => {
    try {
      const studentLogado = await findStudentLogado({
        userMasterId: user.sub,
      })
      const response = await findStudentById(studentLogado.id)
      setStudent(response)
      console.log('response', response)
    } catch (error) {
      console.error(error)
      setStudent(null)
    }
  }

  const handleChange = (value, field) => {
    setStudent({ ...student, [field]: value })
  }

  const getAddressStudent = () => {
    if (student?.address?.length === 0) return {}
    const address = student?.address?.reduce((acc, item) => {
      return { ...acc, ...item }
    }, {})
    return address
  }

  const address = getAddressStudent()

  const handleChangeAddress = (value, field) => {
    const newAddress = { ...address, [field]: value }
    const newStudent = { ...student, address: [newAddress] }
    setStudent(newStudent)
  }

  const handleSubmit = async () => {
    try {
      const variables = {
        studant: {
          id: student.id,
          name: student.name,
          email: student.email,
          phone: student.phone,
          address: Array.from(student.address),
          userMaster: {
            id: user.sub,
          },
        },
      }
      console.log('variables', variables)
      await updateStudent(variables)
      alert.open({
        status: 'success',
        title: 'Sucesso!',
        message: 'Perfil atualizado com sucesso!',
      })
    } catch (error) {
      console.error(error)
      alert.open({
        status: 'error',
        title: 'Erro!',
        message: 'Erro ao atualizar perfil!',
      })
    }
  }

  useEffect(() => {
    getStudentLogado()
  }, [])
  return (
    <IonPage>
      <Header title='Perfil' />
      <IonContent fullscreen>
        <Block
          display='flex'
          flexDirection='column'
          paddingTop='1rem'
          paddingLeft='0.5rem'
          paddingRight='0.5rem'>
          <Block display='flex' justifyContent='center' alignItems='center'>
            <Avatar name={student?.name} size='2000' src={user?.picture} />
          </Block>
          <div>
            <Input
              label='Nome:'
              placeholder='Nome'
              value={student?.name}
              onChange={(e) => handleChange(e.target.value, 'name')}
            />
          </div>
          <Block aria-disabled>
            <Input
              label='Email:'
              disabled
              placeholder='Email'
              value={student?.email}
              onChange={(e) => handleChange(e.target.value, 'email')}
            />
          </Block>
          <div>
            <Input
              label='Telefone:'
              placeholder='Telefone'
              value={student?.phone}
              onChange={(e) => handleChange(e.target.value, 'phone')}
            />
          </div>
          <div>
            <Input
              label='Cidade:'
              placeholder='Cidade'
              value={address?.city}
              onChange={(e) => handleChangeAddress(e.target.value, 'city')}
            />
            <Input
              label='Número:'
              placeholder='Número'
              value={address?.houseNumber}
              onChange={(e) =>
                handleChangeAddress(e.target.value, 'houseNumber')
              }
            />
            <Input
              label='Rua:'
              placeholder='Rua'
              value={address?.street}
              onChange={(e) => handleChangeAddress(e.target.value, 'street')}
            />
          </div>
          <Block marginTop='1.5rem'>
            <Button size='large' fullWidth onClick={handleSubmit}>
              Salvar
            </Button>
          </Block>
        </Block>
      </IonContent>
    </IonPage>
  )
}

export default Profile
