import React, { useState, useEffect } from "react";
import {TextField, FormControl, Button, InputLabel,Select, MenuItem, Chip, Input, FormControlLabel, FormLabel, FormGroup, FormHelperText, InputAdornment} from '@material-ui/core';
import { connect } from "react-redux";
import { CardMedia } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import {OPTIONS_ENUM} from '../../utils/constants';
import OutlinedDiv from '../common/OutlinedDiv';
import Checkbox from '@material-ui/core/Checkbox';

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
      maxWidth:'20%',
      minWidth: '10%'
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    restaurantDiv:{
      display:'flex',
      alignItems: 'center',
      flexWrap: 'wrap'
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

const Profile = (props) => {
    const classes = useStyles();

    const { restaurant } = props;
    const  [name, setName] = useState("");
    const [options, setOptions] = React.useState([]);

    const  [adress, setAdress] = useState("");
    const  [complement, setComplement] = useState("");
    const  [CEP, setCEP] = useState("");
    const  [city, setCity] = useState("");
    const  [state, setState] = useState("");

    const [paymentMethods, setPaymentMethods] = useState({});
    const [timeToDelivery, setTimeToDelivery] = useState({min:0, max:0});
    const [deliveryPrice, setDeliveryPrice] = useState(0);

    const handleSubmit = (e) => {
    }
    return(
        <div>
            <h1>Perfil</h1>
              
              <form  onSubmit={handleSubmit} className={classes.formFlexbox}>
              <div className={classes.imgDivStyle}>
              <CardMedia component="img" src={restaurant.img} className={classes.imgStyle}/>
                  
                  <Button
                    variant="contained"
                    component="label"
                    color="secondary"
                    >
                    Trocar Imagem
                    <input
                        type="file"
                        style={{ display: "none" }}
                    />
                    </Button>
              </div>
          <OutlinedDiv label={"Estabelecimento"} className={classes.outlinedDiv}>

          <div className={classes.restaurantDiv}>

          <FormControl className={classes.formControl}>

              <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Nome do Estabelecimento"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                </FormControl>
            <FormControl className={classes.formControl}>
            <InputLabel id="options-tags">Opções do Estabelecimento</InputLabel>
            <Select
              labelId="options-tags-label"
              id="options-tags-select"
              multiple
              value={options}
              onChange={e => setOptions(e.target.value)}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <div className={classes.chips}>
                  {selected.map(value => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {OPTIONS_ENUM.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          </div>
      </OutlinedDiv>

      <OutlinedDiv label={"Endereço"} className={classes.outlinedDiv}>
          <div className={classes.restaurantDiv}>
          <FormControl className={classes.formControl}>
              <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="adress"
                    label="Endereço"
                    name="adress"
                    value={adress}
                    onChange={e => setAdress(e.target.value)}
                />
            </FormControl>
            <FormControl className={classes.smallFormControl}>
              <TextField
                    margin="normal"
                    id="complement"
                    label="Complemento"
                    name="complement"
                    value={complement}
                    onChange={e => setComplement(e.target.value)}
                />
            </FormControl>
          </div>
          <div className={classes.restaurantDiv}>
          <FormControl className={classes.formControl}>
              <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="cep"
                    label="CEP"
                    name="cep"
                    value={CEP}
                    onChange={e => setCEP(e.target.value)}
                />
            </FormControl>
            <FormControl className={classes.smallFormControl}>
              <TextField
                    margin="normal"
                    id="city"
                    label="Cidade"
                    name="city"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                />
            </FormControl>
            <FormControl className={classes.tinyFormControl}>
              <TextField
                    margin="normal"
                    id="state"
                    label="Estado"
                    name="state"
                    value={state}
                    onChange={e => setState(e.target.value)}
                />
            </FormControl>
          </div>
      </OutlinedDiv>    
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