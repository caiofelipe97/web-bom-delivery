import React from "react";
import { TextField, FormControl } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { STATES_ENUM, CITIES_ENUM } from "../../utils/constants";
import OutlinedDiv from "../common/OutlinedDiv";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  outlinedDiv: {
    marginTop: 20,
    width: 600,
    [theme.breakpoints.down("sm")]: {
      width: 350
    }
  },
  cepDiv: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      minWidth: "90%"
    }
  },
  restaurantDiv: {
    display: "flex",
    alignItems: "center",
    minWidth: "80%"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "60%"
  },
  cityFormControl: {
    margin: theme.spacing(1),
    minWidth: "50%"
  },
  smallFormControl: {
    margin: theme.spacing(1),
    minWidth: "40%"
  },
  tinyFormControl: {
    margin: theme.spacing(1),
    minWidth: "20%"
  }
}));

const AddressForm = props => {
  const classes = useStyles();
  const {
    street,
    setStreet,
    complement,
    setComplement,
    CEP,
    setCEP,
    city,
    setCity,
    state,
    setState
  } = props;

  return (
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
            inputProps={{ maxLength: 40 }}
            onChange={e => setStreet(e.target.value)}
          />
        </FormControl>
        <FormControl className={classes.tinyFormControl}>
          <TextField
            margin="normal"
            id="complement"
            label="Complemento"
            name="complement"
            value={complement}
            inputProps={{ maxLength: 10 }}
            onChange={e => setComplement(e.target.value)}
          />
        </FormControl>
      </div>
      <div className={classes.cepDiv}>
        <div className={classes.restaurantDiv}>
          <FormControl className={classes.smallFormControl}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="cep"
              label="CEP"
              name="cep"
              value={CEP}
              inputProps={{ maxLength: 9 }}
              onChange={e => {
                let cepString = e.target.value;
                if (cepString.length === 6 && cepString.charAt(5) !== "-") {
                  let newCepString = "";
                  for (let i = 0; i < cepString.length; i++) {
                    if (i === 5) {
                      newCepString += "-" + cepString.charAt(i);
                    } else {
                      newCepString += cepString.charAt(i);
                    }
                    setCEP(newCepString);
                  }
                } else {
                  setCEP(cepString);
                }
              }}
            />
          </FormControl>
          <FormControl className={classes.cityFormControl}>
            <Autocomplete
              options={CITIES_ENUM}
              value={city}
              onChange={(_, newCity) => setCity(newCity)}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Cidade"
                  margin="normal"
                  name="city"
                  id="city"
                  fullWidth
                />
              )}
            />
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.tinyFormControl}>
            <Autocomplete
              options={STATES_ENUM}
              value={state}
              onChange={(_, newState) => setState(newState)}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Estado"
                  margin="normal"
                  name="state"
                  id="state"
                />
              )}
            />
          </FormControl>
        </div>
      </div>
    </OutlinedDiv>
  );
};

export default AddressForm;
