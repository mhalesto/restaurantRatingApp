import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonText, IonAlert, IonSelect, IonSelectOption } from '@ionic/react';

import React, { useState, useEffect } from 'react';
import { addRestaurantService } from '../../services/restaurants';
import { useHistory } from "react-router-dom";
import { Storage } from '@capacitor/storage';

const AddRestaurant: React.FC = () => {
  const [resName, setResName] = useState<string>();
  const [resCity, setResCity] = useState<string>();
  const [resSurbub, setResSurbub] = useState<string>();
  const [resType, setResType] = useState<string>();
  const [userId, setUserId] = useState<any>();

  const [addSuccessful, setAddSuccessful] = useState<string>('');
  const [registerSuccessfulAlert, setRegisterSuccessfulAlert] = useState<boolean>(false);
  let history = useHistory();

  const getUserId = async () => {
    const { value } = await Storage.get({ key: 'userId' });
    setUserId(value);
  };

  useEffect(() => {
    getUserId();
  }, []);

  const addRestaurant = () => {
    const restaurantObj = {
      res_name: resName,
      res_city: resCity,
      res_surbub: resSurbub,
      res_type: resType,
      user_id: parseInt(userId)
    }

    addRestaurantService(restaurantObj).then((res: any) => {
      if (res && res.rowCount === 1) {
        setAddSuccessful('true')
        setRegisterSuccessfulAlert(true);
      } else {
        setAddSuccessful('false')
      }
    })
  }

  const goToDashboard = () => {
    setRegisterSuccessfulAlert(false);
    history.push("/dashboard");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Restaurant</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20%' }}>
          <div style={{ width: '85%' }}>

            <IonItem>
              <IonLabel position="floating">Name</IonLabel>
              <IonInput
                value={resName}
                placeholder="Restaurant name"
                onIonChange={(e) => setResName(e.detail.value!)}
              >
              </IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="floating">City</IonLabel>
              <IonInput
                value={resCity}
                placeholder="Restaurant city"
                onIonChange={(e) => setResCity(e.detail.value!)}
              >
              </IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Surbub</IonLabel>
              <IonInput
                value={resSurbub}
                placeholder="Restaurant surbub"
                onIonChange={(e) => setResSurbub(e.detail.value!)}
              >
              </IonInput>
            </IonItem>


            <IonItem>
              <IonLabel>Type</IonLabel>
              <IonSelect value={resType} placeholder="Select One" onIonChange={(e) => setResType(e.detail.value)}>
                <IonSelectOption value="Italian">Italian</IonSelectOption>
                <IonSelectOption value="Indian">Indian</IonSelectOption>
                <IonSelectOption value="Steakhouse">Steakhouse</IonSelectOption>
              </IonSelect>
            </IonItem>

            { addSuccessful === 'false' &&
              <p style={{color: 'red'}}>There was an error adding restaurant</p>
            }

            <div style={{ marginTop: 15, marginBottom: 15 }}>
              <IonButton expand="block" onClick={addRestaurant} >Add</IonButton>
            </div>
          </div>

        </div>

        <IonAlert
          isOpen={registerSuccessfulAlert}
          onDidDismiss={() => goToDashboard()}
          cssClass="my-custom-class"
          header={''}
          subHeader={''}
          message={'Restaurant added successfully'}
          buttons={['OK']}
        />


      </IonContent>
    </IonPage>
  );
};

export default AddRestaurant;

