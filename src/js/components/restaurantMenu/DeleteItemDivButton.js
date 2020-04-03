import React from 'react';
import {Typography, FormHelperText } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles( (theme) =>{
    console.log(theme);
    return ({
    divStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    buttonStyle:{
        padding: 0,
        width:35,
        marginLeft:10,
        marginRight:10
    },
    textStyle:{
        fontSize: "0.875rem",
        lineHeight: "1.5rem",
        color: theme.palette.grey[600]
    },
    deleteDiv:{
        display: 'flex',
        width: '100%',
        backgroundColor: theme.palette.grey[100],
        height: 100,
        alignItems: 'center'
    },
    helperTextDiv:{
        marginLeft: 20
    }
})})


const DeleteItemDivButton = (props) => {
    const classes = useStyles();
    const {divStyle} = props;
    return(
        <div className={classes.deleteDiv}>

        <div className={ divStyle ? [classes.divStyle, divStyle].join(" ") : classes.divStyle}>
            <IconButton aria-label="delete" color="default" className={classes.buttonStyle}>
                <DeleteIcon fontSize="large" />
            </IconButton>
            <Typography noWrap  className={classes.textStyle}>Deletar item</Typography>
        </div>
        <div className={classes.helperTextDiv}>
        <FormHelperText>Para deletar este item de seu cardápio clique no botão ao lado. Se o item for deletado ele sairá do seu cardápio e você perderá suas informações para sempre.</FormHelperText>

        </div>

</div>
    )
}

export default DeleteItemDivButton;