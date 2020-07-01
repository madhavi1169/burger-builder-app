import React from "react";
import "./Order.css";
const order = (props) => {

  const ingrediants = [];
  for (let ingredientName in props.ingrediants) {
    ingrediants.push({
      ingredientName,
      amount: props.ingrediants[ingredientName],
    });
  }
  const ingredientOutput = ingrediants.map((ig) => {
    return (
      <span 
      style={{textTransform:'capitalize',
      display:'inline-block',
      margin:'0 8px',
      border:'1px solid #ccc',
      padding:'5px'

    }}
      key={ig.ingredientName}>
        {ig.ingredientName} ({ig.amount})
      </span>
    );
  });
  return (
    <div className="Order">
      <p>Ingrediants: {ingredientOutput}</p>

      <p>
        Price: <strong>Rs {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};
export default order;
