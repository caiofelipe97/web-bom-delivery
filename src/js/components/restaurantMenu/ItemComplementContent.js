import React from 'react';
import { 
    DialogContent, 
    Link,
    FormHelperText, 
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
    FormControl
} from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import PauseSalesButton from './PauseSalesButton';

const useStyles = makeStyles( (theme) => ({
    DialogContentStyle:{
        minWidth: '600px',
        minHeight: '350px'
    },
    linkStyle:{
        cursor:'pointer',
        fontWeight: 500,
        fontFamily: theme.typography.fontFamily
    },
    helperTextDiv:{
        marginBottom: 10
    },
    table: {
        marginTop:10,
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
        maxWidth: '25%'
      },
      smallBodyInput:{
        maxWidth: '10%'
      }
}))


const ItemComplementContent = (props) => {
    const {complements} = props;
    console.log(complements)
    const classes = useStyles();
    return(
        <DialogContent className={classes.DialogContentStyle}>
            <div className={classes.helperTextDiv} >
                <FormHelperText> Alguns exemplos de categoria de complemento: selecionar sabor, selecionar extras.
                Adicione alguma categoria de complemento para acrescentar os complementos do seu item.</FormHelperText>
            </div>
            <div>
                <Link className={classes.linkStyle}  color="primary" underline="always">+ Adicionar categoria</Link>
            </div>
            {
                complements && complements.map((complement, i)=>{
            return (
            <TableContainer className={classes.tableContainer} component={Paper} key={i}>
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
                            size="small"
                            required
                            fullWidth
                            id="complement-name"
                            label="Nome da categoria"
                            name="complement-name"
                        />
                        
                    <Link className={classes.linkStyle}  color="primary" underline="always">Excluir</Link>
                    </div>

                    <div className={classes.secondHeadDiv}>
                        <div className={classes.qtdDiv}>
                            <TextField
                                className={classes.smallInput}
                                variant="outlined"
                                margin="normal"
                                type="number"
                                value = {complement.min}
                                required
                                fullWidth
                                size="small"
                                id="min"
                                label="Qtd. mín."
                                name="min"
                            />
                            <TextField
                                className={classes.smallInput}
                                variant="outlined"
                                margin="normal"
                                type="number"
                                value = {complement.max}
                                required
                                fullWidth
                                size="small"
                                id="max"
                                label="Qtd. máx."
                                name="max"
                            />                    
                        </div>
                        <FormControlLabel
                        className={classes.mediumInput}
                        control={
                            <Checkbox checked={complement.isRequired} value="isRequired" />
                            }
                            label="Complemento obrigatório"
                            />
                    </div>
                    
                </TableCell>
                </TableRow>
        </TableHead>
        <TableBody>
            {complement.options && complement.options.map((option,i)=>(
                <TableRow key={i}>
                    <TableCell>
                        <div className={classes.bodyDiv}>
                        <TextField
                            className={classes.mediumBodyInput}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value = {option.name}
                            size="small"
                            required
                            id="option-name"
                            label="Complemento"
                            name="name"
                        />
                        <TextField
                            className={classes.bigBodyInput}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value = {option.description}
                            size="small"
                            required
                            id="option-description"
                            label="Descrição"
                            name="option-description"
                        />

                        <FormControl className={classes.smallBodyInput}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="option-price"
                        label="Preço"
                        size="small"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">R$ </InputAdornment>,
                          inputProps: { min: 0.0, max: 999, step:0.1 }                       
                        }}
                        name="option-price"
                        type="number"
                        value={option.price}
                    />
                </FormControl>
                        <PauseSalesButton/>
                        <Link className={[classes.linkStyle].join(" ")}  color="primary" underline="always">Excluir</Link>

                        </div>
                    </TableCell>

                </TableRow>
            ))}
            <TableRow>
            <TableCell >
            <div>
                <Link className={classes.linkStyle} color="primary" underline="always">+ Adicionar complemento</Link>
            </div>
            </TableCell>
            </TableRow>
        </TableBody>
            </Table>
        </TableContainer>
                )
                })
            }
        

        </DialogContent>
    )
}

export default ItemComplementContent;