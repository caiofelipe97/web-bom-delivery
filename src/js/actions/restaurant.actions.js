import { myFirebase } from "../firebase/firebase";


export const GET_RESTAURANT_REQUEST = "GET_RESTAURANT_REQUEST";
export const requestRestaurant = () => {
    return {
      type: GET_RESTAURANT_REQUEST
    };
};

export const GET_RESTAURANT_SUCCESS = "GET_RESTAURANT_SUCCESS";
export const receiveRestaurant = restaurant => {
    return {
      type: GET_RESTAURANT_SUCCESS,
      restaurant
    };
};

export const GET_RESTAURANT_FAILURE = "GET_RESTAURANT_FAILURE";
export const restaurantError = (error) => {
    return {
      type: GET_RESTAURANT_FAILURE,
      error
    };
};

export const getRestaurant = (restaurantId) => async dispatch => {
    console.log("GET RESTAURANT...");
    dispatch(requestRestaurant());
    myFirebase.firestore().collection('restaurants').doc(restaurantId).get().then((restaurantSnapshot)=>{
        const restaurant = restaurantSnapshot.data();
        dispatch(receiveRestaurant(restaurant));
    }).catch(error=>{
        dispatch(restaurantError(error));
    });
}