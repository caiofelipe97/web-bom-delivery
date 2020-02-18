import React, {useState} from 'react';
import PageTitle from "../common/PageTitle";
import PageSubtitle from "../common/PageSubtitle";
import { Divider, Button, CircularProgress } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CategoryDialog from './CategoryDialog';
import { connect } from "react-redux";
import {addCategory} from "../../actions/restaurant.actions";

const useStyles = makeStyles( _ => ({
    dividerStyle: {
        marginTop: 15,
        marginBottom: 15
    },
    circularProgress:{
      position: 'relative',
      left: '42%',
      top: '50%',
      zIndex: 2001
    },
    progressContainer:{
      position: 'fixed',
      zIndex: 2000,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      minHeight: '100%',
      marginLeft: 240
    }
}))


const RestaurantMenu = (props) => {
    const classes = useStyles();
    const { restaurant, addCategory, loading } = props;
    const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);

    const handleCategoryDialogClose  = () => {
        setCategoryDialogOpen(false);
      };
    
      const handleCategoryDialogOpen = () => {
        setCategoryDialogOpen(true);
      };

      const handleCategorySave = (category) => {
        addCategory(restaurant.uid, restaurant, category);
        handleCategoryDialogClose();
      }

    return(
        <div>
        { loading &&
          <div className={classes.progressContainer}>
            <CircularProgress className={classes.circularProgress} size={100}/>
          </div>
          }
            <PageTitle title={"Cardápio"}/>
            <PageSubtitle subtitle={"O cardápio é a vitrine da sua loja no Bom Delivery App. Aqui você pode criar categorias, adicionar itens, complementos e opcionais, definir disponibilidade e alterar preços."}/>
            <Divider className={classes.dividerStyle}/>
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
            <div>
              {restaurant && restaurant.categories && restaurant.categories.map(el=>{return <h2>{el.category}</h2>})}
            </div>
            <CategoryDialog 
              categoryDialogOpen={categoryDialogOpen} 
              handleCategoryDialogClose={handleCategoryDialogClose}
              handleCategorySave={handleCategorySave}
              loading={loading}
              />
        </div>
        )
}

const mapDispatchToProps = dispatch => ({
  addCategory: (restaurantId, restaurant,categoryName) => dispatch(addCategory(restaurantId, restaurant, categoryName)),
});

function mapStateToProps(state) {
    return {
      restaurant: state.restaurant.restaurant,
      loading: state.restaurant.loading
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(RestaurantMenu);