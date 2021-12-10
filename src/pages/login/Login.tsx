import { IonContent, IonPage, IonInput, IonItem, IonLabel, IonButton, IonText, IonImg } from '@ionic/react';
import './Login.css';
import React, { useState } from 'react';
import { loginService } from '../../services/user';
import { useHistory } from "react-router-dom";
import { Storage } from '@capacitor/storage';

const Login: React.FC = () => {

  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loginSuccessful, setLoginSuccessful] = useState<string>('');
  let history = useHistory();

  const login = () => {
    const userObj = {
      username,
      password
    }

    loginService(userObj).then((res: any) => {
      const removeNameLoggedUser = async () => {
        await Storage.remove({ key: 'userId' });
      };
      removeNameLoggedUser();

      if(res.length > 0) {
        const logedUser = res[0];
        const userId = logedUser.userId

        const setUserId = async () => {
          await Storage.set({
            key: 'userId',
            value: userId,
          });
        };

        setUserId();
        setLoginSuccessful('true');
        history.push("/dashboard");
      } else {
        setLoginSuccessful('false');
      }
    });
  }

  return (
    <IonPage>
      <IonContent fullscreen>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10%' }}>
          <div style={{ width: '85%' }}>

            <div style={{ padding: 15 }}>
              <IonItem lines="none">
                <IonImg src={'http://st.depositphotos.com/1026166/3160/v/600/depositphotos_31605339-stock-illustration-restaurant-food-quality-badge.jpg'}
                  style={{ height: '80%', width: '100%' }} />
              </IonItem>
            </div>

            <div style={{marginTop: '15%'}}>
            <IonItem>
              <IonLabel position="floating">Username</IonLabel>
              <IonInput
                value={username}
                placeholder="Enter username"
                onIonChange={(e) => setUsername(e.detail.value!)}
              >
              </IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
              type='password'
                value={password}
                placeholder="Enter password"
                onIonChange={(e) => setPassword(e.detail.value!)}
              >
              </IonInput>
            </IonItem>

            {
              loginSuccessful === 'false' && (
                <p style={{color: 'red'}}>Incorrect username or password</p>
              )
            }

            <div style={{ marginTop: 15, marginBottom: 15 }}>
              <IonButton expand="block" onClick={login} >Login</IonButton>
            </div>

            <IonText>Not a member yet? <a href="/register">Sign up</a> </IonText>
            </div>

          </div>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Login;
