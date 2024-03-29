import React, {useState}  from 'react';
import { 
    DialogContent, 
    Link,
    TableContainer, 
    Table, 
    TableBody, 
    TableHead, 
    TextField, 
    Paper, 
    TableRow, 
    TableCell,
    FormControlLabel,
    Checkbox,
    InputAdornment,
    FormControl,
    DialogContentText
} from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import PauseSalesButton from './PauseSalesButton';
import ComplementDialog from './ComplementDialog';
import ConfirmDialog from '../common/ConfirmDialog';

const useStyles = makeStyles( (theme) => ({
    DialogContentStyle:{
        width: '912px',
        height: '400px'
    },
    linkStyle:{
        cursor:'pointer',
        fontWeight: 500,
        fontFamily: theme.typography.fontFamily
    },
    helperTextDiv:{
        marginBottom: 10
    },
    tableContainer:{
        marginTop: 10
    },
    table: {
        border: '1px solid rgba(0, 0, 0, 0.24)'
      },
      tableCellStyle:{
          backgroundColor: theme.palette.grey[300],
      },
      firstHeadDiv:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      secondHeadDiv:{
        display: 'flex'
      },
      qtdDiv:{
        display: 'flex'
      },
      bigInput:{
        width: '90%',
        marginRight: 10
      },
      mediumInput:{
        width: '70%'
      },
      smallInput:{
          width: '40%',
          marginRight: 10
      },
      bodyDiv:{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
      },
      bigBodyInput:{
        maxWidth: '35%'
      },
      mediumBodyInput:{
        maxWidth: '22%'
      },
      smallBodyInput:{
        maxWidth: '13%'
      },
      inputAdornment:{
          paddingLeft: 10
      }
}))


