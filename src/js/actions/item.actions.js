
import { myFirebase, storage } from "../firebase/firebase";
import { getFileBlob } from "../utils/utils";
import { getRestaurant } from "./restaurant.actions";
import { showSuccessToast, showErrorToast } from "./toast.actions";
import { v4 as uuidv4 } from 'uuid';

export const GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST";
export const GetItemsRequestStarted = () => {
  return {
    type: GET_ITEMS_REQUEST
  };
};

export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GetItemsSuccess = ({items}) => {
  return {
    type: GET_ITEMS_SUCCESS,
    items
  };
};

export const GET_ITEMS_FAILURE = "GET_ITEMS_FAILURE";
export const GetItemsFailure = error => {
  return {
    type: GET_ITEMS_FAILURE,
    error
  };
};


export const ADD_ITEM_REQUEST = "ADD_ITEM_REQUEST";
export const AddItemRequestStarted = () => {
  return {
    type: ADD_ITEM_REQUEST
  };
};

export const ADD_ITEM_SUCCESS = "ADD_ITEM_SUCCESS";
export const AddItemSuccess = (item) => {
  return {
    type: ADD_ITEM_SUCCESS,
    item
  };
};

export const ADD_ITEM_FAILURE = "ADD_ITEM_FAILURE";
export const AddItemFailure = error => {
  return {
    type: ADD_ITEM_FAILURE,
    error
  };
};

export const UPLOAD_ITEM_IMG_REQUEST = "UPLOAD_ITEM_IMG_REQUEST";
export const uploadItemImgRequestStarted = () => {
  return {
    type: UPLOAD_ITEM_IMG_REQUEST
  };
};

export const UPLOAD_ITEM_IMG_SUCCESS = "UPLOAD_ITEM_IMG_SUCCESS";
export const uploadItemImgSuccess = () => {
  return {
    type: UPLOAD_ITEM_IMG_SUCCESS
  };
};

export const UPLOAD_ITEM_IMG_FAILURE = "UPLOAD_ITEM_IMG_FAILURE";
export const uploadItemImgFailure = error => {
  return {
    type: UPLOAD_ITEM_IMG_FAILURE,
    error
  };
};

export const EDIT_ITEM_REQUEST = "EDIT_ITEM_REQUEST";
export const EditItemRequestStarted = () => {
  return {
    type: EDIT_ITEM_REQUEST
  };
};

export const EDIT_ITEM_SUCCESS = "EDIT_ITEM_SUCCESS";
export const EditItemSuccess = (item) => {
  return {
    type: EDIT_ITEM_SUCCESS,
    item
  };
};

export const EDIT_ITEM_FAILURE = "EDIT_ITEM_FAILURE";
export const EditItemFailure = error => {
  return {
    type: EDIT_ITEM_FAILURE,
    error
  };
};

export const getItemsRequest = (restaurantId) => {
  return dispatch => {
    myFirebase
    .firestore()
    .collection("items")
    .where('restaurant', '==', restaurantId).get().then(snapshot =>{
      if(snapshot.isEmpty) {
        dispatch(GetItemsSuccess({items: []}));
      } 
      const restaurantItems = snapshot.docs.map(doc => doc.data());
      dispatch(GetItemsSuccess({items: restaurantItems}));
    }).catch(err =>{
      dispatch(showErrorToast("Erro ao recuperar os items"));
      dispatch(GetItemsFailure(err));
    })
  }
}

export const addItemRequest = (item) => {
  return dispatch => {
    let newItem = {};
    let isEdit = false;
    if (item.id) {
      newItem = { ...item };
      isEdit = true;
    } else {
      newItem = { ...item, id: uuidv4() };
    }
    const { img, id } = newItem;
    if (img && (img.startsWith("blob") || !item.id)) {
      dispatch(uploadItemImgRequestStarted());
      getFileBlob(img, blob => {
        const metadata = {
          contentType: "image/jpeg"
        };
        const uploadTask = storage
          .ref(`${item.restaurant}/${id}.jpeg`)
          .put(blob, metadata);
        uploadTask.on(
          "state_changed",
          () => {},
          error => {
            dispatch(uploadItemImgFailure(error));
            if (isEdit) {
              dispatch(editItem(newItem));
            } else {
              dispatch(createItem(newItem));
            }
          },
          () => {
            storage
              .ref(`${item.restaurant}`)
              .child(`${id}.jpeg`)
              .getDownloadURL()
              .then(imgUrl => {
                dispatch(uploadItemImgSuccess());
                if (isEdit) {
                  dispatch(editItem({ ...newItem, img: imgUrl }));
                } else {
                  dispatch(createItem({ ...newItem, img: imgUrl }));
                }
              });
          }
        );
      });
    } else {
      if (isEdit) {
        dispatch(editItem(newItem));
      } else {
        dispatch(createItem(newItem));
      }
    }
  };
};

const editItem = (editedItem) => {
  return async dispatch => {
    dispatch(EditItemRequestStarted());
    
    try{
      await myFirebase.firestore().collection("items").doc(editedItem.id).update({
        name: editedItem.name,
        category: editedItem.category,
        description: editedItem.description,
        price: editedItem.price, 
        img: editedItem.img, 
        isPaused: editedItem.isPaused, 
        complements: editedItem.complements
      });
      dispatch(EditItemSuccess(editedItem));
      dispatch(showSuccessToast("O item foi atualizado com sucesso"));
    }catch(error){
      dispatch(showErrorToast("Erro ao editar o item"));
      dispatch(EditItemFailure(error));
    }


      
  };
};

const createItem = (item) => {
  return async dispatch => {
    dispatch(AddItemRequestStarted());
    try{
      await myFirebase.firestore().collection("items").doc(item.id).set(item);
      dispatch(AddItemSuccess(item));
      dispatch(showSuccessToast("O item foi adicionado com sucesso"));
    } catch(err) {
      dispatch(showErrorToast("Erro ao criar o item"));
      dispatch(AddItemFailure(err));
    }
  };
};

export const DELETE_ITEM_REQUEST = "DELETE_ITEM_REQUEST";
export const DeleteItemRequestStarted = () => {
  return {
    type: ADD_ITEM_REQUEST
  };
};

export const DELETE_ITEM_SUCCESS = "DELETE_ITEM_SUCCESS";
export const DeleteItemSuccess = (item) => {
  return {
    type: DELETE_ITEM_SUCCESS,
    item
  };
};

export const DELETE_ITEM_FAILURE = "DELETE_ITEM_FAILURE";
export const DeleteItemFailure = error => {
  return {
    type: DELETE_ITEM_FAILURE,
    error
  };
};

export const deleteItemRequest = (item) => {
  return async dispatch => {
    dispatch(DeleteItemRequestStarted());
    try{
      await myFirebase
      .firestore()
      .collection("items")
      .doc(item.id).delete();
      dispatch(DeleteItemSuccess(item));
      dispatch(showSuccessToast("O item foi deletado com sucesso"));
      if (item.img) {
        let imgRef = storage
          .ref(`${item.restaurant}`)
          .child(`${item.id}.jpeg`);
        imgRef.delete().then(
          () => {
            console.log("Imagem deletada com sucesso");
          },
          () => {
            console.log("Erro ao deletar item");
          }
        );
      }
    } catch(err){
      dispatch(DeleteItemFailure(err));
      dispatch(showErrorToast("Erro ao deletar o item"));
    }
  };
};
