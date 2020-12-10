import React, { useState, useEffect, useMemo } from "react";
import PageTitle from "../common/PageTitle";
import PageSubtitle from "../common/PageSubtitle";
import { Divider, Button, CircularProgress, Dialog } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import CategoryDialog from "./CategoryDialog";
import CategoryTable from "./CategoryTable";
import { connect } from "react-redux";
import {
  addOrEditCategory,
  addItemRequest,
  getItemsRequest
} from "../../actions";
import ItemDialog from "./ItemDialog";

const MenuTypesEnum = { category: 1, item: 2, complement: 3 };

const useStyles = makeStyles(theme => ({
  dividerStyle: {
    marginTop: 15,
    marginBottom: 15
  },
  circularProgress: {
    position: "relative",
    left: "42%",
    top: "50%",
    zIndex: 2001
  },
  progressContainer: {
    position: "fixed",
    zIndex: 2000,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    minHeight: "100%",
    marginLeft: 240,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0
    }
  }
}));

const RestaurantMenu = props => {
  const classes = useStyles();
  const { restaurant, addOrEditCategory, loading, itemLoading, addOrEditItem, items, getItems } = props;
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [isCategoryEdit, setIsCategoryEdit] = useState(false);
  const [category, setCategory] = useState({
    name: "",
    items: [],
    isPaused: false
  });
  const [categoryIndex, setCategoryIndex] = useState(-1);
  const [categoryId, setCategoryId] = useState(0);

  const [isEdit, setIsEdit] = useState(false);
  const [itemSelected, setItemSelected] = useState({
    name: "",
    description: "",
    id: 0,
    img: "",
    isPaused: false,
    price: "",
    complements: []
  });

  useEffect(()=>{
    if(restaurant.uid){
      getItems(restaurant.uid);
    }
  },[getItems, restaurant.uid])

  const handleCategoryDialogClose = () => {
    setCategoryDialogOpen(false);
    setCategory({ name: "", items: [], isPaused: false });
    setCategoryIndex(-1);
  };

  const handleItemDialogClose = () => {
    setItemDialogOpen(false);
  };

  const handleItemDialogOpen = (categoryId, isEdit, item) => {
    setItemSelected(item);
    setIsEdit(isEdit);
    setCategoryId(categoryId);
    setItemDialogOpen(true);
  };

  const handleCategoryDialogOpen = () => {
    setIsCategoryEdit(false);
    setCategoryDialogOpen(true);
  };

  const handleCategoryDialogEditOpen = (category, i) => {
    setCategory(category);
    setCategoryIndex(i);
    setIsCategoryEdit(true);
    setCategoryDialogOpen(true);
  };

  const handleCategorySave = category => {
    addOrEditCategory(restaurant.uid, restaurant, category, categoryIndex);
    handleCategoryDialogClose();
  };

  const handleDuplicateItem = item => {
    const duplicatedItem = { ...item, id: 0 };
    addOrEditItem(duplicatedItem);
  };

  const handlePause = (
    type,
    categoryIndex,
    editedItem,
    complementIndex,
    optionIndex
  ) => {
    if (!restaurant || !restaurant.categories || !type) {
      console.error("Error on pause element");
      return;
    }
    let editedCategory = restaurant.categories[categoryIndex];
    if (!editedCategory) {
      console.error("Error on pause element");
      return;
    }
    if (type === MenuTypesEnum.category) {
      editedCategory = {
        ...editedCategory,
        isPaused: !editedCategory.isPaused
      };
      addOrEditCategory(
        restaurant.uid,
        restaurant,
        editedCategory,
        categoryIndex
      );
    } else if (type === MenuTypesEnum.item) {
      if (editedItem) {
        editedItem.isPaused = !editedItem.isPaused;
        addOrEditItem(editedItem);
      }
    } else if (type === MenuTypesEnum.complement) {
      if (editedItem) {
        editedItem.complements = editedItem.complements.map((complement, i) => {
          return i === complementIndex
            ? {
                ...complement,
                options: complement.options.map((option, j) => {
                  return j === optionIndex
                    ? { ...option, isPaused: !option.isPaused }
                    : option;
                })
              }
            : complement;
        });
        addOrEditItem(editedItem);
      }
    }
  };

  const categoryItems = useMemo(() => {
    if(restaurant.categories && restaurant.categories.length > 0){
      const categories = [...restaurant.categories];
      return categories.map(category=> {
      const filteredItems = items.filter(item =>{
        return item.category === category.id;
      }) 
      return {...category, items: filteredItems};
    })
    } else {
      return [];
    }
  },[items, restaurant.categories])

  return (
    <div>
      {(loading || itemLoading) && (
        <div className={classes.progressContainer}>
          <CircularProgress className={classes.circularProgress} size={100} />
        </div>
      )}
      <PageTitle title={"Cardápio"} />
      <PageSubtitle
        subtitle={
          "O cardápio é a vitrine da sua loja no Bom Delivery App. Aqui você pode criar categorias, adicionar itens, complementos e opcionais, definir disponibilidade e alterar preços."
        }
      />
      <Divider className={classes.dividerStyle} />
      <div>
        <Button
          variant="contained"
          component="label"
          color="primary"
          onClick={handleCategoryDialogOpen}
          startIcon={<AddIcon />}
        >
          Adicionar Categoria
        </Button>
      </div>
      <div className={classes.tablesDiv}>
        { categoryItems &&
          categoryItems.map((category, i) => {
            return (
              <CategoryTable
                handleItemDialogOpen={handleItemDialogOpen}
                handleCategoryEdit={handleCategoryDialogEditOpen}
                key={i}
                category={category}
                index={i}
                handleDuplicateItem={handleDuplicateItem}
                handlePause={handlePause}
              />
            );
          })}
      </div>
      <CategoryDialog
        isEdit={isCategoryEdit}
        categoryDialogOpen={categoryDialogOpen}
        handleCategoryDialogClose={handleCategoryDialogClose}
        handleCategorySave={handleCategorySave}
        loading={loading}
        category={category}
        setCategory={setCategory}
      />
      <Dialog
        open={itemDialogOpen}
        onClose={handleItemDialogClose}
        className={classes.itemDialogStyle}
        scroll="body"
        fullWidth
        maxWidth="md"
      >
        <ItemDialog
          itemDialogOpen={itemDialogOpen}
          handleItemDialogClose={handleItemDialogClose}
          categories={restaurant.categories}
          categoryId={categoryId}
          isEdit={isEdit}
          item={itemSelected}
        />
      </Dialog>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addOrEditCategory: (restaurantId, restaurant, categoryName, categoryIndex) =>
    dispatch(
      addOrEditCategory(restaurantId, restaurant, categoryName, categoryIndex)
    ),
  addOrEditItem: (item, restaurant) =>
    dispatch(addItemRequest(item, restaurant)),
  getItems: (restaurant) =>
      dispatch(getItemsRequest(restaurant))
});

function mapStateToProps(state) {
  return {
    restaurant: state.restaurant.restaurant,
    loading: state.restaurant.loading,
    items: state.item.items,
    itemLoading: state.item.loading
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantMenu);