const ItemComplementContent = (props) => {
    const {complements, handleComplementChange, handleOptionChange, setComplements} = props;
    const [complementDialogOpen, setComplementDialogOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const classes = useStyles();

    const handleComplementDialogClose = ()=>{
        setComplementDialogOpen(false);
    }

    const handleAddComplement = (newComplement) =>{
        setComplements([...complements,{...newComplement, id: new Date().getTime()} ])
        handleComplementDialogClose();
    }

    const handleDeleteComplement = (complementIndex) => {
        let newComplementsArray = [...complements];
        newComplementsArray.splice(complementIndex, 1);
        setComplements(newComplementsArray);
    }

    const handleAddOption = (categoryIndex) =>{
        let newComplementsArray = complements.map((complement,i)=>{ 
            let newOption = {name: "", description:"", price:0, isPaused:false, id: new Date().getTime()};
            return i === categoryIndex ? 
            { ...complement,options:[...complement.options,newOption]} 
            : complement});
        setComplements(newComplementsArray);
    }

    const handleDeleteOption = (categoryIndex, optionIndex) => {
        let newComplementsArray = complements.map((complement,i) =>{
            if(i===categoryIndex){
                let newOptions = [...complement.options];
                newOptions.splice(optionIndex,1);
                return {...complement, options: newOptions}
            }else{
                return complement
            }
        })
        setComplements(newComplementsArray)
    }
    

    return(
        <DialogContent className={classes.DialogContentStyle}>
            <div>
                <Link className={classes.linkStyle}  color="primary" underline="always" onClick={()=>{setComplementDialogOpen(true)}}>+ Adicionar categoria</Link>
            </div>
            {
                complements && complements.map((complement, complementIndex)=>{
            return (
            <TableContainer className={classes.tableContainer} component={Paper} key={complementIndex}>
              <Table className={classes.table} aria-label="complement table">
              <TableHead>
              <TableRow>
              <TableCell className={classes.tableCellStyle}>
                    <div className={classes.firstHeadDiv}>
                        <TextField
                            className={classes.bigInput}
                            variant="outlined"
                            margin="normal"
                            value = {complement.name}
                            error = {complement.name.length === 0}
                            size="small"
                            required
                            fullWidth
                            id={`complement-name-&{complementIndex}`}
                            label="Nome da categoria"
                            name="name"
                            onChange={e => {
                                handleComplementChange(complementIndex,e.target.name,e.target.value)}
                            }
                        />
                        
                    <Link className={classes.linkStyle}  color="primary" underline="always" onClick={() => setConfirmOpen(true)}>Excluir</Link>
                    <ConfirmDialog
                        title="Confirmação"
                        open={confirmOpen}
                        setOpen={setConfirmOpen}
                        onConfirm={()=>{handleDeleteComplement(complementIndex)}}
                    >   
                        <DialogContentText>
                        Tem certeza que deseja excluir essa categoria? (Para finalizar a ação é necessário salvar o item)
                        </DialogContentText>
                    </ConfirmDialog>
                    </div>

                    <div className={classes.secondHeadDiv}>
                        <div className={classes.qtdDiv}>
                            <TextField
                                className={classes.smallInput}
                                variant="outlined"
                                margin="normal"
                                type="number"
                                value = {complement.min}
                                error = {!complement.min || complement.min <= 0}
                                inputProps={{
                                    min:1
                                }}
                                required
                                fullWidth
                                size="small"
                                id="min"
                                label="Qtd. mín."
                                name="min"
                                onChange={e => {
                                    handleComplementChange(complementIndex,e.target.name,e.target.value);
                                }}
                            />
                            <TextField
                                className={classes.smallInput}
                                variant="outlined"
                                margin="normal"
                                type="number"
                                value = {complement.max}
                                error = {!complement.max || complement.max <= 0 || complement.max < complement.min}
                                inputProps={{
                                    min: complement.min ? complement.min : 1
                                }}
                                required
                                fullWidth
                                size="small"
                                id="max"
                                label="Qtd. máx."
                                name="max"
                                onChange={e => {
                                    handleComplementChange(complementIndex,e.target.name, e.target.value);
                                }}
                            />                    
                        </div>
                        <FormControlLabel
                        className={classes.mediumInput}
                        control={
                            <Checkbox 
                            checked={complement.isRequired} 
                            inputProps={{name:'isRequired'}}  
                            value={complement.isRequired} 
                            onChange={e => handleComplementChange(complementIndex,e.target.name,e.target.checked)}/>
                            }
                        label="Complemento obrigatório"
                        />
                    </div>
                    
                </TableCell>
                </TableRow>
        </TableHead>
        <TableBody>
            {complement.options && complement.options.map((option,optionIndex)=>(
                <TableRow key={optionIndex}>
                    <TableCell>
                        <div className={classes.bodyDiv}>
                        <TextField
                            className={classes.mediumBodyInput}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value = {option.name}
                            error = {option.name.length === 0}
                            size="small"
                            required
                            id={`option-name-${optionIndex}`}
                            label="Complemento"
                            name="name"
                            onChange={(e)=>{handleOptionChange(complementIndex, optionIndex,e.target.name, e.target.value)}}
                        />
                        <TextField
                            className={classes.bigBodyInput}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value = {option.description}
                            size="small"
                            id={`optio-description-${optionIndex}`}
                            label="Descrição"
                            name="description"
                            onChange={(e)=>{handleOptionChange(complementIndex, optionIndex,e.target.name, e.target.value)}}
                        />

                        <FormControl className={classes.smallBodyInput}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id={`option-price-${optionIndex}`}
                        error = {option.price.length === 0 || option.price < 0}
                        label="Preço"
                        size="small"
                        InputProps={{
                          className:classes.inputAdornment,  
                          startAdornment: <InputAdornment position="start">R$ </InputAdornment>,
                          inputProps: { min: 0.0, max: 999, step:0.1, style:{paddingRight:8} }                       
                        }}
                        name="price"
                        type="number"
                        value={option.price}
                        onChange={(e)=>{
                            let newPrice = e.target.value;
                            if(newPrice){
                                newPrice = parseFloat(newPrice).toFixed(2)
                            }
                            handleOptionChange(complementIndex, optionIndex,e.target.name, newPrice)
                            }}
                    />
                </FormControl>
                <PauseSalesButton isPaused={option.isPaused} setIsPaused={()=>{handleOptionChange(complementIndex, optionIndex, 'isPaused', !option.isPaused)}}/>
                        <Link className={[classes.linkStyle].join(" ")}  color="primary" underline="always" onClick={()=>handleDeleteOption(complementIndex,optionIndex)}>Excluir</Link>

                        </div>
                    </TableCell>

                </TableRow>
            ))}
            <TableRow>
            <TableCell >
            <div>
                <Link className={classes.linkStyle} color="primary" underline="always"  onClick={()=>{handleAddOption(complementIndex)}}>+ Adicionar complemento</Link>
            </div>
            </TableCell>
            </TableRow>
        </TableBody>
            </Table>
        </TableContainer>
                )
                })
            }
            <ComplementDialog complementDialogOpen={complementDialogOpen}
                handleComplementDialogClose={handleComplementDialogClose}
                handleAddComplement={handleAddComplement}
                />
        </DialogContent>
    )
}

export default ItemComplementContent;