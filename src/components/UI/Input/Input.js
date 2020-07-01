import React from "react";
import "./Input.css";
const input = (props) => {
  let inputElement = null;
  const inputClassses  = ['InputElement']
  if (props.invalid && props.shouldValidateData && props.touched){
    inputClassses.push('Invalid');
  }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClassses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClassses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}

        />
      );
      break;
      case "select":
      inputElement = (
        <select
          className={inputClassses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}

        >
            {props.elementConfig.options.map(option =>(
                <option 
                key={option.value}
                value={option.value}
                >{option.dispalyValue}</option>
            ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClassses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className="Input">
      <label className="Label">{props.label}</label>
      {inputElement}
    </div>
  );
};
export default input;
