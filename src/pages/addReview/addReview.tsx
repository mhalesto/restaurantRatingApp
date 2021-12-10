import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonText, IonAlert, IonSelect, IonSelectOption } from '@ionic/react';

import React, { useState, useEffect } from 'react';
import { addReviewService } from '../../services/reviews';
import { useHistory, Link } from "react-router-dom";
import { Storage } from '@capacitor/storage';

const AddReview: React.FC = () => {
  let history = useHistory();

  const resIdHistory: any = history.location.state
  const resId = resIdHistory.resId;

  const [meal_eaten, setMealEaten] = useState<string>();
  const [liked, setLiked] = useState<string>();
  const [disliked, setDisliked] = useState<string>();
  const [stars, setStars] = useState<any>();


  const [user_id, setUserId] = useState<any>();
  const [res_id, setResId] = useState<any>();

  const [addSuccessful, setAddSuccessful] = useState<string>('');
  const [registerSuccessfulAlert, setRegisterSuccessfulAlert] = useState<boolean>(false);


  const getUserId = async () => {
    const { value } = await Storage.get({ key: 'userId' });
    setUserId(value);
    setResId(resId);
  };

  useEffect(() => {
    getUserId();
  }, []);

  const addReview = () => {
    const reviewObj = {
      meal_eaten,
      liked,
      disliked,
      stars: parseInt(stars),
      res_id: parseInt(res_id),
      user_id: parseInt(user_id)
    }

    console.log(reviewObj);

    addReviewService(reviewObj).then((res: any) => {
      if (res && res.rowCount === 1) {
        setAddSuccessful('true')
        setRegisterSuccessfulAlert(true);
      } else {
        setAddSuccessful('false')
      }
    })
  }

  const goToReviews = () => {
    setRegisterSuccessfulAlert(false);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Review</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20%' }}>
          <div style={{ width: '85%' }}>

            <IonItem>
              <IonLabel>Meal eaten</IonLabel>
              <IonSelect value={meal_eaten} placeholder="Select One" onIonChange={(e) => setMealEaten(e.detail.value)}>
                <IonSelectOption value="Legendary Steaks">Legendary Steaks</IonSelectOption>
                <IonSelectOption value="Salads and Sides">Salads and Sides</IonSelectOption>
                <IonSelectOption value="Rice">Rice</IonSelectOption>
                <IonSelectOption value="Rice and chicken">Rice and chicken</IonSelectOption>
                <IonSelectOption value="Full chicken">Full chicken</IonSelectOption>
                <IonSelectOption value="Sizzling Starters">Sizzling Starters</IonSelectOption>
                <IonSelectOption value="Ribs and Grills">Ribs and Grills</IonSelectOption>
                <IonSelectOption value="Breakfast">Breakfast</IonSelectOption>
                <IonSelectOption value="Bread and juice">Bread and juice</IonSelectOption>
                <IonSelectOption value="Milkshake and rice">Milkshake and rice</IonSelectOption>
                <IonSelectOption value="Chakalaka">Chakalaka</IonSelectOption>
                <IonSelectOption value="Rice and beef">Rice and beef</IonSelectOption>
                <IonSelectOption value="Steak and kidney pie">Steak and kidney pie</IonSelectOption>
                <IonSelectOption value="Mince">Mince</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel>liked</IonLabel>
              <IonSelect value={liked} placeholder="Select One" onIonChange={(e) => setLiked(e.detail.value)}>
                <IonSelectOption value="Legendary Steaks">Legendary Steaks</IonSelectOption>
                <IonSelectOption value="Salads and Sides">Salads and Sides</IonSelectOption>
                <IonSelectOption value="Rice">Rice</IonSelectOption>
                <IonSelectOption value="Rice and chicken">Rice and chicken</IonSelectOption>
                <IonSelectOption value="Full chicken">Full chicken</IonSelectOption>
                <IonSelectOption value="Sizzling Starters">Sizzling Starters</IonSelectOption>
                <IonSelectOption value="Ribs and Grills">Ribs and Grills</IonSelectOption>
                <IonSelectOption value="Breakfast">Breakfast</IonSelectOption>
                <IonSelectOption value="Bread and juice">Bread and juice</IonSelectOption>
                <IonSelectOption value="Milkshake and rice">Milkshake and rice</IonSelectOption>
                <IonSelectOption value="Chakalaka">Chakalaka</IonSelectOption>
                <IonSelectOption value="Rice and beef">Rice and beef</IonSelectOption>
                <IonSelectOption value="Steak and kidney pie">Steak and kidney pie</IonSelectOption>
                <IonSelectOption value="Mince">Mince</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel>disliked</IonLabel>
              <IonSelect value={disliked} placeholder="Select One" onIonChange={(e) => setDisliked(e.detail.value)}>
                <IonSelectOption value="Legendary Steaks">Legendary Steaks</IonSelectOption>
                <IonSelectOption value="Salads and Sides">Salads and Sides</IonSelectOption>
                <IonSelectOption value="Rice">Rice</IonSelectOption>
                <IonSelectOption value="Rice and chicken">Rice and chicken</IonSelectOption>
                <IonSelectOption value="Full chicken">Full chicken</IonSelectOption>
                <IonSelectOption value="Sizzling Starters">Sizzling Starters</IonSelectOption>
                <IonSelectOption value="Ribs and Grills">Ribs and Grills</IonSelectOption>
                <IonSelectOption value="Breakfast">Breakfast</IonSelectOption>
                <IonSelectOption value="Bread and juice">Bread and juice</IonSelectOption>
                <IonSelectOption value="Milkshake and rice">Milkshake and rice</IonSelectOption>
                <IonSelectOption value="Chakalaka">Chakalaka</IonSelectOption>
                <IonSelectOption value="Rice and beef">Rice and beef</IonSelectOption>
                <IonSelectOption value="Steak and kidney pie">Steak and kidney pie</IonSelectOption>
                <IonSelectOption value="Mince">Mince</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel>Rate</IonLabel>
              <IonSelect value={stars} placeholder="Select One" onIonChange={(e) => setStars(e.detail.value)}>
                <IonSelectOption value={1}>1</IonSelectOption>
                <IonSelectOption value={2}>2</IonSelectOption>
                <IonSelectOption value={3}>3</IonSelectOption>
                <IonSelectOption value={4}>4</IonSelectOption>
                <IonSelectOption value={5}>5</IonSelectOption>
              </IonSelect>
            </IonItem>

            {addSuccessful === 'false' &&
              <p style={{ color: 'red' }}>There was an error adding review</p>
            }

            <div style={{ marginTop: 15, marginBottom: 15 }}>
              <Link style={{ float: 'right' }}
                to={{
                  pathname: "/reviews",
                  state: { resId: res_id }
                }}
              >
                <IonButton expand="block" onClick={addReview} >Add</IonButton>
              </Link>
            </div>
          </div>

        </div>

        <IonAlert
          isOpen={registerSuccessfulAlert}
          onDidDismiss={() => goToReviews()}
          cssClass="my-custom-class"
          header={''}
          subHeader={''}
          message={'Review added successfully'}
          buttons={['OK']}
        />


      </IonContent>
    </IonPage>
  );
};

export default AddReview;

