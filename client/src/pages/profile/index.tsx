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
  updateStudent,
} from '../../services/appointments.service'
import Input from '../../components/ui/Form/Input'

const Profile: React.FC = () => {
  const [student, setStudent] = useState(null)

  const { user } = useAuth0()
  const alert = useAlert()

  const getStudentLogado = async () => {
    try {
      const response = await findStudentById(1)
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

  const handleChangeAddress = (value, field, index) => {
    const address = Array.from(student.address)
    address[index] = { ...(address[index] as any), [field]: value }
    setStudent({ ...student, address })
  }

  const getAddressStudent = () => {
    if (student?.address.length === 0) return {}
    const address = student.address.reduce((acc, item) => {
      return { ...acc, ...item }
    }, {})
    return address
  }

  console.log('student', getAddressStudent())

  const handleSubmit = async () => {
    try {
      const variables = {
        studant: {
          id: student.id,
          name: student.name,
          email: student.email,
          address: Array.from(student.address),
        },
      }
      console.log('variables', variables)
      // await updateStudent(variables)
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
          <div>
            <Input
              label='Email:'
              placeholder='Email'
              value={student?.email}
              onChange={(e) => handleChange(e.target.value, 'email')}
            />
          </div>
          <div>
            <Input
              label='Telefone:'
              placeholder='Telefone'
              value={student?.phone_number}
              onChange={(e) => console.log('e', e)}
            />
          </div>
          <div>
            <Input
              label='Cidade:'
              placeholder='Cidade'
              value={user?.address}
              onChange={(e) => console.log('e', e)}
            />
            <Input
              label='Número:'
              placeholder='Número'
              value={user?.address}
              onChange={(e) => console.log('e', e)}
            />
            <Input
              label='Rua:'
              placeholder='Rua'
              value={user?.address}
              onChange={(e) => console.log('e', e)}
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
