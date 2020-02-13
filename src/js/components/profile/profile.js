import React, { useState, useEffect } from "react";
import {TextField, FormControl, Button, Input, FormControlLabel, FormLabel, FormGroup, FormHelperText, InputAdornment} from '@material-ui/core';
import { connect } from "react-redux";
import { CardMedia } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import {OPTIONS_ENUM} from '../../utils/constants';
import OutlinedDiv from '../common/OutlinedDiv';
import Checkbox from '@material-ui/core/Checkbox';
import StoreForm from './StoreForm';
import AddressForm from "./AddressForm";

const useStyles = makeStyles(theme => ({
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
    formControl:{
        margin: theme.spacing(1),
        minWidth: '45%'
    },
    smallFormControl:{
      margin: theme.spacing(1),
      minWidth: '10%',
      maxWidth: '41%'
    },
    tinyFormControl:{
      margin: theme.spacing(1),
      marginTop: 0,
      maxWidth:'25%',
      minWidth: '15%'
    },
    outlinedDiv:{
      marginTop: 20,
      minWidth: 600,
      maxWidth: 600
    },
    deliveryDiv:{
      display: 'flex',
      flexDirection:'row',
      justifyContent: 'space-between'

    },
    timeFormGroup:{
      justifyContent: 'space-around'
    },
    deliveryPriceInput: {
      marginTop: 32
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
    }
}))

const Profile = (props) => {
    const classes = useStyles();

    const { restaurant } = props;
    const  [name, setName] = useState("");
    const [foods, setFoods] = React.useState([]);

    const  [street, setStreet] = useState("");
    const  [complement, setComplement] = useState("");
    const  [CEP, setCEP] = useState("");
    const  [city, setCity] = useState("");
    const  [state, setState] = useState("");

    const [paymentMethods, setPaymentMethods] = useState({});
    const [timeToDelivery, setTimeToDelivery] = useState({min:0, max:0});
    const [deliveryPrice, setDeliveryPrice] = useState(0);

    useEffect(() => {
      if(Object.entries(restaurant).length !== 0 && restaurant.constructor === Object){
        const {name, foods} = restaurant;
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
      }
    },[restaurant]);

    const handleSubmit = (e) => {
    }
    return(
        <div>
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
    <OutlinedDiv label={"Entrega"} className={classes.outlinedDiv}>
    <div>
      
    </div>
    <div className={classes.deliveryDiv}>
       
        <div className={classes.smallFormControl}>
        <FormLabel component="legend">Tempo de entrega (Em minutos)</FormLabel>
        <FormGroup row className={classes.timeFormGroup}>
        <FormControl className={classes.tinyFormControl}>
              <TextField
                    margin="normal"
                    id="min-input"
                    label="Tempo Mínimo"
                    name="min"
                    type="number"
                    InputLabelProps={{
                      style:{
                        whiteSpace: "noWrap"
                      }
                    }}
                    value={timeToDelivery.min}
                    onChange={e => setTimeToDelivery({...timeToDelivery, min: e.target.value})}
                />
            </FormControl>
    

            <FormControl className={classes.tinyFormControl}>
              <TextField
                    margin="normal"
                    id="max-input"
                    label="Tempo Máximo"
                    name="max"
                    type="number"
                    InputLabelProps={{
                      style:{
                        whiteSpace: "noWrap"
                      }
                    }}
                    value={timeToDelivery.max}
                    onChange={e => setTimeToDelivery({...timeToDelivery, max: e.target.value})}
                />
            </FormControl>
          </FormGroup>
        </div>
        <div className={classes.smallFormControl}>

        <FormLabel component="legend">Valor da entrega</FormLabel>
        
        <FormControl className={[classes.tinyFormControl, classes.deliveryPriceInput]}>
              <Input
                id="delivery-price-inputt"
                type="number"
                value={deliveryPrice}
                onChange={e=>setDeliveryPrice(e.target.value)}
                endAdornment={<InputAdornment position="start">R$</InputAdornment>}
              />
          </FormControl>
          <FormHelperText>Este valor sempre será cobrado no final da compra no estabelecimento</FormHelperText>
            </div>
      </div>
      <div className={classes.paymentMethodsDiv}>
      <FormLabel component="legend">Formas de pagamento</FormLabel>

      <FormGroup row>

      <FormControlLabel
        control={
          <Checkbox onChange={()=>{}} value="checkedA" />
        }
        label="Dinheiro"
        />
      <FormControlLabel
        control={
          <Checkbox onChange={()=>{}}value="checkedA" />
        }
        label="Máquina Móvel"
      />
              </FormGroup>
        
        </div>

      </OutlinedDiv>    
      <div className={classes.buttons}>
        <Button variant="contained"  color="secondary" type="submit">Salvar</Button>
        <Button className={classes.cancelButton} variant="contained" >cancelar</Button>
      </div>


        </form>
        </div>
    )
}
function mapStateToProps(state) {
    return {
      user: state.auth.user,
      restaurant: state.restaurant.restaurant
    };
  }
export default  connect(mapStateToProps)(Profile);