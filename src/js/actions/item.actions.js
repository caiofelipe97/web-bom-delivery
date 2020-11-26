
import { myFirebase, storage } from "../firebase/firebase";
import { getFileBlob } from "../utils/utils";
import { getRestaurant } from "./restaurant.actions";
import { showSuccessToast, showErrorToast } from "./toast.actions";

export const GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST";
export const GetItemsRequestStarted = () => {
  return {
    type: GET_ITEMS_REQUEST
  };
};

export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GetItemsSuccess = () => {
  return {
    type: GET_ITEMS_SUCCESS
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
export const AddItemSuccess = () => {
  return {
    type: ADD_ITEM_SUCCESS
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
    type: ADD_ITEM_SUCCESS
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
export const EditItemSuccess = () => {
  return {
    type: EDIT_ITEM_SUCCESS
  };
};

export const EDIT_ITEM_FAILURE = "EDIT_ITEM_FAILURE";
export const EditItemFailure = error => {
  return {
    type: EDIT_ITEM_FAILURE,
    error
  };
};

export const addItemRequest = (item, restaurant) => {
  return dispatch => {
    let newItem = {};
    let isEdit = false;
    if (item.id) {
      newItem = { ...item };
      isEdit = true;
    } else {
      newItem = { ...item, id: new Date().getTime() };
    }
    const { img, id } = newItem;
    if (img && (img.startsWith("blob") || !item.id)) {
      dispatch(uploadItemImgRequestStarted());
      getFileBlob(img, blob => {
        const metadata = {
          contentType: "image/jpeg"
        };

        const uploadTask = storage
          .ref(`${restaurant.uid}/${id}.jpeg`)
          .put(blob, metadata);
        uploadTask.on(
          "state_changed",
          () => {},
          error => {
            dispatch(uploadItemImgFailure(error));
            if (isEdit) {
              dispatch(editItem(newItem, restaurant));
            } else {
              dispatch(createItem(newItem, restaurant));
            }
          },
          () => {
            storage
              .ref(`${restaurant.uid}`)
              .child(`${id}.jpeg`)
              .getDownloadURL()
              .then(imgUrl => {
                dispatch(uploadItemImgSuccess());
                if (isEdit) {
                  dispatch(editItem({ ...newItem, img: imgUrl }, restaurant));
                } else {
                  dispatch(createItem({ ...newItem, img: imgUrl }, restaurant));
                }
              });
          }
        );
      });
    } else {
      if (isEdit) {
        dispatch(editItem(newItem, restaurant));
      } else {
        dispatch(createItem(newItem, restaurant));
      }
    }
  };
};

const editItem = (editedItem, restaurant) => {
  return dispatch => {
    dispatch(EditItemRequestStarted());

    let { categories } = restaurant;
    const categoryIndex = categories.findIndex(
      category => category.id === editedItem.category
    );
    const { items } = categories[categoryIndex];
    const itemIndex = items.findIndex(item => item.id === editedItem.id);
    categories[categoryIndex].items[itemIndex] = editedItem;
    const arrayOfCategories = JSON.parse(JSON.stringify(categories));
    myFirebase
      .firestore()
      .collection("restaurants")
      .doc(restaurant.uid)
      .get()
      .then(restaurantSnapshot => {
        myFirebase
          .firestore()
          .collection("restaurants")
          .doc(restaurantSnapshot.id)
          .set(
            {
              categories: arrayOfCategories
            },
            { merge: true }
          )
          .then(() => {
            dispatch(EditItemSuccess());
            dispatch(getRestaurant(restaurantSnapshot.id));
            dispatch(showSuccessToast("O item foi atualizado com sucesso"));
          })
          .catch(error => {
            dispatch(showErrorToast("Erro ao editar o item"));
            dispatch(EditItemFailure(error));
          });
      });
  };
};

const createItem = (item, restaurant) => {
  return dispatch => {
    dispatch(AddItemRequestStarted());

    let { categories } = restaurant;
    const categoryIndex = categories.findIndex(
      category => category.id === item.category
    );
    categories[categoryIndex].items.push(item);

    myFirebase
      .firestore()
      .collection("restaurants")
      .doc(restaurant.uid)
      .get()
      .then(restaurantSnapshot => {
        myFirebase
          .firestore()
          .collection("restaurants")
          .doc(restaurantSnapshot.id)
          .update({
            categories: categories
          })
          .then(() => {
            dispatch(AddItemSuccess());
            dispatch(getRestaurant(restaurantSnapshot.id));
            dispatch(showSuccessToast("O item adicionado com sucesso"));
          })
          .catch(error => {
            dispatch(showErrorToast("Erro ao criar o item"));
            dispatch(AddItemFailure(error));
          });
      });
  };
};

export const DELETE_ITEM_REQUEST = "DELETE_ITEM_REQUEST";
export const DeleteItemRequestStarted = () => {
  return {
    type: ADD_ITEM_REQUEST
  };
};

export const DELETE_ITEM_SUCCESS = "DELETE_ITEM_SUCCESS";
export const DeleteItemSuccess = () => {
  return {
    type: DELETE_ITEM_SUCCESS
  };
};

export const DELETE_ITEM_FAILURE = "DELETE_ITEM_FAILURE";
export const DeleteItemFailure = error => {
  return {
    type: DELETE_ITEM_FAILURE,
    error
  };
};

export const deleteItemRequest = (item, restaurant) => {
  return dispatch => {
    dispatch(DeleteItemRequestStarted());
    let { categories } = restaurant;
    const categoryIndex = categories.findIndex(
      category => category.id === item.category
    );
    const itemIndex = categories[categoryIndex].items.findIndex(
      el => el.id === item.id
    );
    categories[categoryIndex].items.splice(itemIndex, 1);

    myFirebase
      .firestore()
      .collection("restaurants")
      .doc(restaurant.uid)
      .get()
      .then(restaurantSnapshot => {
        myFirebase
          .firestore()
          .collection("restaurants")
          .doc(restaurantSnapshot.id)
          .update({
            categories: categories
          })
          .then(() => {
            if (item.img) {
              let imgRef = storage
                .ref(`${restaurant.uid}`)
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
            dispatch(AddItemSuccess());

            dispatch(getRestaurant(restaurantSnapshot.id));
            dispatch(showSuccessToast("O item foi deletado com sucesso"));
          })
          .catch(error => {
            dispatch(AddItemFailure(error));
            dispatch(showErrorToast("Erro ao deletar o item"));
          });
      });
  };
};
