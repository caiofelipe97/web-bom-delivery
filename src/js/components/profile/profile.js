import React, { useState, useEffect } from "react";
import {TextField, FormControl, Button, InputLabel,Select, MenuItem, Chip, Input } from '@material-ui/core';
import { connect } from "react-redux";
import { CardMedia } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles} from '@material-ui/core/styles';
import {OPTIONS_ENUM} from '../../utils/constants';

const useStyles = makeStyles(theme => ({
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
        minWidth: 300,
        maxWidth: 500,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
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

    const handleSubmit = (e) => {
    }
    return(
        <div>
            <h1>Perfil</h1>
              
              <form  onSubmit={handleSubmit}>
              <div className={classes.imgDivStyle}>
              <CardMedia component="img" src={restaurant.img} className={classes.imgStyle}/>
                  
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
              
              <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Nome do Estabelecimento"
                    name="name"
                    autoFocus
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
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