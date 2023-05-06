import { useReducer } from 'react'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { Button } from '../../components/ui/Buttons'
import Input from '../../components/ui/Input'

const Home: React.FC = () => {
  const [open, toggleOpen] = useReducer((open) => !open, false)
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
          <Button onClick={toggleOpen}>Primary</Button>
          <Input kind='secondary' placeholder='CPF' />
        </>
      </IonContent>
    </IonPage>
  )
}

export default Home
