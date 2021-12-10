import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonIcon, IonFab, IonFabButton } from '@ionic/react';
import { allRestaurantsService } from '../../services/restaurants'
import { useEffect, useState } from 'react';
import { locationOutline, add } from 'ionicons/icons';
import { Link, useHistory } from "react-router-dom";


const Dashboard: React.FC = () => {
  const [restaurants, setRestaurants] = useState([]);
  let history = useHistory();

  useEffect(() => {
    retrieveRestaurants();
  }, [restaurants]);

  const retrieveRestaurants = () => {
    allRestaurantsService().then((res) => {
      setRestaurants(res);
    });
  }

  // const interval = setInterval(function() {
  //   retrieveRestaurants();
  // }, 7000);

  const addRestaurant = () => {
    history.push("/addRestaurant");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>

        {
          restaurants.map((restaurant: any, index) => (
            <IonCard key={index}>
              <div style={{width: '100%', paddingLeft: 15, paddingRight: 15 }}>
                <div style={{width: '70%', display: 'inline-block'}}> <h4 style={{float: 'left'}}>{restaurant.res_name}</h4> </div>
                <div style={{width: '30%', display: 'inline-block'}}> <h6 style={{float: 'right'}}>{restaurant.res_type}</h6></div>
              </div>
              <IonCardContent>

                <div style={{width: '100%'}}>
                  <div style={{width: '80%', display: 'inline-block'}}>
                    <div style={{display: 'inline-block', position: 'absolute'}}> <IonIcon style={{marginLeft: -5}} icon={locationOutline} size="small" /> </div>
                    <div style={{paddingLeft: 18, display: 'inline-block'}}> 
                      { `${restaurant.res_city} ${restaurant.res_surbub}`}
                    </div>
                  </div>

                  <div style={{width: '20%', display: 'inline-block', float: 'right'}}>
                    {/* <a href="">Reviews</a> */}

                    <Link
                    style={{float: 'right'}}
                      to={{
                        pathname: "/reviews",
                        state: { resId: restaurant.resId }
                        // data: 'Halal' // your data array of objects
                      }}
                    > Reviews</Link>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
            )
          )
        }
        <div style={{marginBottom: 100}}></div>

        <IonFab style={{marginBottom: 50, paddingRight: 10}} vertical="bottom" horizontal="end" edge slot="fixed">
          <IonFabButton onClick={addRestaurant}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

      </IonContent>

    </IonPage>
  );
};

export default Dashboard;
