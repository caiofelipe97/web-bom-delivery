import React, { useState, useEffect } from "react";
import { Button} from '@material-ui/core';
import { connect } from "react-redux";
import { CardMedia, CircularProgress } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import StoreForm from './StoreForm';
import AddressForm from "./AddressForm";
import DeliveryForm from "./DeliveryForm";
import {editRestaurantRequest} from "../../actions/restaurant.actions";

const useStyles = makeStyles(() => ({
  formFlexbox:{
    display:'flex',
    flexDirection:'column',
    alignItems: 'center',
    maxWidth: 600,
    margin:'auto'
  },
  imgDivStyle:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  imgStyle:{
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  cancelButton:{
    marginLeft: 10,
    backgroundColor: "#F24405",
    color: "#FFFFFF"
  },
  buttons:{
    width: '100%',
    display: 'flex',
    marginTop: 10,
    justifyContent:'flex-end'
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

const Profile = (props) => {
  const classes = useStyles();

  const { restaurant, editRestaurant, loading } = props;
  const  [name, setName] = useState("");
  const [foods, setFoods] = React.useState([]);

  const  [street, setStreet] = useState("");
  const  [complement, setComplement] = useState("");
  const  [CEP, setCEP] = useState("");
  const  [city, setCity] = useState("");
  const  [state, setState] = useState("");

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [timeToDelivery, setTimeToDelivery] = useState({min:0, max:0});
  const [deliveryPrice, setDeliveryPrice] = useState(0);

  useEffect(() => {
    if(Object.entries(restaurant).length !== 0 && restaurant.constructor === Object){
      const {name, foods, timeToDelivery, deliveryPrice, paymentMethods} = restaurant;
      setName(name);
      setFoods(foods)
      if(Object.entries(restaurant.address).length !== 0){
        const {street, complement, CEP, city, state} = restaurant.address;
        setStreet(street);
        setComplement(complement);
        setCEP(CEP);
        setCity(city);
        setState(state);
      }
      setTimeToDelivery(timeToDelivery);
      setDeliveryPrice(deliveryPrice);
      setPaymentMethods(paymentMethods);
    }
  },[restaurant]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const restaurantBody = {
      name: name,
      foods: foods,
      address: {
        street: street,
        complement: complement,
        CEP: CEP,
        city: city,
        state: state
      },
      paymentMethods: paymentMethods,
      timeToDelivery: timeToDelivery,
      deliveryPrice: parseInt(deliveryPrice,10)
    };
    const restaurantId = restaurant.uid;
    editRestaurant(restaurantId, restaurantBody);
  }

  return(
    <div>
      { loading &&
      <div className={classes.progressContainer}>
        <CircularProgress className={classes.circularProgress} size={100}/>
      </div>
      }
      <h1>Perfil</h1>
        <form  onSubmit={handleSubmit} className={classes.formFlexbox}>
          <div className={classes.imgDivStyle}>
            {
              restaurant.img && <CardMedia component="img" src={restaurant.img} className={classes.imgStyle}/>
            }
            <Button
              variant="contained"
              component="label"
              color="primary"
              >
              Trocar Imagem
              <input
                  type="file"
                  style={{ display: "none" }}
              />
            </Button>
          </div>
          <StoreForm 
            name={name} 
            setName={setName} 
            foods={foods} 
            setFoods={setFoods}
            />
          <AddressForm 
            street={street} 
            setStreet={setStreet} 
            complement={complement} 
            setComplement={setComplement}
            CEP={CEP}
            setCEP={setCEP}
            city={city}
            setCity={setCity}
            state={state}
            setState={setState}
            />    
          <DeliveryForm 
            timeToDelivery={timeToDelivery}
            setTimeToDelivery={setTimeToDelivery}
            deliveryPrice={deliveryPrice}
            setDeliveryPrice={setDeliveryPrice}
            paymentMethods={paymentMethods}
            setPaymentMethods={setPaymentMethods}
            />    
          <div className={classes.buttons}>
            <Button variant="contained"  color="secondary" type="submit">Salvar</Button>
            <Button className={classes.cancelButton} variant="contained" >cancelar</Button>
          </div>
        </form>
      </div>
  )
}
const mapDispatchToProps = dispatch => ({
  editRestaurant: (restaurantId, restaurantBody) => dispatch(editRestaurantRequest(restaurantId, restaurantBody))
});

function mapStateToProps(state) {
    return {
      restaurant: state.restaurant.restaurant,
      loading: state.restaurant.loading
    };
}
export default  connect(mapStateToProps,mapDispatchToProps)(Profile);