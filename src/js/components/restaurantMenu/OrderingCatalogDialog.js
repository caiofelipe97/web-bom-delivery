import React, { useEffect, useState, useCallback } from 'react';
import {
  DialogContent,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  RootRef,
} from '@material-ui/core';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyles((theme) => ({
  ButtonStyle: {
    width: '50%',
  },
  DialogContentStyle: {
    minWidth: '400px',
    overflowY: 'unset',
  },
  subtitleStyle: {
    color: theme.palette.grey[600],
    padding: '0 24px 0 24px',
    marginBottom: 16,
  },
  MenuDiv: {
    display: 'flex',
  },
  MenuList: {
    height: '300px',
    paddingTop: '0px',
    overflowY: 'auto',
  },
  FirstList: {
    borderTop: '1px solid #e3e3e3',
    borderRight: '1px solid #e3e3e3',
  },
  MiddleList: {
    borderTop: '1px solid #e3e3e3',
    borderRight: '1px solid #e3e3e3',
    borderLeft: '1px solid #e3e3e3',
  },
  LastList: {
    borderTop: '1px solid #e3e3e3',
    borderLeft: '1px solid #e3e3e3',
  },
  CardIcon: {
    minWidth: '28px',
  },
  CardItem: {
    paddingRight: '4px',
    paddingLeft: '4px',
    cursor: 'pointer',
  },
  SelectedCardItem: {
    backgroundColor: '#F6F2F8',
    paddingRight: '4px',
    paddingLeft: '4px',
    cursor: 'pointer',
  },
  CardText: {
    fontFamily: 'Roboto',
    fontSize: '16px',
    lineHeight: 1.5,
    fontWeight: 400,
  },
  SelectedCardText: {
    fontFamily: 'Roboto',
    fontSize: '16px',
    lineHeight: 1.5,
    fontWeight: 'bold',
    color: '#78308C',
  },
}));

