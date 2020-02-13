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
        dispatch(receiveRestaurant({...restaurant, uid: restaurantId}));
    }).catch(error=>{
        dispatch(restaurantError(error));
    });
}

export const EDIT_RESTAURANT_REQUEST = "EDIT_RESTAURANT_REQUEST";
export const editRestaurantRequestStarted = () => {
    return {
      type: EDIT_RESTAURANT_REQUEST
    };
};

export const EDIT_RESTAURANT_SUCCESS = "EDIT_RESTAURANT_SUCCESS";
export const editRestaurantSuccess = restaurant => {
    return {
      type: EDIT_RESTAURANT_SUCCESS
    };
};

export const EDIT_RESTAURANT_FAILURE = "EDIT_RESTAURANT_FAILURE";
export const editRestaurantFailed = (error) => {
    return {
      type: EDIT_RESTAURANT_FAILURE,
      error
    };
};

export const editRestaurantRequest = (restaurantId, restaurantBody) => {
  return  dispatch => {
    const {name, foods, address, paymentMethods, timeToDelivery, deliveryPrice} = restaurantBody;
      dispatch(editRestaurantRequestStarted());
      myFirebase.firestore().collection('restaurants').doc(restaurantId).get().then((restaurantSnapshot)=>{
        myFirebase.firestore().collection("restaurants").doc(restaurantSnapshot.id).update({
          name: name,
          foods: foods,
          address: address,
          paymentMethods: paymentMethods,
          timeToDelivery: timeToDelivery,
          deliveryPrice:deliveryPrice
        }).then(()=>{
          dispatch(editRestaurantSuccess())
          dispatch(getRestaurant(restaurantSnapshot.id))
      }).catch(error=>{
          dispatch(editRestaurantFailed(error));
      });
    });
     
    }

};