import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import {
  CardMedia,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogActions
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StoreForm from "./StoreForm";
import AddressForm from "./AddressForm";
import DeliveryForm from "./DeliveryForm";
import {
  editRestaurantRequest,
  uploadRestaurantImg
} from "../../actions/restaurant.actions";
import ImageUploadDialogContent from "./ImageUploadDialogContent";
import PageTitle from "../common/PageTitle";
import UserForm from "./UserForm";

const useStyles = makeStyles(theme => ({
  formFlexbox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 600,
    margin: "auto"
  },
  imgDivStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  imgStyle: {
    width: 100,
    height: 100,
    marginBottom: 10
  },
  imgButton: {
    width: 150
  },
  cancelButton: {
    marginLeft: 10,
    backgroundColor: "#F24405",
    color: "#FFFFFF"
  },
  buttons: {
    width: "100%",
    display: "flex",
    marginTop: 10,
    justifyContent: "flex-end"
  },
  circularProgress: {
    position: "relative",
    left: "42%",
    top: "50%",
    zIndex: 2001
  },
  progressContainer: {
    position: "fixed",
    zIndex: 2000,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    minHeight: "100%",
    marginLeft: 240,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0
    }
  },
  button: {
    width: 100
  }
}));

const Profile = props => {
  const classes = useStyles();

  const { restaurant, editRestaurant, loading, uploadImg, user } = props;

  const [img, setImg] = useState("");

  const [name, setName] = useState("");
  const [foods, setFoods] = React.useState([]);

  const [street, setStreet] = useState("");
  const [complement, setComplement] = useState("");
  const [CEP, setCEP] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [timeToDelivery, setTimeToDelivery] = useState({ min: 0, max: 0 });
  const [deliveryPrice, setDeliveryPrice] = useState(0);

  const [imgDialogOpen, setImgDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const [isChanged, setIsChanged] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);

  const [newPasswordLoading, setNewPasswordLoading] = useState(false);

  useEffect(() => {
    console.log(user);
    if (
      Object.entries(restaurant).length !== 0 &&
      restaurant.constructor === Object
    ) {
      const {
        name,
        foods,
        timeToDelivery,
        deliveryPrice,
        paymentMethods,
        img
      } = restaurant;
      setImg(img);
      setName(name);
      setFoods(foods);
      if (Object.entries(restaurant.address).length !== 0) {
        const { street, complement, CEP, city, state } = restaurant.address;
        setStreet(street);
        setComplement(complement);
        setCEP(CEP);
        setCity(city);
        setState(state);
      }

      setTimeToDelivery(timeToDelivery);
      setDeliveryPrice(deliveryPrice);
      setPaymentMethods(paymentMethods);
    }
  }, [restaurant, img, isCanceled, user]);

  const handleSubmit = e => {
    e.preventDefault();
    setIsChanged(false);
    handleEditRestaurant();
  };

  const handleEditRestaurant = () => {
    const restaurantBody = {
      name: name,
      foods: foods,
      address: {
        street: street,
        complement: complement,
        CEP: CEP,
        city: city,
        state: state
      },
      paymentMethods: paymentMethods,
      timeToDelivery: timeToDelivery,
      deliveryPrice: parseInt(deliveryPrice, 10),
      img: img
    };
    const restaurantId = restaurant.uid;
    editRestaurant(restaurantId, restaurantBody);
  };

  const handleImgUpload = imageToUpload => {
    uploadImg(imageToUpload, restaurant);
    handleImgDialogClose();
  };

  const handleImgDialogClose = () => {
    setImgDialogOpen(false);
  };

  const handleImgDialogOpen = () => {
    setImgDialogOpen(true);
  };

  const handleCancelDialogOpen = () => {
    setCancelDialogOpen(true);
  };
  const handleCancelDialogClose = () => {
    setCancelDialogOpen(false);
  };

  const handleCancel = () => {
    setIsCanceled(!isCanceled);
    setCancelDialogOpen(false);
    setIsChanged(false);
  };

  return (
    <div>
      {(loading || newPasswordLoading) && (
        <div className={classes.progressContainer}>
          <CircularProgress className={classes.circularProgress} size={100} />
        </div>
      )}
      <PageTitle title={"Perfil"} />
      <div className={classes.imgDivStyle}>
        {img && (
          <CardMedia component="img" src={img} className={classes.imgStyle} />
        )}
        <Button
          variant="contained"
          component="label"
          color="primary"
          onClick={handleImgDialogOpen}
          className={classes.imgButton}
        >
          Trocar Imagem
        </Button>
      </div>
      <div className={classes.formFlexbox}>
        <UserForm
          user={user}
          newPasswordLoading={newPasswordLoading}
          setNewPasswordLoading={setNewPasswordLoading}
        />
      </div>
      <form onSubmit={handleSubmit} className={classes.formFlexbox}>
        <StoreForm
          name={name}
          setName={name => {
            setIsChanged(true);
            setName(name);
          }}
          foods={foods}
          setFoods={foods => {
            setIsChanged(true);
            setFoods(foods);
          }}
        />
        <AddressForm
          street={street}
          setStreet={street => {
            setIsChanged(true);
            setStreet(street);
          }}
          complement={complement}
          setComplement={complement => {
            setIsChanged(true);
            setComplement(complement);
          }}
          CEP={CEP}
          setCEP={CEP => {
            setIsChanged(true);
            setCEP(CEP);
          }}
          city={city}
          setCity={city => {
            setIsChanged(true);
            setCity(city);
          }}
          state={state}
          setState={state => {
            setIsChanged(true);
            setState(state);
          }}
        />
        <DeliveryForm
          timeToDelivery={timeToDelivery}
          setTimeToDelivery={timeToDelivery => {
            setIsChanged(true);
            setTimeToDelivery(timeToDelivery);
          }}
          deliveryPrice={deliveryPrice}
          setDeliveryPrice={deliveryPrice => {
            setIsChanged(true);
            setDeliveryPrice(deliveryPrice);
          }}
          paymentMethods={paymentMethods}
          setPaymentMethods={paymentMethods => {
            setIsChanged(true);
            setPaymentMethods(paymentMethods);
          }}
        />
        <Dialog
          open={imgDialogOpen}
          onClose={handleImgDialogClose}
          aria-labelledby="img-dialog-title"
          aria-describedby="img-dialog-description"
        >
          <DialogTitle id="img-dialog-title" color="primary">
            Selecione uma imagem para seu estabelecimento
          </DialogTitle>
          <ImageUploadDialogContent
            handleImgDialogClose={handleImgDialogClose}
            handleImgUpload={handleImgUpload}
          />
        </Dialog>
        <Dialog
          open={cancelDialogOpen}
          onClose={handleCancelDialogClose}
          aria-labelledby="img-dialog-title"
          aria-describedby="img-dialog-description"
        >
          <DialogTitle id="img-dialog-title" color="primary">
            Tem certeza que deseja cancelar as alterações?
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleCancelDialogClose} color="primary">
              Não
            </Button>
            <Button onClick={handleCancel} color="primary" autoFocus>
              Sim
            </Button>
          </DialogActions>
        </Dialog>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            className={classes.button}
          >
            Salvar
          </Button>
          <Button
            disabled={!isChanged}
            onClick={handleCancelDialogOpen}
            className={[classes.cancelButton, classes.button].join(" ")}
            variant="contained"
          >
            cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};
const mapDispatchToProps = dispatch => ({
  editRestaurant: (restaurantId, restaurantBody) =>
    dispatch(editRestaurantRequest(restaurantId, restaurantBody)),
  uploadImg: (imgToUpload, restaurantName) =>
    dispatch(uploadRestaurantImg(imgToUpload, restaurantName))
});

function mapStateToProps(state) {
  return {
    restaurant: state.restaurant.restaurant,
    loading: state.restaurant.loading,
    user: state.auth.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
