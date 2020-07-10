import React, { useState } from "react";
import Aux from "../Aux/Aux";
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect} from 'react-redux';

const Layout = (props) => {

    const [sideDrawerIsVisible,setSideDrawerIsVisible] = useState(false)

    // state = {
    //     showSideDrawer:false
    // }
    const sideDrawerClosedHandler = ()=>{
        // this.setState({showSideDrawer:false})
        setSideDrawerIsVisible(false)
    }
    const sideDrawerToggleHandler = () => {
        // this.setState((prevState) => {
        //     return {showSideDrawer:!prevState.showSideDrawer}
        // })
        setSideDrawerIsVisible(!sideDrawerIsVisible)

    }
  return (
    <Aux>
        <Toolbar
        isAuth={props.isAuthenticated}
         drawerToggleClicked={sideDrawerToggleHandler}/>
        <SideDrawer 
         isAuth={props.isAuthenticated}
        open={sideDrawerIsVisible}
         closed={sideDrawerClosedHandler}/>
      <main className="Content">
          {props.children}
      </main>
    </Aux>
  );

};
const mapStateToProps = state =>{
    return{
        isAuthenticated:state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout);
