import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemText,
  IconButton,
  ListItemIcon
} from "@material-ui/core";
import { Route, Switch, NavLink } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import MenuIcon from "@material-ui/icons/Menu";
import {
  getRestaurant
} from "../../actions/restaurant.actions";
import RestaurantHeader from "../common/RestaurantHeader";
import RestaurantStatus from "../common/RestaurantStatus";
import Profile from "../profile/profile";
import RestaurantMenu from "../restaurantMenu/RestaurantMenu";
import Dashboard from "../dashboard/dashboard";
import AssessmentIcon from "@material-ui/icons/Assessment";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const drawerWidth = 240;
const useStyles = makeStyles(theme => {
  console.log(theme);
  return {
    root: {
      display: "flex"
    },
    appBar: {
      display: "flex",
      width: "100%",
      zIndex: theme.zIndex.drawer + 1,
      flexDirection: "row"
    },
    drawer: {
      [theme.breakpoints.up("md")]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: "#f6f6f6"
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "center"
    },
    divider: {
      alignSelf: "center",
      width: 60,
      backgroundColor: theme.palette.primary.light,
      margin: "auto",
      height: 2
    },
    firstDivider: {
      [theme.breakpoints.up("md")]: {
        height: 0
      }
    },
    firstHeaderStyle: {
      display: "block",
      width: drawerWidth
    },
    headerStyle: {
      display: "flex",
      justifyContent: "space-between",
      width: "calc(100% - 240px)"
    },
    linkStyle: {
      textDecoration: "none",
      color: "#000"
    },
    inactiveStyle: {
      display: "flex",
      backgroundColor: "#f6f6f6"
    },
    activeStyle: {
      color: theme.palette.primary.light
    },
    activeText: {
      fontWeight: "bold"
    },
    activeIcon: {
      color: theme.palette.primary.light
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    }
  };
});

const Home = props => {
  const { user, restaurant, location } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(()=>{
    if(user.restaurantId)
      getRestaurant(user.restaurantId)
  },[user])


  const handleLogout = () => {
    const { dispatch } = props;
    dispatch(logoutUser());
  };



  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <Typography color="primary" variant="h6" noWrap>
          Bom delivery
        </Typography>
      </div>
      <Divider className={[classes.divider, classes.firstDivider].join(" ")} />
      <List>
        {[
          { route: "/", text: "Painel de Controle" },
          { route: "/profile", text: "Perfil" },
          { route: "/menu", text: "Cardápio" }
        ].map((el, index) => (
          <NavLink
            to={el.route}
            key={index}
            className={classes.linkStyle}
            onClick={() => {
              setMobileOpen(false);
            }}
          >
            <ListItem button key={index} className={classes.inactiveStyle}>
              <ListItemIcon
                className={
                  location.pathname === el.route ? classes.activeIcon : ""
                }
              >
                {index === 0 ? <AssessmentIcon /> : index === 1 ? <AccountBoxIcon /> : index === 2 ? <MenuBookIcon /> : null}
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography
                    type="body1"
                    className={
                      location.pathname === el.route ? classes.activeText : ""
                    }
                  >
                    {el.text}
                  </Typography>
                }
              />
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider className={classes.divider} />
      <List>
        <ListItem onClick={handleLogout} button key={"Sair"}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary={"Sair"} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <div className={classes.firstHeaderStyle}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Bom delivery
            </Typography>
          </Toolbar>
        </div>
        <div className={classes.headerStyle}>
          <RestaurantHeader img={restaurant.img} name={restaurant.name} />
          <Toolbar>
            <RestaurantStatus open={restaurant.open} />
          </Toolbar>
        </div>
      </AppBar>
      <Hidden smDown implementation="css">
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          anchor="left"
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/profile" component={Profile} />
          <Route path="/menu" component={RestaurantMenu} />
        </Switch>
      </main>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
    user: state.auth.user,
    restaurant: state.restaurant.restaurant
  };
}
export default connect(mapStateToProps)(Home);
