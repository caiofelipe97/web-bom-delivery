import React from 'react';
import {TextField, FormControl} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {STATES_ENUM, CITIES_ENUM } from '../../utils/constants';
import OutlinedDiv from '../common/OutlinedDiv';
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  outlinedDiv:{
    marginTop: 20,
    minWidth: 600,
    maxWidth: 600
  },
  restaurantDiv:{
    display:'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  formControl:{
    margin: theme.spacing(1),
    minWidth: '45%'
  },
  smallFormControl:{
    margin: theme.spacing(1),
    minWidth: '30%',
    maxWidth: '41%'
  },
  tinyFormControl:{
    margin: theme.spacing(1),
    maxWidth:'25%',
    minWidth: '15%'
  },
}))


const AddressForm = (props) => {
  const classes = useStyles();
  const {street, setStreet, complement, setComplement, CEP, setCEP, city, setCity, state, setState} = props;

  return(
    <OutlinedDiv label={"Endereço"} className={classes.outlinedDiv}>
      <div className={classes.restaurantDiv}>
        <FormControl className={classes.formControl}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="street"
            label="Rua"
            name="street"
            value={street}
            inputProps={{maxLength: 40}}
            onChange={e => setStreet(e.target.value)}
          />
        </FormControl>
        <FormControl className={classes.smallFormControl}>
          <TextField
            margin="normal"
            id="complement"
            label="Complemento"
            name="complement"
            value={complement}
            inputProps={{maxLength: 10}}
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
            inputProps={{maxLength: 9}}
            onChange={e => {
              let cepString = e.target.value;
              if(cepString.length === 6 && cepString.charAt(5) !== "-"){
                let newCepString = "";
                for(let i=0; i < cepString.length; i++){
                    if(i===5){
                      newCepString += "-" + cepString.charAt(i);     
                    } else{
                      newCepString += cepString.charAt(i);     
                    }
                    setCEP(newCepString);
                  }
              } else {
                setCEP(cepString)
              }
            }}
          />
        </FormControl>
        <FormControl className={classes.smallFormControl}>
          <Autocomplete
            options={CITIES_ENUM}
            value={city}
              onChange={(_, newCity) => setCity(newCity)}
              renderInput={params => (
            <TextField {...params} label="Cidade" margin="normal" name="city" id="city" fullWidth/>
              )}
          />
        </FormControl>
        <FormControl className={classes.tinyFormControl}>
        <Autocomplete
            options={STATES_ENUM}
            value={state}
              onChange={(_, newState) => setState(newState)}
              renderInput={params => (
            <TextField {...params} label="Estado" margin="normal" name="state" id="state"/>
              )}
          />
        </FormControl>
      </div>
    </OutlinedDiv>  
  )
}

export default AddressForm;