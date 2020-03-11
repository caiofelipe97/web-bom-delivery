import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Link} from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';

import PauseSalesButton from './PauseSalesButton';
import {formatMoney} from '../../utils/utils';

const useStyles = makeStyles(theme => { 
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
    editHeader:{
        display:'flex',
        minWidth:100,
        maxWidth: 200,
        justifyContent: 'flex-end',

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
    const {category, handleCategoryEdit, index, handleItemDialogOpen, handleDuplicateItem} = props;
    const {items} = category;
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
                <Link className={[classes.linkStyle, classes.editHeader].join(" ")} onClick={()=>{handleCategoryEdit(category, index)}} color="primary" underline="always">Editar</Link>
            </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {items && items.map((item,i)=>(
                <TableRow key={i}>
                    <TableCell className={classes.firstTableCell}>
                    <div className={classes.itemInfoStyle}>
                    <Typography className={classes.textStyle}>{item.name}</Typography>
                    <Typography className={classes.textStyle}>{formatMoney(item.price)}</Typography>
                    </div>
                    </TableCell>
                    <TableCell><PauseSalesButton/></TableCell>
                    <TableCell>
                    <div className={classes.editDiv}>
                        <Link className={classes.linkStyle} onClick={()=>{handleDuplicateItem(item)}} color="primary" underline="always">Duplicar</Link>

                        <Link className={classes.linkStyle} onClick={()=>handleItemDialogOpen(category.id, true, item)}color="primary" underline="always">Editar</Link>

                    </div>
                    </TableCell>

                </TableRow>
            ))}
            <TableRow>
            <TableCell className={classes.firstTableCell}>
            <div>
                <Link className={classes.linkStyle} onClick={()=>handleItemDialogOpen(category.id, false)} color="primary" underline="always">+ Adicionar item</Link>
            </div>
            </TableCell>
            </TableRow>
        </TableBody>
            </Table>
        </TableContainer>

        )
}

export default CategoryTable;