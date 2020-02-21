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
    FormHelperText,
    Dialog
 } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import PauseSalesButton from './PauseSalesButton';
import ItemImageDialogContent from './ItemImageDialogContent';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

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
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
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
    },
    imgCropped:{
      width: 100,
      height: 100
    },
    uploadIcon:{
      width: 50,
      height: 50,
      color: 'rgba(0,0,0,0.64)'
    }
}))


const ItemDialog = (props) => {
    const {handleItemDialogClose, categories, categoryId} = props;
    const classes = useStyles();

    const [img, setImg] = useState("");
    const  [name, setName] = useState("");
    const  [category, setCategory] = useState(0);
    const  [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [imgDialogOpen, setImgDialogOpen] = useState(false);


    
    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    useEffect(() => {
        if(inputLabel.current){
            setLabelWidth(inputLabel.current.offsetWidth);
        }
        setCategory(categoryId);
    }, [categoryId]);
    
    const handleItemSave = (e) =>{
      e.preventDefault();
      
      console.log({name,category,description,price, img, isPaused})
    }

    const handleSelectImage = (croppedImg) =>{
      setImg(croppedImg);
      setImgDialogOpen(false);
    }

    const handleImgDialogClose = ()=>{
      setImgDialogOpen(false);
    }

    return(
      <form  onSubmit={handleItemSave}>
      <DialogTitle id="category-dialog-title" color="primary">Criar item</DialogTitle>

        <DialogContent className={classes.DialogContentStyle}>
        <div className={classes.mainDivStyle}>
            <div>
                <div className={classes.pictureDiv}>
                 {img && <img alt="crop" className={classes.imgCropped} src={img}/>}
                 {!img && <AddAPhotoIcon className={classes.uploadIcon}/>}
                </div>
                <Link className={classes.linkStyle} onClick={()=>{setImgDialogOpen(true)}} color="primary" underline="always">Escolher Foto</Link>
            </div>
            <div className={classes.formsDiv}>
            <div className={classes.nameDiv}>
                <FormControl className={classes.formControl}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="item-name"
                        label="Nome"
                        name="item-name"
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
                  {  
                     categories && categories.map((category,i)=>{
                      return <MenuItem key={i} value={category.id}>{category.name}</MenuItem>
                    })
                  }
                  { category===0 && (<MenuItem key={0} value={0}></MenuItem>)}
                    
                  </Select>
                </FormControl>
            </div>
            <div>
            <FormControl className={classes.fullFormControl}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        multiline
                        rows={2}
                        id="item-description"
                        label="Descrição"
                        name="item-description"
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
                        id="item-price"
                        label="Preço"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">R$ </InputAdornment>,
                          inputProps: { min: 0.1, max: 999, step:0.1 }                       
                        }}
                        name="item-price"
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
            <Button type="submit" className={classes.ButtonStyle}  variant="contained"  color="primary">
            Salvar
          </Button>
          <Button className={classes.ButtonStyle}  onClick={()=>{handleItemDialogClose()}} variant="outlined"  color="primary">
            Cancelar
          </Button>
          
        </DialogActions>
        <Dialog
          open={imgDialogOpen}
          onClose={handleImgDialogClose}
          aria-labelledby="img-dialog-title"
          aria-describedby="img-dialog-description"
        >
        <DialogTitle id="img-dialog-title" color="primary">Selecione uma imagem para o item</DialogTitle>
          <ItemImageDialogContent  handleImgDialogClose={handleImgDialogClose} handleSelectImage={handleSelectImage}/>
      </Dialog>
      </form>
)
}

export default ItemDialog;