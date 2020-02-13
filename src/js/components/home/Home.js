import React from 'react';
import { connect } from "react-redux";
import { logoutUser } from "../../actions";
import { makeStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, Drawer, List, Typography, Divider, ListItem, ListItemText} from '@material-ui/core';
import {  Route, Switch, NavLink} from 'react-router-dom';

import RestaurantHeader from '../common/RestaurantHeader';
import RestaurantStatus from '../common/RestaurantStatus';
import Profile from '../profile/profile';
import RestaurantMenu from '../restaurantMenu/restaurantMenu';
import Dashboard from '../dashboard/dashboard';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    display:'flex',
    width: '100%',
    zIndex: theme.zIndex.drawer + 1,
    flexDirection: 'row'  
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#efefef'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  firstHeaderStyle:{
    display:'block',
    width: drawerWidth
  },
  headerStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 'calc(100% - 240px)'
}, 
  linkStyle:{
    textDecoration:'none',
    color: '#000'
  },
  inactiveStyle:{
    backgroundColor: '#efefef'

  },
  activeStyle:{
    backgroundColor: '#e6e6e6'  

  }
}));


const Home = (props) => {
  const classes = useStyles();
  const { isLoggingOut, user, restaurant,location } = props;
  console.log(location.pathname)
  console.log(restaurant)
  const handleLogout = () => {
      const { dispatch } = props;
      dispatch(logoutUser());
    };

  return(
    <div className={classes.root}>
    <AppBar position="fixed" className={classes.appBar}>
        <div className={classes.firstHeaderStyle}>
          <Toolbar>
            <Typography variant="h6" noWrap>
                Bom delivery
            </Typography>
          </Toolbar>
        </div>
        <div  className={classes.headerStyle}>
        <RestaurantHeader img={restaurant.img} name={restaurant.name}/>
        <Toolbar>
            <RestaurantStatus open={restaurant.open} />
            </Toolbar>
        </div>
        
  </AppBar>
  <Drawer
    className={classes.drawer}
    variant="permanent"
    classes={{
      paper: classes.drawerPaper,
    }}
    anchor="left"
  >
    <div className={classes.toolbar } />
    <Divider />
    <List >
      {[ {route: '/' ,text:'Ínicio'}, {route: '/profile' ,text:'Perfil'}, {route: '/menu' ,text:'Cardápio'}].map((el, index) => (
        <NavLink   to={el.route} key={index} className={classes.linkStyle} >
          <ListItem button key={index} className={location.pathname === el.route ? classes.activeStyle : classes.inactiveStyle}>
            <ListItemText primary={el.text} />
          </ListItem>
        </NavLink>
      ))}
    </List>
    <Divider />
    <List>
      <ListItem onClick={handleLogout} button key={"Sair"}>
        <ListItemText primary={"Sair"}/>
      </ListItem>
    </List>
  </Drawer>
  <main className={classes.content}>
        <div className={classes.toolbar} /> 
        <Switch>
        <Route path="/" exact component={Dashboard}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/menu" component={RestaurantMenu} />

        </Switch>
  </main>   
</div>
)
}

function mapStateToProps(state) {
    return {
      isLoggingOut: state.auth.isLoggingOut,
      logoutError: state.auth.logoutError,
      user: state.auth.user,
      restaurant: state.restaurant.restaurant
    };
  }
export default connect(mapStateToProps)(Home);