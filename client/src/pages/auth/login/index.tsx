import React from 'react'
import { IonContent, IonPage } from '@ionic/react'
import * as Styles from './styles'
import Input from '../../../components/ui/Input'
import { Button } from '../../../components/ui/Buttons'

import { LogoIcon } from '../../../components/ui/Icons'

const Login = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <Styles.WrapperTitle>
          <LogoIcon />
          <h1>| UNIDULE</h1>
        </Styles.WrapperTitle>
        <Styles.Container>
          <Styles.WrapperForm>
            <Input placeholder='Digite seu cpf ou e-mail' />
            <Input placeholder='Digite sua senha' type='password' />
            <Button customColor='#7B9165'>Entrar</Button>
            <Button kind='secondary'>Registrar</Button>
          </Styles.WrapperForm>
        </Styles.Container>
      </IonContent>
    </IonPage>
  )
}

export default Login
