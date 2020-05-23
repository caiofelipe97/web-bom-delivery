import React, { useState } from "react";
import { OPTIONS_ENUM } from "../../utils/constants";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Input,
  FormHelperText
} from "@material-ui/core";

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
  restaurantDiv: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "45%",
    [theme.breakpoints.down("sm")]: {
      minWidth: "90%"
    }
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const StoreForm = props => {
  const [selectError, setSelectError] = useState("");

  const { name, foods, setName, setFoods } = props;
  const classes = useStyles();

  return (
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
            type="text"
            value={name}
            inputProps={{ maxLength: 30 }}
            onChange={e => setName(e.target.value)}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="options-tags-label">
            Opções do Estabelecimento
          </InputLabel>
          <Select
            labelId="options-tags-label"
            id="options-tags-select"
            multiple
            label="Opções do Estabelecimento"
            value={foods}
            onChange={e => {
              if (e.target.value.length > 3) {
                setSelectError("Só é possível selecionar 3 opções.");
              } else {
                setSelectError("");
                setFoods(e.target.value);
              }
            }}
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
          {selectError && <FormHelperText error>{selectError}</FormHelperText>}
        </FormControl>
      </div>
    </OutlinedDiv>
  );
};

export default StoreForm;
