import { API_URL } from '../config';

export const allRestaurantsService = function() {
  return fetch(
    `${API_URL}/restaurants`
  )
  .then(response => response.json())
  .then(res => {
    return res
  });
}

export function addRestaurantService(restaurantObj){
  return  fetch(
    `${API_URL}/addRestaurant`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(restaurantObj)
  })
  .then((response) => response.json())
  .then((responseJson) => {

  return responseJson;

  })
  .catch((error) =>{
    console.error(error);
  });
}