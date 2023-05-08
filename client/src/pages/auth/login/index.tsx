import { IonContent, IonPage } from '@ionic/react'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const history = useHistory()
  return (
    <IonPage>
      <IonContent>
        <div>Login</div>
      </IonContent>
    </IonPage>
  )
}

export default Login
