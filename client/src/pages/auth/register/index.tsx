import { IonContent, IonPage } from '@ionic/react'
import { Link } from 'react-router-dom'

import Input from '../../../components/ui/Input'
import { Button } from '../../../components/ui/Buttons'

import * as Styles from './styles'
import { ArrowBackIcon } from '../../../components/ui/Icons/ArrowBackIcon'

const Register = () => {
  return (
    <IonPage>
      <IonContent>
        <Styles.ContainerActions>
          <Link to='/login'>
            <ArrowBackIcon color='#425B18' />
          </Link>
        </Styles.ContainerActions>
        <Styles.WrapperTitle>
          <h1>Cadastre-se</h1>
          <h5>Informe os dados necessários</h5>
        </Styles.WrapperTitle>
        <Styles.Container>
          <Styles.WrapperForm>
            <Input label='Nome' kind='secondary' />
            <Input label='E-mail' kind='secondary' />
            <Input label='Telefone' kind='secondary' />
            <Input label='Senha' type='password' kind='secondary' />
            <Button kind='secondary'>Cadastrar</Button>
          </Styles.WrapperForm>
        </Styles.Container>
      </IonContent>
    </IonPage>
  )
}

export default Register
