import { IonContent, IonPage } from '@ionic/react'
import { Block } from 'baseui/block'
import React from 'react'
import { useHistory } from 'react-router-dom'

import { Button } from '../../../components/ui/Buttons'

import { colors } from '../../../themes/light-theme'
import * as Styled from './styles'

const SplashScreen: React.FC = () => {
  const history = useHistory()
  const handleRedirect = (e: any, route: string) => {
    e.preventDefault()
    history.push(route)
  }
  return (
    <IonPage>
      <IonContent fullscreen>
        <Block
          display='flex'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
          backgroundColor={colors.green}
          width='100%'
          height='100%'>
          <img src='./logo-splash.png' alt='logo' />
          <Styled.WrapperActions>
            <Button
              kind='outline-dark'
              size='large'
              width='130px'
              onClick={(e) => handleRedirect(e, '/register')}>
              Cadastrar
            </Button>
            <Button
              kind='secondary'
              size='large'
              onClick={(e) => handleRedirect(e, '/login')}>
              Iniciar Sessão
            </Button>
          </Styled.WrapperActions>
        </Block>
      </IonContent>
    </IonPage>
  )
}

export default SplashScreen
