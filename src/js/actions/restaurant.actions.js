import { myFirebase, storage } from "../firebase/firebase";


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
export const editRestaurantSuccess = () => {
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
    const {name, foods, address, paymentMethods, timeToDelivery, deliveryPrice, img} = restaurantBody;
      dispatch(editRestaurantRequestStarted());
      myFirebase.firestore().collection('restaurants').doc(restaurantId).get().then((restaurantSnapshot)=>{
        myFirebase.firestore().collection("restaurants").doc(restaurantSnapshot.id).update({
          name: name,
          foods: foods,
          address: address,
          paymentMethods: paymentMethods,
          timeToDelivery: timeToDelivery,
          deliveryPrice:deliveryPrice,
          img: img
        }).then(()=>{
          dispatch(editRestaurantSuccess())
          dispatch(getRestaurant(restaurantSnapshot.id))
      }).catch(error=>{
          dispatch(editRestaurantFailed(error));
      });
    });
     
    }
};

export const UPLOAD_RESTAURANT_IMG_REQUEST = "UPLOAD_RESTAURANT_IMG_REQUEST";
export const uploadRestaurantImgRequest = () => {
    return {
      type: UPLOAD_RESTAURANT_IMG_REQUEST
    };
};

export const UPLOAD_RESTAURANT_IMG_SUCCESS = "UPLOAD_RESTAURANT_IMG_SUCCESS";
export const uploadRestaurantImgSuccess = () => {
    return {
      type: UPLOAD_RESTAURANT_IMG_SUCCESS
    };
};

export const UPLOAD_RESTAURANT_IMG_FAILURE = "UPLOAD_RESTAURANT_IMG_FAILURE";
export const uploadRestaurantImgFailure = (error) => {
    return {
      type: UPLOAD_RESTAURANT_IMG_FAILURE,
      error
    };
};


export const uploadRestaurantImg = (imageURL, restaurant) => {
  return dispatch => {
    getFileBlob(imageURL, blob => {
      const metadata = {
      contentType: 'image/jpeg',
      };
      dispatch(uploadRestaurantImgRequest());
      const uploadTask = storage.ref(`restaurantLogos/${restaurant.uid}.jpeg`).put(blob,metadata);  
      uploadTask.on('state_changed', 
      (snapshot)=>{
      }, (error)=>{
        dispatch(uploadRestaurantImgFailure(error))
      }, ()=>{
        storage.ref(`restaurantLogos`).child(`${restaurant.uid}.jpeg`).getDownloadURL().then(imgUrl=>{
          dispatch(editRestaurantRequest(restaurant.uid, {...restaurant, img:imgUrl}))
          dispatch(uploadRestaurantImgSuccess());
        })
      }) 
    })
  }
}

const getFileBlob = function (url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.addEventListener('load', function() {
    cb(xhr.response);
  });
  xhr.send();
};

export const ADD_OR_EDIT_CATEGORY_REQUEST = "ADD_OR_EDIT_CATEGORY_REQUEST";
export const AddOrEditCategoryRequest = () => {
    return {
      type: ADD_OR_EDIT_CATEGORY_REQUEST
    };
};

export const ADD_OR_EDIT_CATEGORY_SUCCESS = "ADD_OR_EDIT_CATEGORY_SUCCESS";
export const AddOrEditCategorySuccess = () => {
    return {
      type: ADD_OR_EDIT_CATEGORY_SUCCESS
    };
};

export const ADD_OR_EDIT_CATEGORY_FAILURE = "ADD_OR_EDIT_CATEGORY_FAILURE";
export const AddOrEditCategoryFailure = (error) => {
    return {
      type: ADD_OR_EDIT_CATEGORY_FAILURE,
      error
    };
};


export const addOrEditCategory = (restaurantId, restaurant,newCategory, categoryIndex) => {
  return  dispatch => {
    let { categories } = restaurant;
    dispatch(AddOrEditCategoryRequest());
    myFirebase.firestore().collection('restaurants').doc(restaurantId).get().then((restaurantSnapshot)=>{
      //Its a new category
      if(categoryIndex <0){
        myFirebase.firestore().collection("restaurants").doc(restaurantSnapshot.id).update({
          categories: [...categories, newCategory],
        }).then(()=>{
          dispatch(AddOrEditCategorySuccess())
          dispatch(getRestaurant(restaurantSnapshot.id))
      }).catch(error=>{
          dispatch(AddOrEditCategoryFailure(error));
      });
      }else {
        categories[categoryIndex] = newCategory;
        myFirebase.firestore().collection("restaurants").doc(restaurantSnapshot.id).update({
          categories: categories,
        }).then(()=>{
          dispatch(AddOrEditCategorySuccess())
          dispatch(getRestaurant(restaurantSnapshot.id))
      }).catch(error=>{
          dispatch(AddOrEditCategoryFailure(error));
      });
      }
     
      

    });
    
    }
};