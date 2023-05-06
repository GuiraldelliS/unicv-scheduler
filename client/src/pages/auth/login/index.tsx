import { IonContent, IonPage } from '@ionic/react'
import { useHistory } from 'react-router-dom'

import Input from '../../../components/ui/Input'
import { Button } from '../../../components/ui/Buttons'
import { LogoIcon } from '../../../components/ui/Icons'

import * as Styles from './styles'

const Login = () => {
  const history = useHistory()
  return (
    <IonPage>
      <IonContent>
        <Styles.WrapperTitle>
          <LogoIcon size='32' color='red' />
          <h1>| UNIDULE</h1>
        </Styles.WrapperTitle>
        <Styles.Container>
          <Styles.WrapperForm>
            <Input placeholder='Digite seu cpf ou e-mail' />
            <Input placeholder='Digite sua senha' type='password' />
            <Button customColor='#7B9165'>Entrar</Button>
            <Button
              kind='secondary'
              onClick={(e: any) => {
                e.preventDefault()
                history.push('/register')
              }}>
              Registrar
            </Button>
          </Styles.WrapperForm>
        </Styles.Container>
      </IonContent>
    </IonPage>
  )
}

export default Login