const OrderingCatalogDialog = (props) => {
  const {
    dialogOpen,
    handleOrderingCatalogDialogClose,
    loading,
    restaurantCategories,
  } = props;
  const classes = useStyles();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedItem, setSelectedItem] = useState({});
  const [selectedComplement, setSelectedComplement] = useState({});
  const [items, setItems] = useState([]);
  const [complements, setComplements] = useState([]);
  const [complementOptions, setComplementOptions] = useState([]);

  useEffect(() => {
    if (restaurantCategories?.length > 0) {
      setCategories(restaurantCategories);
      const firstCategory = restaurantCategories[0];
      setSelectedCategory(firstCategory);
      if (firstCategory.items?.length > 0) {
        setItems(firstCategory.items);
        const firstItem = firstCategory.items[0];
        setSelectedItem(firstItem);
        if (firstItem.complements?.length > 0) {
          setComplements(firstItem.complements);
          const firstComplement = firstItem.complements[0];
          setSelectedComplement(firstComplement);
          if (firstComplement.options?.length > 0) {
            setComplementOptions(firstComplement.options);
          }
        }
      }
    }
  }, [restaurantCategories]);

  const handleSelectCategory = useCallback((category) => {
    setSelectedCategory(category);
    if (category.items?.length > 0) {
      setItems(category.items);
      const firstItem = category.items[0];
      setSelectedItem(firstItem);
      if (firstItem.complements?.length > 0) {
        setComplements(firstItem.complements);
        const firstComplement = firstItem.complements[0];
        setSelectedComplement(firstComplement);
        if (firstComplement.options?.length > 0) {
          setComplementOptions(firstComplement.options);
        } else {
          setComplementOptions([]);
        }
      } else {
        setComplements([]);
        setSelectedComplement(null);
        setComplementOptions([]);
      }
    } else {
      setItems([]);
      setSelectedItem(null);
      setComplements([]);
      setSelectedComplement(null);
      setComplementOptions([]);
    }
  }, []);

  const handleSelectItem = useCallback((item) => {
    setSelectedItem(item);
    if (item.complements?.length > 0) {
      setComplements(item.complements);
      const firstComplement = item.complements[0];
      setSelectedComplement(firstComplement);
      if (firstComplement.options?.length > 0) {
        setComplementOptions(firstComplement.options);
      } else {
        setComplementOptions([]);
      }
    } else {
      setComplements([]);
      setSelectedComplement(null);
      setComplementOptions([]);
    }
  }, []);

  const handleSelectComplement = useCallback((complement) => {
    setSelectedComplement(complement);
    if (complement.options?.length > 0) {
      setComplementOptions(complement.options);
    } else {
      setComplementOptions([]);
    }
  }, []);

  // a little function to help us with reordering the result
  const reorder = useCallback((list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }, []);

  const onDragCategoryEnd = useCallback(
    (result) => {
      // dropped outside the list
      if (!result.destination) {
        return;
      }
      const sortedCategories = reorder(
        categories,
        result.source.index,
        result.destination.index
      );
      setCategories(sortedCategories);
    },
    [categories, reorder]
  );

  const onDragItemEnd = useCallback(
    (result) => {
      // dropped outside the list
      if (!result.destination) {
        return;
      }
      let sortedItems = [];
      if (selectedCategory.items)
        sortedItems = reorder(
          selectedCategory.items,
          result.source.index,
          result.destination.index
        );

      const updatedCategory = { ...selectedCategory, items: sortedItems };
      const updatedCategories = categories.map((category) =>
        category.id === selectedCategory.id ? updatedCategory : category
      );

      setCategories(updatedCategories);
      setSelectedCategory(updatedCategory);
      setItems(sortedItems);
    },
    [categories, reorder, selectedCategory]
  );

  const onDragComplementCategoryEnd = useCallback(
    (result) => {
      // dropped outside the list
      if (!result.destination) {
        return;
      }
      let sortedComplementCategories = [];
      if (selectedItem.complements)
        sortedComplementCategories = reorder(
          selectedItem.complements,
          result.source.index,
          result.destination.index
        );

      const updatedItem = {
        ...selectedItem,
        complements: sortedComplementCategories,
      };
      const updatedItems = selectedCategory?.items?.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      const updatedCategory = { ...selectedCategory, items: updatedItems };
      const updatedCategories = categories.map((category) =>
        category.id === selectedCategory.id ? updatedCategory : category
      );

      setCategories(updatedCategories);
      setSelectedCategory(updatedCategory);
      setItems(updatedItems);
      setSelectedItem(updatedItem);
      setComplements(sortedComplementCategories);
    },
    [categories, reorder, selectedCategory, selectedItem]
  );

  const onDragComplementOptionsEnd = useCallback(
    (result) => {
      // dropped outside the list
      if (!result.destination) {
        return;
      }
      let sortedComplementOptions = [];
      if (selectedComplement.options)
        sortedComplementOptions = reorder(
          selectedComplement.options,
          result.source.index,
          result.destination.index
        );

      const updatedComplement = {
        ...selectedComplement,
        options: sortedComplementOptions,
      };
      const updatedComplements = selectedItem?.complements?.map((complement) =>
        complement.id === updatedComplement.id ? updatedComplement : complement
      );
      const updatedItem = { ...selectedItem, complements: updatedComplements };
      const updatedItems = selectedCategory?.items?.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      const updatedCategory = { ...selectedCategory, items: updatedItems };
      const updatedCategories = categories.map((category) =>
        category.id === selectedCategory.id ? updatedCategory : category
      );

      setCategories(updatedCategories);
      setSelectedCategory(updatedCategory);
      setItems(updatedItems);
      setSelectedItem(updatedItem);
      setComplements(updatedComplements);
      setSelectedComplement(updatedComplement);
      setComplementOptions(sortedComplementOptions);
    },
    [categories, reorder, selectedCategory, selectedComplement, selectedItem]
  );

  return (
    <Dialog
      PaperProps={{
        style: {
          overflowY: 'unset',
        },
      }}
      open={dialogOpen}
      onClose={handleOrderingCatalogDialogClose}
      aria-labelledby="category-dialog-title"
      aria-describedby="category-dialog-description"
      maxWidth={'md'}
    >
      <DialogTitle id="category-dialog-title" color="primary">
        Reordenar cardápio
      </DialogTitle>
      <Typography variant="subtitle1" className={classes.subtitleStyle}>
        Selecione a categoria ou o item que voê deseja reordenar
      </Typography>

      <DialogContent className={classes.DialogContentStyle}>
        <div className={classes.MenuDiv}>
          <Box width={228}>
            <Box fontFamily="Roboto" fontWeight="fontWeightMedium" m={1}>
              Categorias
            </Box>
            <DragDropContext onDragEnd={onDragCategoryEnd}>
              <Droppable droppableId="droppable" direction="vertical">
                {(provided) => (
                  <RootRef rootRef={provided.innerRef}>
                    <List
                      className={[classes.MenuList, classes.FirstList].join(
                        ' '
                      )}
                    >
                      {categories &&
                        categories.map((category, index) => (
                          <Draggable
                            key={category.id}
                            draggableId={String(category.id)}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <ListItem
                                innerRef={provided.innerRef}
                                ContainerComponent="li"
                                ContainerProps={{ ref: provided.innerRef }}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                onClick={() => {
                                  handleSelectCategory(category);
                                }}
                                className={
                                  selectedCategory.id === category.id
                                    ? classes.SelectedCardItem
                                    : classes.CardItem
                                }
                              >
                                <ListItemIcon className={classes.CardIcon}>
                                  <DragIndicatorIcon />
                                </ListItemIcon>
                                <ListItemText
                                  disableTypography
                                  className={
                                    selectedCategory.id === category.id
                                      ? classes.SelectedCardText
                                      : classes.CardText
                                  }
                                  primary={category.name}
                                />
                              </ListItem>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </List>
                  </RootRef>
                )}
              </Droppable>
            </DragDropContext>
          </Box>
          <Box width={228}>
            <Box fontFamily="Roboto" fontWeight="fontWeightMedium" m={1}>
              Itens
            </Box>
            <DragDropContext onDragEnd={onDragItemEnd}>
              <Droppable droppableId="droppable" direction="vertical">
                {(provided) => (
                  <RootRef rootRef={provided.innerRef}>
                    <List
                      className={[classes.MenuList, classes.MiddleList].join(
                        ' '
                      )}
                    >
                      {items.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={String(item.id)}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <ListItem
                              innerRef={provided.innerRef}
                              ContainerComponent="li"
                              ContainerProps={{ ref: provided.innerRef }}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              key={index}
                              onClick={() => {
                                handleSelectItem(item);
                              }}
                              className={
                                selectedItem.id === item.id
                                  ? classes.SelectedCardItem
                                  : classes.CardItem
                              }
                            >
                              <ListItemIcon className={classes.CardIcon}>
                                <DragIndicatorIcon />
                              </ListItemIcon>
                              <ListItemText
                                disableTypography
                                className={
                                  selectedItem.id === item.id
                                    ? classes.SelectedCardText
                                    : classes.CardText
                                }
                                primary={item.name}
                              />
                            </ListItem>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </List>
                  </RootRef>
                )}
              </Droppable>
            </DragDropContext>
          </Box>
          <Box width={228}>
            <Box fontFamily="Roboto" fontWeight="fontWeightMedium" m={1}>
              Categorias de complementos
            </Box>
            <DragDropContext onDragEnd={onDragComplementCategoryEnd}>
              <Droppable droppableId="droppable" direction="vertical">
                {(provided) => (
                  <RootRef rootRef={provided.innerRef}>
                    <List
                      className={[classes.MenuList, classes.MiddleList].join(
                        ' '
                      )}
                    >
                      {complements.map((complement, index) => (
                        <Draggable
                          key={complement.id}
                          draggableId={String(complement.id)}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <ListItem
                              innerRef={provided.innerRef}
                              ContainerComponent="li"
                              ContainerProps={{ ref: provided.innerRef }}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              key={index}
                              onClick={() => {
                                handleSelectComplement(complement);
                              }}
                              className={
                                selectedComplement.name === complement.name
                                  ? classes.SelectedCardItem
                                  : classes.CardItem
                              }
                            >
                              <ListItemIcon className={classes.CardIcon}>
                                <DragIndicatorIcon />
                              </ListItemIcon>
                              <ListItemText
                                disableTypography
                                className={
                                  selectedComplement.name === complement.name
                                    ? classes.SelectedCardText
                                    : classes.CardText
                                }
                                primary={complement.name}
                              />
                            </ListItem>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </List>
                  </RootRef>
                )}
              </Droppable>
            </DragDropContext>
          </Box>
          <Box width={228}>
            <Box fontFamily="Roboto" fontWeight="fontWeightMedium" m={1}>
              Complementos
            </Box>
            <DragDropContext onDragEnd={onDragComplementOptionsEnd}>
              <Droppable droppableId="droppable" direction="vertical">
                {(provided) => (
                  <RootRef rootRef={provided.innerRef}>
                    <List
                      className={[classes.MenuList, classes.LastList].join(' ')}
                    >
                      {complementOptions.map((complementOption, index) => (
                        <Draggable
                          key={complementOption.id}
                          draggableId={String(complementOption.id)}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <ListItem
                              innerRef={provided.innerRef}
                              ContainerComponent="li"
                              ContainerProps={{ ref: provided.innerRef }}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              key={index}
                              className={classes.CardItem}
                            >
                              <ListItemIcon className={classes.CardIcon}>
                                <DragIndicatorIcon />
                              </ListItemIcon>
                              <ListItemText disableTypography
                                className={
                                  classes.CardText
                                } primary={complementOption.name} />
                            </ListItem>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </List>
                  </RootRef>
                )}
              </Droppable>
            </DragDropContext>
          </Box>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={loading}
          className={classes.ButtonStyle}
          onClick={() => {
            handleOrderingCatalogDialogClose();
          }}
          variant="contained"
          color="primary"
        >
          Salvar
        </Button>
        <Button
          disabled={loading}
          className={classes.ButtonStyle}
          onClick={() => {
            handleOrderingCatalogDialogClose();
          }}
          variant="outlined"
          color="primary"
        >
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderingCatalogDialog;
