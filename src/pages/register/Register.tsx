import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonText, IonAlert } from '@ionic/react';
import './Register.css';

import React, { useState, useEffect } from 'react';
import { registerService } from '../../services/user';
import { useHistory } from "react-router-dom";

const Register: React.FC = () => {

  const [username, setUsername] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();

  const [registerSuccessful, setRegisterSuccessful] = useState<string>('');
  const [registerSuccessfulAlert, setRegisterSuccessfulAlert] = useState<boolean>(false);
  const [passwordMatch, setPasswordMatch] = useState<string>('');
  let history = useHistory();

  const registerUser = () => {
    const userObj = {
      username,
      address,
      password
    }

    if (password === confirmPassword) {
      setPasswordMatch('true');

      registerService(userObj).then((res: any) => {
        if (res && res.rowCount === 1) {
          setRegisterSuccessful('true');
          setRegisterSuccessfulAlert(true);
        } else {
          setRegisterSuccessful('false');
        }
      })
    } else {
      setPasswordMatch('false')
    }
  }

  const goToLogin = () => {
    setRegisterSuccessfulAlert(false);
    history.push("/login");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registration</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20%' }}>
          <div style={{ width: '85%' }}>

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
              <IonLabel position="floating">Address</IonLabel>
              <IonInput
                value={address}
                placeholder="Enter location"
                onIonChange={(e) => setAddress(e.detail.value!)}
              >
              </IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                value={password}
                placeholder="Enter password"
                onIonChange={(e) => setPassword(e.detail.value!)}
              >
              </IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Confirm Password</IonLabel>
              <IonInput
                value={confirmPassword}
                placeholder="Confirm password"
                onIonChange={(e) => setConfirmPassword(e.detail.value!)}
              >
              </IonInput>
            </IonItem>

            {
              passwordMatch === 'false' ?
                <p style={{ color: 'red' }}>Password don't match</p>
                : (registerSuccessful === 'false') ?
                  <p style={{ color: 'red' }}>Username taken</p>
                  : ''
            }

            <div style={{ marginTop: 15, marginBottom: 15 }}>
              <IonButton expand="block" onClick={registerUser} >Register</IonButton>
            </div>

            <IonText>Already a member? <a href="/login">Login</a> </IonText>
          </div>

        </div>

        <IonAlert
          isOpen={registerSuccessfulAlert}
          onDidDismiss={() => goToLogin()}
          cssClass="my-custom-class"
          header={''}
          subHeader={''}
          message={'Registration successful now login.'}
          buttons={['OK']}
        />


      </IonContent>
    </IonPage>
  );
};

export default Register;
