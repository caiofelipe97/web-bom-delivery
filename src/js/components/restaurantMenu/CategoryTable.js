import React, {useState} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Link, Collapse, IconButton} from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';

import PauseSalesButton from './PauseSalesButton';
import {formatMoney} from '../../utils/utils';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

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
    },
    collapseCell:{
        padding:0,
        borderTop: 'none'
    },
    removeBottomBorder:{
        borderBottom: 'none'
    },
    expandIconCell:{
        padding:5
    },
    itemTextStyle:{
        fontSize: "0.925rem"
    },
    complementTextStyle:{
        fontSize: "0.825rem",
        fontWeight:"bold"
    },
    optionTextStyle:{
        fontSize: "0.825rem",
        
    },
    invisibleCell:{
        paddingLeft: 194,
        paddingRight: 0
    },
    complementCell:{
        paddingTop:4,
        paddingBottom:4
    },
    complementNamePadding:{
        paddingTop:0,
        paddingBottom:8
    },
    LastComplementCell:{
        paddingBottom:16
    },
    priceTextColor:{
        color: theme.palette.grey[700]
    },
    emptyComplements:{
        minHeigth: 100
    },
    invisble:{
        paddingTop: 15
    }
})});

const CategoryTable = (props) => {
    const classes = useStyles();
    const {category, handleCategoryEdit, index, handleItemDialogOpen, handleDuplicateItem, handlePause} = props;
    const [collapsed, setCollapsed] = useState(-1);


    const {items} = category;
    return(
        <TableContainer className={classes.tableContainer} component={Paper}>
              <Table className={classes.table} aria-label="category table">
              <TableHead>
          <TableRow>
            <TableCell className={[classes.tableCellStyle,classes.titleTableStyle, classes.firstTableCell].join(" ")}>{category.name}</TableCell>
            <TableCell className={[classes.tableCellStyle, classes.secondTableCell].join(" ")}>
            <PauseSalesButton  isPaused={category.isPaused} setIsPaused={()=>{handlePause(1, index)}}/>
            </TableCell>
            <TableCell className={classes.tableCellStyle}  align="right">
            <div>
                <Link className={[classes.linkStyle, classes.editHeader].join(" ")} onClick={()=>{handleCategoryEdit(category, index)}} color="primary" underline="always">Editar</Link>
            </div>
            </TableCell>
            <TableCell className={classes.tableCellStyle}>
                    </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {items && items.map((item,itemIndex)=>(
                <React.Fragment key={itemIndex}>
                <TableRow>
                    <TableCell className={[classes.firstTableCell, classes.removeBottomBorder].join(" ")}>
                    
                    <div className={classes.itemInfoStyle}>
                    <Typography className={classes.itemTextStyle}>{item.name}</Typography>
                    <Typography className={[classes.itemTextStyle,classes.priceTextColor].join(" ")}>{formatMoney(item.price)}</Typography>
                    </div>
                    </TableCell>
                    <TableCell className={classes.removeBottomBorder}>
                        <PauseSalesButton   isPaused={item.isPaused}  setIsPaused={()=>{handlePause(2, index, itemIndex)}}/>
                    </TableCell>
                    <TableCell className={classes.removeBottomBorder}>
                    <div className={classes.editDiv}>
                        <Link className={classes.linkStyle} onClick={()=>{handleDuplicateItem(item)}} color="primary" underline="always">Duplicar</Link>

                        <Link className={classes.linkStyle} onClick={()=>{handleItemDialogOpen(category.id, true, item)}}color="primary" underline="always">Editar</Link>

                    </div>
                    
                    </TableCell>
                    <TableCell className={[classes.expandIconCell,classes.removeBottomBorder].join(" ")}>
                        {
                            itemIndex===collapsed ? 
                            <IconButton onClick={()=>{setCollapsed(-1)}}>

                            <ExpandLessIcon color="primary" />
                            </IconButton>

                            :
                            <IconButton onClick={()=>{setCollapsed(itemIndex)}}>

                            <ExpandMoreIcon color="primary"/>
                            </IconButton>

                        }
            
                    </TableCell>
                    
                </TableRow>
                <TableRow>
                <TableCell colSpan="4" className={classes.collapseCell}>
                    <Collapse in={ itemIndex === collapsed } timeout="auto" unmountOnExit>
                        { item.complements && item.complements.length > 0 ? item.complements.map((complement,complementIndex)=>{
                            return (
                            <Table className={classes.table} aria-label="category table" key={complementIndex}>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={[classes.firstTableCell, classes.removeBottomBorder, classes.complementNamePadding].join(" ")}>
                                        <div className={classes.itemInfoStyle}>
                                            <Typography className={classes.complementTextStyle} >{complement.name}</Typography>
                                        </div>
                                    </TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                    complement.options && complement.options.map((option,optionIndex)=>{
                                        const normalCellItemStyle = [classes.firstTableCell, classes.removeBottomBorder, classes.complementCell].join(" ");
                                        const lastCellItemStyle =  [classes.firstTableCell, classes.removeBottomBorder, classes.complementCell, classes.LastComplementCell].join(" ");
                                        return(
                                            <TableRow key={optionIndex}>
                                            <TableCell className={optionIndex === (complement.options.length -1) ? 
                                            lastCellItemStyle
                                            :
                                            normalCellItemStyle}
                                            >
                                                <div className={classes.itemInfoStyle}>
                                                    <Typography className={classes.optionTextStyle}>{option.name}</Typography>
                                                    <Typography className={[classes.optionTextStyle,classes.priceTextColor].join(" ")}>{formatMoney(option.price)}</Typography>
                                                </div>
                                            </TableCell>
                                            <TableCell className={optionIndex === (complement.options.length -1) ? 
                                            lastCellItemStyle
                                            :
                                            normalCellItemStyle}
                                            ><PauseSalesButton small isPaused={option.isPaused} setIsPaused={()=>{handlePause(3, index, itemIndex, complementIndex,optionIndex)}}/></TableCell>
                                            <TableCell className={[classes.invisibleCell, classes.removeBottomBorder, classes.complementCell].join(" ")}/>
                                        </TableRow>
                                        )
                                    })
                                }
                                </TableBody>
                                </Table>

                    )
                    })
                    :
                    <div className={classes.invisble}/>            
                        }
  
                    
                    </Collapse>
                </TableCell>
                </TableRow>
                </React.Fragment>
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