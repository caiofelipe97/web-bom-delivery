import React, { useState, useEffect } from "react";
import {
  TextField,
  FormControl,
  Input,
  FormControlLabel,
  FormLabel,
  FormGroup,
  FormHelperText,
  InputAdornment,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from "@material-ui/core";
import OutlinedDiv from "../common/OutlinedDiv";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  outlinedDiv: {
    marginTop: 20,
    width: 600,
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  deliveryDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  smallFormControl: {
    margin: theme.spacing(1),
    minWidth: "15%",
    maxWidth: "41%"
  },
  tinyFormControl: {
    margin: theme.spacing(1),
    marginTop: 0,
    maxWidth: "25%",
    minWidth: "15%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "40%"
    }
  },
  timeFormGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    }
  },
  deliveryPriceInput: {
    marginTop: 32
  },
  paymentMethodsDiv: {
    margin: theme.spacing(1)
  },
  maxTime: {
    marginRight: 30
  }
}));

const DeliveryForm = props => {
  const classes = useStyles();
  const [moneyCheck, setMoneyCheck] = useState(false);
  const [cardCheck, setCardCheck] = useState(false);
  const [cardOptions, setCardOptions] = useState([]);
  const [cardDialogOpen, setCardDialogOpen] = useState(false);
  const [cardOptionsError, setCardOptionsError] = useState("");
  const {
    timeToDelivery,
    setTimeToDelivery,
    deliveryPrice,
    setDeliveryPrice,
    paymentMethods,
    setPaymentMethods
  } = props;

  useEffect(() => {
    let money = false;
    let card = false;
    let options = [];
    for (var i = 0; i < paymentMethods.length; i++) {
      if (paymentMethods[i].method === "dinheiro") {
        money = true;
      }
      if (paymentMethods[i].method === "máquina móvel") {
        card = true;
        options = paymentMethods[i].options;
      }
    }
    setMoneyCheck(money);
    setCardCheck(card);
    setCardOptions(options);
  }, [paymentMethods]);

  const handleClickOpen = () => {
    setCardDialogOpen(true);
  };

  const handleClose = () => {
    setCardOptions([]);
    setCardDialogOpen(false);
  };

  const handleSave = () => {
    if (cardOptions.length === 0) {
      setCardOptionsError("É preciso ter pelo menos 1 opção de pagamento");
    } else {
      setPaymentMethods([
        ...paymentMethods,
        { method: "máquina móvel", options: cardOptions }
      ]);
      setCardDialogOpen(false);
    }
  };

  const handleCheckboxChange = e => {
    const value = e.target.value;
    const checked = e.target.checked;
    if (!checked) {
      setPaymentMethods(
        paymentMethods.filter(paymentMethod => paymentMethod.method !== value)
      );
    } else {
      if (value === "dinheiro") {
        setPaymentMethods([...paymentMethods, { method: "dinheiro" }]);
      } else if (value === "máquina móvel") {
        handleClickOpen();
      }
    }
  };

  const handleCardOptionsChange = e => {
    const value = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      setCardOptions([...cardOptions, value]);
    } else {
      setCardOptions(cardOptions.filter(card => card !== value));
    }
  };

  return (
    <OutlinedDiv label={"Entrega"} className={classes.outlinedDiv}>
      <div className={classes.deliveryDiv}>
        <div className={classes.smallFormControl}>
          <FormLabel component="legend">
            Tempo de entrega (Em minutos)
          </FormLabel>
          <FormGroup className={classes.timeFormGroup}>
            <FormControl className={classes.tinyFormControl}>
              <TextField
                required
                margin="normal"
                id="min-input"
                label="Tempo Mínimo"
                name="min"
                type="number"
                InputLabelProps={{
                  style: {
                    whiteSpace: "noWrap"
                  }
                }}
                inputProps={{
                  maxLength: 3,
                  min: 0,
                  max: timeToDelivery.max
                }}
                value={timeToDelivery.min}
                onChange={e =>
                  setTimeToDelivery({ ...timeToDelivery, min: e.target.value })
                }
              />
            </FormControl>
            <FormControl
              className={[classes.tinyFormControl, classes.maxTime].join(" ")}
            >
              <TextField
                required
                margin="normal"
                id="max-input"
                label="Tempo Máximo"
                name="max"
                type="number"
                InputLabelProps={{
                  style: {
                    whiteSpace: "noWrap"
                  }
                }}
                inputProps={{
                  maxLength: 3,
                  min: timeToDelivery.min,
                  max: 120
                }}
                value={timeToDelivery.max}
                onChange={e =>
                  setTimeToDelivery({ ...timeToDelivery, max: e.target.value })
                }
              />
            </FormControl>
          </FormGroup>
        </div>
        <div className={classes.smallFormControl}>
          <FormLabel component="legend">Valor da entrega</FormLabel>
          <FormControl
            required
            className={[
              classes.tinyFormControl,
              classes.deliveryPriceInput
            ].join(" ")}
          >
            <Input
              inputProps={{
                maxLength: 2,
                min: 0,
                max: 10
              }}
              id="delivery-price-inputt"
              type="number"
              value={deliveryPrice}
              onChange={e => setDeliveryPrice(e.target.value)}
              endAdornment={
                <InputAdornment position="start">R$</InputAdornment>
              }
            />
          </FormControl>
          <FormHelperText>
            Este valor sempre será cobrado no final da compra no estabelecimento
          </FormHelperText>
        </div>
      </div>
      <div className={classes.paymentMethodsDiv}>
        <FormLabel component="legend">Formas de pagamento</FormLabel>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={moneyCheck}
                onChange={handleCheckboxChange}
                value="dinheiro"
                disabled
              />
            }
            label="Dinheiro"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={cardCheck}
                onChange={handleCheckboxChange}
                value="máquina móvel"
              />
            }
            label="Máquina Móvel"
          />
          <FormHelperText>{cardOptions.join(", ")}</FormHelperText>
        </FormGroup>
      </div>
      <Dialog
        open={cardDialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Selecione os cartões aceitos
        </DialogTitle>
        <DialogContent>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={cardOptions.includes("Visa-Crédito")}
                  value="Visa-Crédito"
                  onChange={handleCardOptionsChange}
                />
              }
              label="Visa - Crédito"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={cardOptions.includes("Visa-Débito")}
                  value="Visa-Débito"
                  onChange={handleCardOptionsChange}
                />
              }
              label="Visa - Débito"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={cardOptions.includes("MasterCard-Crédito")}
                  value="MasterCard-Crédito"
                  onChange={handleCardOptionsChange}
                />
              }
              label="MasterCard - Crédito"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={cardOptions.includes("MasterCard-Débito")}
                  value="MasterCard-Débito"
                  onChange={handleCardOptionsChange}
                />
              }
              label="MasterCard - Débito"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={cardOptions.includes("Hipercard-Crédito")}
                  value="Hipercard-Crédito"
                  onChange={handleCardOptionsChange}
                />
              }
              label="Hipercard - Crédito"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={cardOptions.includes("Elo-Crédito")}
                  value="Elo-Crédito"
                  onChange={handleCardOptionsChange}
                />
              }
              label="Elo - Crédito"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={cardOptions.includes("Elo-Débito")}
                  value="Elo-Débito"
                  onChange={handleCardOptionsChange}
                />
              }
              label="Elo-Débito"
            />
          </FormGroup>
          {cardOptionsError && (
            <FormHelperText error>{cardOptionsError}</FormHelperText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary" autoFocus>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </OutlinedDiv>
  );
};

export default DeliveryForm;
