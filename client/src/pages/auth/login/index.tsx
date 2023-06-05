import { IonContent, IonPage } from '@ionic/react'
import { withRouter } from 'react-router'
import { Block } from 'baseui/block'

import Header from '../../../components/layout/Header'
import { Heading } from '../../../components/ui/Typography'
import Input from '../../../components/ui/Form/Input'
import { Button } from '../../../components/ui/Buttons'
import { useCallback } from 'react'

const Login = ({ history }) => {
  const handleRedirectToRegister = () => {
    history.push('/register')
  }

  return (
    <IonPage>
      <Header />
      <IonContent>
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
            <Heading.Medium color='#6F738A'>Acesse</Heading.Medium>
            <Heading.XSmall color='#6F738A'>
              Utilize o e-mail e senha para entrar
            </Heading.XSmall>
          </Block>
          <Input label='Digite seu e-mail' />
          <Input label='Digite sua senha' type='password' />
          <Block display='flex' gridColumnGap='16px' marginTop='2rem'>
            <Button
              kind='outline'
              size='large'
              fullWidth
              onClick={handleRedirectToRegister}>
              Cadastrar
            </Button>
            <Button size='large' fullWidth>
              Acessar
            </Button>
          </Block>
        </Block>
      </IonContent>
    </IonPage>
  )
}

export default withRouter(Login)
