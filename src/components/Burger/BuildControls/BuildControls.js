import React from "react";
import "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";
const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" },
];
const buildControls = (props) => (
  <div className={"BuildControls"}>
      <p>Current Price : <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map((ctrl) => (
      <BuildControl  
      added={()=>props.ingrediantAdded(ctrl.type)}
      removed = {()=>props.ingrediantRemoved(ctrl.type)}
      key={ctrl.label} 
      label={ctrl.label}
      disabled={props.disabled[ctrl.type]}
      />
    ))}

    <button className={'OrderButton'}
     disabled={!props.purchasable}
    onClick={props.ordered}>{props.isAuth ?'ORDER NOW': 'SIGN UP TO ORDER'}</button>
  </div>
);
export default buildControls;
