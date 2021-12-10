import { API_URL } from '../config';

export const getResReviewsService = function(res_id) {
  return fetch(
    `${API_URL}/getResReviews/${res_id}`
  )
  .then(response => response.json())
  .then(res => {
    return res
  });
}

export function addReviewService(reviewObj){
  return  fetch(
    `${API_URL}/addReview`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(reviewObj)
  })
  .then((response) => response.json())
  .then((responseJson) => {

  return responseJson;

  })
  .catch((error) =>{
    console.error(error);
  });
}