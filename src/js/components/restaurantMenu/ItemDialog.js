import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from "react-dom";
import { 
    DialogContent, 
    DialogTitle, 
    DialogActions,
    Button, 
    TextField, 
    Link,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    InputAdornment,
    FormHelperText
 } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import PauseSalesButton from './PauseSalesButton';

const useStyles = makeStyles( (theme) => ({
    ButtonStyle: {
        width: '50%',
    },
    DialogContentStyle:{
        minWidth: '500px'
    },
    linkStyle:{
        cursor:'pointer',
        fontWeight: 500,
        fontSize: "0.875rem",
        fontFamily: 'Roboto'
    },
    pictureDiv:{
        width: 100,
        height: 100,
        border: '2px dotted #999',
        borderColor: theme.palette.grey[400],
        marginTop: 20
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '48%',
      },
      fullFormControl:{
        margin: theme.spacing(1),
        width: '100%'
      },
    mainDivStyle:{
      display: 'flex'
    },
    nameDiv:{
      display:'flex',
      alignItems: 'start'
    },
    categoryInput:{
      marginTop: 24
    },
    formsDiv:{
      width: '100%'
    },
    priceFormControl:{
      margin: theme.spacing(1),
      width:'30%'
    },
    priceDiv:{
      display:'flex',
      alignItems: 'center'
    },
    pauseDiv:{
      width: '70%',
      marginLeft: 10
    }
}))


const ItemDialog = (props) => {
    const {itemDialogOpen, handleItemDialogClose} = props;
    const classes = useStyles();

    const [img, setImg] = useState("");
    const  [name, setName] = useState("");
    const  [category, setCategory] = useState("");
    const  [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);


    
    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    useEffect(() => {
        if(inputLabel.current){
            setLabelWidth(inputLabel.current.offsetWidth);

        }
    }, []);
  

    return(
        <div>
        <DialogTitle id="category-dialog-title" color="primary">Criar item</DialogTitle>
        <DialogContent className={classes.DialogContentStyle}>
        <div className={classes.mainDivStyle}>
            <div>
                <div className={classes.pictureDiv}>
                </div>
                <Link className={classes.linkStyle} onClick={()=>{console.log(`Escolher Foto`)}} color="primary" underline="always">Escolher Foto</Link>
            </div>
            <div className={classes.formsDiv}>
            <div className={classes.nameDiv}>
                <FormControl className={classes.formControl}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Nome"
                        name="name"
                        type="text"
                        value={name}
                        inputProps={{maxLength: 30}}
                        onChange={e => setName(e.target.value)}
                    />
                </FormControl>
                <FormControl variant="outlined" className={[classes.formControl, classes.categoryInput].join(" ")}>
                  <InputLabel ref={inputLabel} id="select-category-label">
                  Categoria *
                  </InputLabel>
                  <Select
                  labelId="select-category-label"
                  id="select-category"
                  value={category}
                  onChange={(e)=>{setCategory(e.target.value)}}
                  labelWidth={labelWidth}
                  required
                  >
                    <MenuItem value={'Bebidas'}>Bebidas</MenuItem>
                    <MenuItem value={'Pizzas'}>Pizzas</MenuItem>
                    <MenuItem value={'Sanduiches'}>Sanduiches</MenuItem>
                  </Select>
                </FormControl>
            </div>
            <div>
            <FormControl className={classes.fullFormControl}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        rows={2}
                        id="description"
                        label="Descrição"
                        name="description"
                        type="text"
                        value={description}
                        inputProps={{maxLength: 30}}
                        onChange={e => setDescription(e.target.value)}
                    />
                </FormControl>
            </div>
            <div  className={classes.priceDiv}>
            <FormControl className={classes.priceFormControl}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="price"
                        label="Preço"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">R$ </InputAdornment>,
                        }}
                        name="price"
                        type="number"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                </FormControl>
                <div className={classes.pauseDiv}>
                <PauseSalesButton/>

                <FormHelperText> Se a venda estiver pausada este item não aparecerá na sua lista de itens do aplicativo Bom Delivery</FormHelperText>

                </div>
            </div>
            </div>
        </div>
        </DialogContent>
        <DialogActions>
            <Button className={classes.ButtonStyle} onClick={()=>{console.log("Salvando Item")}}  variant="contained"  color="primary">
            Salvar
          </Button>
          <Button className={classes.ButtonStyle}  onClick={()=>{handleItemDialogClose()}} variant="outlined"  color="primary">
            Cancelar
          </Button>
          
        </DialogActions>
        </div>)
}

export default ItemDialog;