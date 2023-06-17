import { IonContent, IonPage } from '@ionic/react'
import { Block } from 'baseui/block'
import React from 'react'

import { Button } from '../../../components/ui/Buttons'

import { colors } from '../../../themes/light-theme'
import * as Styled from './styles'
import { useAuth0 } from '@auth0/auth0-react'

const SplashScreen: React.FC = () => {
  const { loginWithRedirect, user } = useAuth0()

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
              kind='secondary'
              width='100%'
              size='large'
              onClick={loginWithRedirect}>
              Iniciar Sessão
            </Button>
          </Styled.WrapperActions>
        </Block>
      </IonContent>
    </IonPage>
  )
}

export default SplashScreen
