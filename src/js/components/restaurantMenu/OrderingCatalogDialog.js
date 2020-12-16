import React, {useEffect, useState, useCallback} from 'react';
import { DialogContent, Dialog,DialogTitle, DialogActions, Button, Typography, List, ListItem, ListItemIcon, ListItemText, Box } from '@material-ui/core';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles( (theme) => ({
    ButtonStyle: {
      width: '50%',
    },
    DialogContentStyle:{
      minWidth: '400px',
    },
    subtitleStyle: {
      color: theme.palette.grey[600],
      padding: '0 24px 0 24px',
      marginBottom: 16
    },
    MenuDiv: {
      display: 'flex'
    },
    MenuList: {
      height: '300px',
      overflow: 'auto',
      paddingTop: '0px'
    },
    FirstList: {
      borderTop: '1px solid #e3e3e3',
      borderRight: '1px solid #e3e3e3',
    },
    MiddleList: {
      borderTop: '1px solid #e3e3e3',
      borderRight: '1px solid #e3e3e3',
      borderLeft: '1px solid #e3e3e3'
    },
    LastList: {
      borderTop: '1px solid #e3e3e3',
      borderLeft: '1px solid #e3e3e3'
    },
    CardIcon: {
      minWidth: '28px'
    },
    CardItem: {
      paddingRight: '4px',
      paddingLeft:  '4px',
      cursor: 'pointer'
    },
    SelectedCardItem: {
      backgroundColor: '#F6F2F8',
      paddingRight: '4px',
      paddingLeft:  '4px',
      cursor: 'pointer'

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
      color: '#78308C'
    }
}))


const OrderingCatalogDialog = (props) => {
    const {dialogOpen, handleOrderingCatalogDialogClose, loading, categories} = props;
    const classes = useStyles();

    const [selectedCategory, setSelectedCategory] = useState({});
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedComplement, setSelectedComplement] = useState({});
    const [items, setItems] = useState([]);
    const [complements, setComplements] = useState([]);
    const [complementOptions, setComplementOptions] = useState([]);

    useEffect(()=>{
      if(categories?.length > 0){
        const firstCategory = categories[0];
        setSelectedCategory(firstCategory);
        if(firstCategory.items?.length > 0) {
          setItems(firstCategory.items);
          const firstItem = firstCategory.items[0];
          setSelectedItem(firstItem);
          if(firstItem.complements?.length > 0) {
            setComplements(firstItem.complements);
            const firstComplement = firstItem.complements[0];
            setSelectedComplement(firstComplement);
            if(firstComplement.options?.length > 0) {
              setComplementOptions(firstComplement.options);
            }
          }
        }
      }
    },[categories])
    
    const handleSelectCategory = useCallback((category)=>{
      setSelectedCategory(category);
        if(category.items?.length > 0) {
          setItems(category.items);
          const firstItem = category.items[0];
          setSelectedItem(firstItem);
          if(firstItem.complements?.length > 0) {
            setComplements(firstItem.complements);
            const firstComplement = firstItem.complements[0];
            setSelectedComplement(firstComplement);
            if(firstComplement.options?.length > 0) {
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

    const handleSelectItem = useCallback((item)=>{
      setSelectedItem(item);
      if(item.complements?.length > 0) {
        setComplements(item.complements);
        const firstComplement = item.complements[0];
        setSelectedComplement(firstComplement);
        if(firstComplement.options?.length > 0) {
          setComplementOptions(firstComplement.options);
        } else {
          setComplementOptions([])
        }
      } else {
        setComplements([]);
        setSelectedComplement(null);
        setComplementOptions([]);
      }
    }, []);

    const handleSelectComplement = useCallback((complement)=>{
        setSelectedComplement(complement);
        if(complement.options?.length > 0) {
          setComplementOptions(complement.options);
        } else {
          setComplementOptions([])
        }
    }, []);

    return(
      <Dialog
          open={dialogOpen}
          onClose={handleOrderingCatalogDialogClose}
          aria-labelledby="category-dialog-title"
          aria-describedby="category-dialog-description"
          maxWidth={'md'}
        >
        <DialogTitle id="category-dialog-title" color="primary">Reordenar cardápio</DialogTitle>
        <Typography variant="subtitle1" className={classes.subtitleStyle}>Selecione a categoria ou o item que voê deseja reordenar</Typography>

        <DialogContent className={classes.DialogContentStyle}>
            <div className={classes.MenuDiv}>
              <Box width={228}>
                <Box fontFamily="Roboto" fontWeight="fontWeightMedium" m={1}>
                  Categorias
                </Box>
                <List className={[classes.MenuList, classes.FirstList]}>
                {categories && categories.map((category, index) =>
                  <ListItem onClick={()=>{handleSelectCategory(category)}} className={selectedCategory.id === category.id ? classes.SelectedCardItem : classes.CardItem}>
                  <ListItemIcon className={classes.CardIcon}>
                      <DragIndicatorIcon/>
                    </ListItemIcon>
                    <ListItemText disableTypography className={selectedCategory.id === category.id ? classes.SelectedCardText : classes.CardText} primary={category.name}/>
                  </ListItem>
                )}
                </List>
              </Box>
              <Box width={228}>
                <Box fontFamily="Roboto" fontWeight="fontWeightMedium" m={1}>
                  Itens
                </Box>
                <List className={[classes.MenuList, classes.MiddleList]}>
                  {items.map(item =>(
                    <ListItem onClick={()=>{handleSelectItem(item)}} className={selectedItem.id === item.id ? classes.SelectedCardItem : classes.CardItem}>
                    <ListItemIcon className={classes.CardIcon}>
                      <DragIndicatorIcon/>
                    </ListItemIcon>
                    <ListItemText disableTypography className={selectedItem.id === item.id ? classes.SelectedCardText : classes.CardText} primary={item.name}/>
                  </ListItem>
                  ))}
                </List>
              </Box>
              <Box width={228}>
                <Box fontFamily="Roboto" fontWeight="fontWeightMedium" m={1}>
                  Categorias de complementos
                </Box>
                <List className={[classes.MenuList, classes.MiddleList]}>
                  {complements.map((complement, index) => (
                    <ListItem onClick={()=>{handleSelectComplement(complement)}} className={selectedComplement.name === complement.name ? classes.SelectedCardItem : classes.CardItem}>
                      <ListItemIcon className={classes.CardIcon}>
                        <DragIndicatorIcon/>
                      </ListItemIcon>
                      <ListItemText disableTypography className={selectedComplement.name === complement.name ? classes.SelectedCardText : classes.CardText} primary={complement.name}/>
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Box width={228}>
                <Box fontFamily="Roboto" fontWeight="fontWeightMedium" m={1}>
                  Complementos
                </Box>
                <List className={[classes.MenuList, classes.LastList]}>
                  {complementOptions.map((complementOption, index) =>  (
                    <ListItem className={classes.CardItem}>
                    <ListItemIcon className={classes.CardIcon}>
                        <DragIndicatorIcon/>
                      </ListItemIcon>
                      <ListItemText primary={complementOption.name}/>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </div>
            </DialogContent>
        <DialogActions>
            <Button disabled={loading} className={classes.ButtonStyle} onClick={()=>{
       handleOrderingCatalogDialogClose()
              }}  variant="contained"  color="primary">
            Salvar
          </Button>
          <Button disabled={loading} className={classes.ButtonStyle}  onClick={()=>{
             handleOrderingCatalogDialogClose()
              }} variant="outlined"  color="primary">
            Cancelar
          </Button>
          
        </DialogActions>
      </Dialog>    )
}

export default OrderingCatalogDialog;