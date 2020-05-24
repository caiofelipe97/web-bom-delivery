import React, { useState } from "react";
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
  IconButton
} from "@material-ui/core";
import { Route, Switch, NavLink } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import MenuIcon from "@material-ui/icons/Menu";

import RestaurantHeader from "../common/RestaurantHeader";
import RestaurantStatus from "../common/RestaurantStatus";
import Profile from "../profile/profile";
import RestaurantMenu from "../restaurantMenu/RestaurantMenu";
import Dashboard from "../dashboard/dashboard";

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
      backgroundColor: "#efefef"
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    toolbar: theme.mixins.toolbar,
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
      backgroundColor: "#efefef"
    },
    activeStyle: {
      backgroundColor: "#e6e6e6"
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
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { user, restaurant, location } = props;
  const handleLogout = () => {
    const { dispatch } = props;
    dispatch(logoutUser());
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {[
          { route: "/", text: "Início" },
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
            <ListItem
              button
              key={index}
              className={
                location.pathname === el.route
                  ? classes.activeStyle
                  : classes.inactiveStyle
              }
            >
              <ListItemText primary={el.text} />
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem onClick={handleLogout} button key={"Sair"}>
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
