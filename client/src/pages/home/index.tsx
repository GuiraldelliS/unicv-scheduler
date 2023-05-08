import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { Button } from '../../components/ui/Buttons'
import Input from '../../components/ui/Form/Input'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Heading, Paragraph } from '../../components/ui/Typography'
import { useAlert } from '../../contexts/AlertContext'
import Select from '../../components/ui/Form/Select'
import Textarea from '../../components/ui/Form/Textarea'
import Section from '../../components/layout/Section'
import { useForm } from 'react-hook-form'

const schema = Yup.object().shape({
  password: Yup.string()
    .required('Senha atual é obrigatória')
    .min(6, 'Mínimo de 6 caracteres'),
})

const Home: React.FC = () => {
  const alert = useAlert()

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    reValidateMode: 'onChange',
  })

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

  const handleTestYupValidation = handleSubmit((data) => {
    console.log(data)
  })
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>UNIDULE</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>UNIDULE</IonTitle>
          </IonToolbar>
        </IonHeader>
        <>
          <Section>
            <Button onClick={handleTestYupValidation}>Primary</Button>
            <Input placeholder='CPF' mask='999.999.999-99' />
            <Input
              placeholder='senha'
              name='password'
              control={control}
              type='password'
            />
            <Select
              options={[
                { label: 'AliceBlue', id: '#F0F8FF' },
                { label: 'AntiqueWhite', id: '#FAEBD7' },
                { label: 'Aqua', id: '#00FFFF' },
                { label: 'Aquamarine', id: '#7FFFD4' },
                { label: 'Azure', id: '#F0FFFF' },
                { label: 'Beige', id: '#F5F5DC' },
              ]}
            />
            <Textarea placeholder='Textarea' />
            <Paragraph.XSmall>Paragraph XSmall</Paragraph.XSmall>
            <Paragraph.Small>Paragraph Small</Paragraph.Small>
            <Paragraph.Medium>Paragraph Medium</Paragraph.Medium>
            <Paragraph.Large>Paragraph Large</Paragraph.Large>
            <Heading.XSmall>Heading XSmall</Heading.XSmall>
            <Heading.Small>Heading Small</Heading.Small>
            <Heading.Medium>Heading Medium</Heading.Medium>
            <Heading.Large>Heading Large</Heading.Large>
          </Section>
        </>
      </IonContent>
    </IonPage>
  )
}

export default Home
