import React from 'react';
import './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = (props) => {
    let attachClasses = ["SideDrawer","Close"]
    if (props.open){
        attachClasses = ["SideDrawer","Open"]
    }
    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <p>{attachClasses}</p>
        <div className={attachClasses.join(' ')} onClick={props.closed}>
          <Logo height="11%"/>
            <nav>
            <NavigationItems isAuthenticated={props.isAuth}/>

            </nav>

        </div>
        </Aux>
    )
    
}
export default sideDrawer;