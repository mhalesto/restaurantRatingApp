import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonIcon, IonFab, IonFabButton, IonList, IonItem, IonLabel, IonImg } from '@ionic/react';
import { getResReviewsService } from '../../services/reviews'
import { useEffect, useState } from 'react';
import { add, heartOutline, heartDislikeOutline } from 'ionicons/icons';
import { useHistory, Link } from "react-router-dom";

const Reviews: React.FC = () => {
  let history = useHistory();
  const resIdHistory: any = history.location.state
  const resId = resIdHistory.resId;

  const [reviews, setReviews] = useState([]);
  const [res_id, setResId] = useState([]);

  useEffect(() => {
    retrieveReviews();
    setResId(resId)
  }, [reviews]);

  const retrieveReviews = () => {
    getResReviewsService(resId).then((res) => {
      setReviews(res);
    });
  }

  // setTimeout(function() { retrieveReviews(); }, 9000);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Reviews</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {
          reviews.map((review: any, index) => (
            <IonCard key={index}>
              <div style={{ width: '100%', paddingLeft: 15, paddingRight: 15 }}>
                <div style={{ width: '70%', display: 'inline-block' }}> <h5 style={{ float: 'left' }}>
                  {`I ate: ${review.meal_eaten}`}
                </h5> </div>
                <div style={{ width: '30%', display: 'inline-block' }}>

                  {
                    review && review.stars && review.stars == 1 ? (
                      <IonItem lines="none">
                        <IonImg src={'https://dictionary.cambridge.org/images/thumb/star_noun_001_16391.jpg?version=5.0.199'} style={{ height: '50%', width: '100%' }} />
                      </IonItem>
                    ) :
                      review && review.stars && review.stars == 2 ? (
                        <IonItem lines="none">
                          <IonImg src={'https://dictionary.cambridge.org/images/thumb/star_noun_001_16391.jpg?version=5.0.199'} style={{ height: '50%', width: '100%', marginRight: -7 }} />
                          <IonImg src={'https://dictionary.cambridge.org/images/thumb/star_noun_001_16391.jpg?version=5.0.199'} style={{ height: '50%', width: '100%' }} />
                        </IonItem>
                      ) :
                        review.stars == 3 ? (
                          <IonItem lines="none">
                            <IonImg src={'https://dictionary.cambridge.org/images/thumb/star_noun_001_16391.jpg?version=5.0.199'} style={{ height: '50%', width: '50%', marginRight: -7 }} />
                            <IonImg src={'https://dictionary.cambridge.org/images/thumb/star_noun_001_16391.jpg?version=5.0.199'} style={{ height: '50%', width: '50%', marginRight: -7 }} />
                            <IonImg src={'https://dictionary.cambridge.org/images/thumb/star_noun_001_16391.jpg?version=5.0.199'} style={{ height: '50%', width: '50%' }} />
                          </IonItem>
                        ) :
                          review.stars == 4 ? (
                            <IonItem lines="none">
                              <IonImg src={'https://dictionary.cambridge.org/images/thumb/star_noun_001_16391.jpg?version=5.0.199'} style={{ height: '50%', width: '50%', marginRight: -7 }} />
                              <IonImg src={'https://dictionary.cambridge.org/images/thumb/star_noun_001_16391.jpg?version=5.0.199'} style={{ height: '50%', width: '50%', marginRight: -7 }} />
                              <IonImg src={'https://dictionary.cambridge.org/images/thumb/star_noun_001_16391.jpg?version=5.0.199'} style={{ height: '50%', width: '50%', marginRight: -7 }} />
                              <IonImg src={'https://dictionary.cambridge.org/images/thumb/star_noun_001_16391.jpg?version=5.0.199'} style={{ height: '50%', width: '50%' }} />
                            </IonItem>
                          ) :
                            review.stars == 5 ? (
                              <IonItem lines="none">
                                <IonImg src={'https://dictionary.cambridge.org/images/thumb/star_noun_001_16391.jpg?version=5.0.199'} style={{ height: '50%', width: '50%', marginRight: -7 }} />
                                <IonImg src={'https://dictionary.cambridge.org/images/thumb/star_noun_001_16391.jpg?version=5.0.199'} style={{ height: '50%', width: '50%', marginRight: -7 }} />
                                <IonImg src={'https://dictionary.cambridge.org/images/thumb/star_noun_001_16391.jpg?version=5.0.199'} style={{ height: '50%', width: '50%', marginRight: -7 }} />
                                <IonImg src={'https://dictionary.cambridge.org/images/thumb/star_noun_001_16391.jpg?version=5.0.199'} style={{ height: '50%', width: '50%', marginRight: -7 }} />
                                <IonImg src={'https://dictionary.cambridge.org/images/thumb/star_noun_001_16391.jpg?version=5.0.199'} style={{ height: '50%', width: '50%' }} />
                              </IonItem>
                            ) : ''
                  }


                </div>
              </div>
              <IonCardContent>

                <div style={{ marginTop: -15 }}>
                  <div style={{ width: '80%', display: 'inline-block' }}>
                    <div style={{ display: 'inline-block', position: 'absolute' }}> <IonIcon style={{ marginLeft: -5 }} icon={heartOutline} size="small" /> </div>
                    <div style={{ paddingLeft: 18, display: 'inline-block' }}>
                      {review.liked}
                    </div>
                  </div>

                  <div style={{ width: '100%' }}>
                    <div style={{ width: '80%', display: 'inline-block' }}>
                      <div style={{ display: 'inline-block', position: 'absolute' }}> <IonIcon style={{ marginLeft: -5 }} icon={heartDislikeOutline} size="small" /> </div>
                      <div style={{ paddingLeft: 18, display: 'inline-block' }}>
                        {review.disliked}
                      </div>
                    </div>

                    <div style={{ width: '20%', display: 'inline-block' }}>
                      <Link style={{ float: 'right' }}
                        to={{
                          pathname: "/review",
                          state: { resId }
                        }}
                      >Edit</Link>
                    </div>
                  </div>
                </div>

              </IonCardContent>
            </IonCard>
          ))
        }

        <div style={{ marginBottom: 100 }}></div>

        <IonFab style={{ marginBottom: 50, paddingRight: 10 }} vertical="bottom" horizontal="end" edge slot="fixed">
          <Link style={{ float: 'right' }}
            to={{
              pathname: "/review",
              state: { resId: res_id }
            }}
          >
            <IonFabButton >
              <IonIcon icon={add} />

            </IonFabButton>
          </Link>
        </IonFab>

      </IonContent>

    </IonPage>
  );
};

export default Reviews;
