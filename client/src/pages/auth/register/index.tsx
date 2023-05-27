import { IonContent, IonPage } from '@ionic/react'
import { Block } from 'baseui/block'

import Header from '../../../components/layout/Header'
import { Heading } from '../../../components/ui/Typography'
import Input from '../../../components/ui/Form/Input'
import { Button } from '../../../components/ui/Buttons'

const Register = () => {
  return (
    <IonPage>
      <IonContent>
        <Header title='Tela de login' />
        <Block
          display='flex'
          flexDirection='column'
          gridColumnGap='8px'
          padding='8px'>
          <Block
            display='flex'
            flexDirection='column'
            gridColumnGap='16px'
            marginTop='16px'
            marginBottom='16px'>
            <Heading.Medium color='#6F738A'>Cadastre-se</Heading.Medium>
            <Heading.XSmall color='#6F738A'>
              Informe os dados necessários
            </Heading.XSmall>
          </Block>
          <Input label='Digite seu nome' />
          <Input label='Digite seu e-mail' />
          <Input label='Digite seu telefone' />
          <Input label='Digite sua senha' type='password' />
          <Block marginTop='2rem'>
            <Button size='large' fullWidth>
              Criar nova conta
            </Button>
          </Block>
        </Block>
      </IonContent>
    </IonPage>
  )
}

export default Register
