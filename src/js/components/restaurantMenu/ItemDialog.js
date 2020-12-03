import React, {useState, useEffect, useRef} from 'react';
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
    Dialog,
    Tab,
    Tabs,
    CircularProgress
 } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import PauseSalesButton from './PauseSalesButton';
import ItemImageDialogContent from './ItemImageDialogContent';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { connect } from "react-redux";
import {addItemRequest, deleteItemRequest}  from "../../actions";
import ItemComplementContent from './ItemComplementContent';
import DeleteItemDivButton from './DeleteItemDivButton';


const useStyles = makeStyles( (theme) => ({
    ButtonStyle: {
        width: '50%',
    },
    DialogContentStyle:{
        minWidth: '600px',
        minHeight: '400px',
        paddingLeft: 0,
        paddingRight: 0

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
      display: 'flex',
      marginLeft: 24,
      marginRight: 24
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
    },
    imgLoading:{
      width: 100,
      height: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      backgroundColor: 'white'
    },
    isPausedColor:{
      color: '#F25105'
    }
}))


const ItemDialog = (props) => {
    const {handleItemDialogClose, categories, categoryId, addItem, restaurant, isEdit, item, deleteItem} = props;
    const classes = useStyles();

    const [img, setImg] = useState("");
    const  [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);
    const  [category, setCategory] = useState(0);
    const  [description, setDescription] = useState("");
    const [price, setPrice] = useState('1.00');
    const [priceError, setPriceError] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [id, setId] = useState(0);
    const [imgDialogOpen, setImgDialogOpen] = useState(false);
    const [tabSelected, setTabSelected] = useState(0);
    const [complements, setComplements] = useState([]);
    const [imgLoading, setImgLoading] = useState(true);
    

    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);


    useEffect(() => {
        if(inputLabel.current){
            setLabelWidth(inputLabel.current.offsetWidth);
        }
        setCategory(categoryId);
        if(isEdit){
          const {img, name, category, description, price, isPaused, complements, id} = item;
          setImg(img);
          setName(name);
          setCategory(category);
          setDescription(description);
          setPrice(price);
          setIsPaused(isPaused);
          setComplements(complements);
          setId(id);
        }
    }, [categoryId,isEdit,item]);
    
    const handleItemSave = () =>{
     
      if(!isEdit){
        const newItem = {name,category,description,price, img, isPaused, complements, restaurant: restaurant.uid, user: restaurant.user};
        addItem(newItem);
      }else{
        const editedItem = {name, category, description, price, img, isPaused, complements, id, restaurant: restaurant.uid, user: restaurant.user};
        addItem(editedItem);
      }
      handleItemDialogClose();
     }

    const handleItemDelete = () => {
      const {item, restaurant} = props;
      deleteItem(item,restaurant);
      handleItemDialogClose();
    }

    const handleSelectImage = (croppedImg) =>{
      setImg(croppedImg);
      setImgDialogOpen(false);
    }

    const handleImgDialogClose = ()=>{
      setImgDialogOpen(false);
    }

    const handleTabSelected = (e, newValue)=>{
      setTabSelected(newValue);
    }    

    const handleComplementCategoryChange = (index, attr, newValue)=>{
      let newComplementsArray = complements.map((complement,i)=> i === index ? {...complement, [attr]:newValue } : complement);
      setComplements(newComplementsArray);
    }

    const handleComplementOptionChange = (categoryIndex, optionIndex, attr, newValue) =>{
      if(complements[categoryIndex]){
        if(complements[categoryIndex].options[optionIndex]){
          let newComplementsArray = complements.map((complement,i)=>{ 
            return i === categoryIndex ? 
            { ...complement, options: complement.options.map((option, j) =>  j === optionIndex ? {...option, [attr]:newValue } : option) } 
            : complement});
          setComplements(newComplementsArray);
        }
      }
    }

    const validateIsRequired = (str) =>{
      return (str.length !== 0);
    }

    const validateMinAndMax = (min, max) =>{
      return (min > 0 && max > 0 && max >= min);
    }

    const validateOptionPrice = (value) =>{
      return (value >= 0);
    }

    const validateComplements = () =>{
      let complementsIsValid = complements.every(complement=>{
        let optionsIsValid = complement.options.every(option =>{
          return validateIsRequired(option.name) && validateIsRequired(option.price) && validateOptionPrice(option.price)
        })
        return validateIsRequired(complement.name) && validateIsRequired(complement.min) && validateIsRequired(complement.max) && validateMinAndMax(complement.min, complement.max) && optionsIsValid
      })
      return complementsIsValid;
    }

    

    return(
      <form  onSubmit={(e)=>{
        e.preventDefault();
        if(tabSelected === 0){
          let isValid = validateComplements();
          if(!isValid){
            setTabSelected(1);
          } else{
            handleItemSave();
          }
        }else {
          if(nameError || priceError){
            setTabSelected(0);
          } else{
            handleItemSave();
          }
        }
        }}>
      {isEdit ? <DialogTitle id="category-dialog-title" color="primary">Editar item</DialogTitle>:<DialogTitle id="category-dialog-title" color="primary">Criar item</DialogTitle>}

        <Tabs
        value={tabSelected}
          onChange={handleTabSelected}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Detalhes"  />
          <Tab label="Complementos" />
        </Tabs>
        {
          tabSelected === 0 ?
          <DialogContent className={classes.DialogContentStyle}>
        <div className={classes.mainDivStyle}>
            <div>
                <div className={classes.pictureDiv}>
                 {img && (
                  <>
                   {imgLoading && <div className={classes.imgLoading}><CircularProgress size={50}/> </div>}
                   <img alt="crop" className={classes.imgCropped} src={img} onLoad={()=>{setImgLoading(false)}}/>
                  </>
                  )}
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
                        error={nameError}
                        onChange={e => {
                          if(e.target.value.length === 0){
                            setNameError(true);
                          } else {
                            setNameError(false);
                          }
                          setName(e.target.value)
                        }}
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
                        inputProps={{maxLength: 100}}
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
                        error={priceError}
                        onChange={e => {
                          let newPrice = parseFloat(e.target.value)
                          if(e.target.value.length === 0 || newPrice <= 0){
                            setPriceError(true);
                          }else{
                            setPriceError(false);
                          }
                          setPrice(e.target.value)
                        }}
                    />
                    {priceError && <FormHelperText error>Adicione algum valor</FormHelperText>}
                </FormControl>
                <div className={classes.pauseDiv}>
                <PauseSalesButton isPaused = {isPaused} setIsPaused={setIsPaused}/>

                <FormHelperText className={isPaused ? classes.isPausedColor : ''}> Se a venda estiver pausada este item não aparecerá na sua lista de itens do aplicativo Bom Delivery</FormHelperText>

                </div>
            </div>
            </div>
           
        </div>
        <div>
            {isEdit && <DeleteItemDivButton deleteHandle={handleItemDelete}/>}
            </div>
        </DialogContent>
          :
          <ItemComplementContent 
          handleComplementChange={handleComplementCategoryChange} 
          handleOptionChange={handleComplementOptionChange} 
          complements={complements}
          setComplements={setComplements}
          />
        }
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

const mapDispatchToProps = dispatch => ({
  addItem: ( item) => dispatch(addItemRequest( item)),
  deleteItem: ( item, restaurant) => dispatch(deleteItemRequest(item, restaurant))
});

function mapStateToProps(state) {
    return {
      restaurant: state.restaurant.restaurant,
      loading: state.restaurant.loading
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ItemDialog);