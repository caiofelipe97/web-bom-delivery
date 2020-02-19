import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Link} from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';

import PauseSalesButton from './PauseSalesButton';

const useStyles = makeStyles(theme => {    console.log(theme)
    return({
    tableContainer:{
        marginTop: 20,
        marginBottom: 20
    },
    table: {
      minWidth: 500,
    },
    tableCellStyle:{
        backgroundColor: theme.palette.grey[300],
    },
    titleTableStyle:{
        fontWeight: theme.typography.h6.fontWeight,
        fontFamily: theme.typography.h6.fontFamily,
        fontSize: theme.typography.h6.fontSize
    },
    itemInfoStyle:{
        display: 'flex',
        justifyContent: 'space-between'
    },
    firstTableCell:{
        width: '100%'
    },
    secondTableCell:{
        width: '22%'
    },
    editDiv:{
        display:'flex',
        justifyContent: 'space-between',
        minWidth:100,
        maxWidth: 200
    },
    linkStyle:{
        cursor:'pointer',
        fontWeight: 500
    }
})});

const CategoryTable = (props) => {
    const classes = useStyles();
    const {category} = props;
    const {items} = category;
    console.log(category)
    return(
        <TableContainer className={classes.tableContainer} component={Paper}>
              <Table className={classes.table} aria-label="category table">
              <TableHead>
          <TableRow>
            <TableCell className={[classes.tableCellStyle,classes.titleTableStyle, classes.firstTableCell].join(" ")}>{category.name}</TableCell>
            <TableCell className={[classes.tableCellStyle, classes.secondTableCell].join(" ")}>
            <PauseSalesButton/>
            </TableCell>
            <TableCell className={classes.tableCellStyle}  align="right">
            <div>
                <Link className={classes.linkStyle} onClick={()=>{console.log(`Editar ${category.name}`)}} color="primary" underline="always">Editar</Link>
            </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {items.map(item=>(
                <TableRow>
                    <TableCell className={classes.firstTableCell}>
                    <div className={classes.itemInfoStyle}>
                    <Typography className={classes.textStyle}>{item.name}</Typography>
                    <Typography className={classes.textStyle}>R$ {item.value}</Typography>
                    </div>
                    </TableCell>
                    <TableCell><PauseSalesButton/></TableCell>
                    <TableCell>
                    <div className={classes.editDiv}>
                        <Link className={classes.linkStyle} onClick={()=>{console.log(`Duplicar ${item.name}`)}} color="primary" underline="always">Duplicar</Link>

                        <Link className={classes.linkStyle} onClick={()=>{console.log(`Editar ${item.name}`)}} color="primary" underline="always">Editar</Link>

                    </div>
                    </TableCell>

                </TableRow>
            ))}
            <TableRow>
            <TableCell className={classes.firstTableCell}>
            <div>
                <Link className={classes.linkStyle} onClick={()=>{console.log(`Adicionar item`)}} color="primary" underline="always">+ Adicionar item</Link>
            </div>
            </TableCell>
            </TableRow>
        </TableBody>
            </Table>
        </TableContainer>

        )
}

export default CategoryTable;