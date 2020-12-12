
import { myFirebase, storage } from "../firebase/firebase";
import { getFileBlob } from "../utils/utils";
import { showSuccessToast, showErrorToast } from "./toast.actions";
import { v4 as uuidv4 } from 'uuid';
import { getRestaurant } from "./restaurant.actions";

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

export const addItemRequest = (item, restaurant) => {
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
              dispatch(editItem(newItem, restaurant));
            } else {
              dispatch(createItem(newItem, restaurant));
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
  return async dispatch => {
    dispatch(EditItemRequestStarted());
    
    try{
      const categories =  restaurant.categories ? restaurant.categories : [];
      const categoryIndex = categories.findIndex(category => category.id === editedItem.category);
      if (categoryIndex < 0) {
        throw Error("Categoria do item não encontrada");
      }
      let updatedCategory = {...categories[categoryIndex]};
      const itemIndex = updatedCategory.items ? updatedCategory.items.findIndex(categoryItem => categoryItem === editedItem.id) : -1;
      
      if(itemIndex < 0) {
        const removedCategoryIndex = categories.findIndex(category => category.items ? (category.items.findIndex(item => item === editedItem.id) >= 0) : false)
        let removedCategory =  categories[removedCategoryIndex];
        removedCategory.items = removedCategory?.items.filter(item => item !== editedItem.id);

        if(updatedCategory.items)
          updatedCategory.items.push(editedItem.id);
        else {
          updatedCategory.items = [];
          updatedCategory.items.push(editedItem.id);
        }
        if(categoryIndex) categories[categoryIndex] = updatedCategory;   
        if(removedCategoryIndex) categories[removedCategoryIndex] = removedCategory;
    
        const promise1 = myFirebase
        .firestore()
        .collection("restaurants")
        .doc(restaurant.uid)
        .update({
          categories: categories
        })
        const promise2= myFirebase.firestore().collection("items").doc(editedItem.id).update({
          name: editedItem.name,
          category: editedItem.category,
          description: editedItem.description,
          price: editedItem.price, 
          img: editedItem.img, 
          isPaused: editedItem.isPaused, 
          complements: editedItem.complements
        });
        await Promise.all([promise1, promise2]);
        dispatch(EditItemSuccess(editedItem));
        dispatch(getRestaurant(restaurant.uid));
      } else {
        await myFirebase.firestore().collection("items").doc(editedItem.id).update({
          name: editedItem.name,
          description: editedItem.description,
          price: editedItem.price, 
          img: editedItem.img, 
          isPaused: editedItem.isPaused, 
          complements: editedItem.complements
        })
        dispatch(EditItemSuccess(editedItem));
      }
      
      dispatch(showSuccessToast("O item foi atualizado com sucesso"));
      
    }catch(error){
      console.log(error)
      dispatch(showErrorToast("Erro ao editar o item"));
      dispatch(EditItemFailure(error));
    }


      
  };
};

const createItem = (item, restaurant) => {
  return async dispatch => {
    dispatch(AddItemRequestStarted());
    try{
      const categories =  restaurant.categories ? restaurant.categories : [];
      const categoryIndex = categories.findIndex(category => category.id === item.category);
      if (categoryIndex < 0) {
        throw Error("Categoria do item não encontrada");
      }
      let updatedCategory = categories[categoryIndex];
      if(updatedCategory.items){
        updatedCategory.items.push(item.id);
      } else{
        updatedCategory.items = [];
        updatedCategory.items.push(item.id);
    }
      categories[categoryIndex] = updatedCategory;
      const promise1 = myFirebase
      .firestore()
      .collection("restaurants")
      .doc(restaurant.uid)
      .update({
        categories: categories
      })
      const promise2 = myFirebase.firestore().collection("items").doc(item.id).set(item);
      await Promise.all([promise1, promise2]);
      dispatch(AddItemSuccess(item));
      dispatch(showSuccessToast("O item foi adicionado com sucesso"));
    } catch(err) {
      console.log(err);
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

export const deleteItemRequest = (item, restaurant) => {
  return async dispatch => {
    dispatch(DeleteItemRequestStarted());
    try{
      const categories =  restaurant.categories ? restaurant.categories : [];
      const categoryIndex = categories.findIndex(category => category.id === item.category);
      if (categoryIndex < 0) {
        throw Error("Categoria do item não encontrada");
      }
      let updatedCategory = categories[categoryIndex];
      updatedCategory.items = updatedCategory.items.filter(categoryItem => categoryItem !== item.id);
      categories[categoryIndex] = updatedCategory;
      const promise1 = myFirebase
        .firestore()
        .collection("restaurants")
        .doc(restaurant.uid)
        .update({
          categories: categories
      })
      const promise2 = myFirebase
        .firestore()
        .collection("items")
        .doc(item.id).delete();
      await Promise.all([promise1, promise2]);

      dispatch(DeleteItemSuccess(item));
      dispatch(getRestaurant(restaurant.uid));
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
