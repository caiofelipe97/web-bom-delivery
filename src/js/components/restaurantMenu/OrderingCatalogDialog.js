import React, {useEffect, useState} from 'react';
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
      maxHeight: '300px',
      overflow: 'auto'
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
    console.log(categories);    
    
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
                <List className={classes.MenuList}>
                {categories && categories.map((category, index) =>
                  <ListItem>
                    <ListItemIcon>
                      <DragIndicatorIcon/>
                    </ListItemIcon>
                    <ListItemText primary={category.name}/>
                  </ListItem>
                )}
                </List>
              </Box>
              <Box width={228}>
                <Box fontFamily="Roboto" fontWeight="fontWeightMedium" m={1}>
                  Itens
                </Box>
                <List className={classes.MenuList}>
                  {items.map(item =>(
                    <ListItem>
                    <ListItemIcon>
                      <DragIndicatorIcon/>
                    </ListItemIcon>
                    <ListItemText primary={item.name}/>
                  </ListItem>
                  ))}
                </List>
              </Box>
              <Box width={228}>
                <Box fontFamily="Roboto" fontWeight="fontWeightMedium" m={1}>
                  Categorias de complementos
                </Box>
                <List className={classes.MenuList}>
                  {complements.map((complement, index) => (
                    <ListItem>
                      <ListItemIcon>
                        <DragIndicatorIcon/>
                      </ListItemIcon>
                      <ListItemText primary={complement.name}/>
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Box width={228}>
                <Box fontFamily="Roboto" fontWeight="fontWeightMedium" m={1}>
                  Complementos
                </Box>
                <List className={classes.MenuList}>
                  {complementOptions.map((complementOption, index) =>  (
                    <ListItem>
                      <ListItemIcon >
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