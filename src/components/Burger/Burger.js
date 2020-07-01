import React  from 'react';
import './Burger.css';
import BurgeerIngrediant from './BurgerIngrediants/BurgerIngrediant';

const burger = (props) => {
    let transformedIngrediants  = Object.keys(props.ingrediants)
     .map(igKey => {
         return [...Array(props.ingrediants[igKey])]
         .map((_,i)=>{
           return <BurgeerIngrediant  key={igKey + i} type={igKey} />
         })
    })
    .reduce((arr,el)=>{
        return arr.concat(el)
    },[]);

    if (transformedIngrediants.length === 0){
        transformedIngrediants = <p>Please start adding ingrediants</p>
    }

    return (
        <div className={'Burger'}>
            <BurgeerIngrediant  type="bread-top" />
            {transformedIngrediants}
            <BurgeerIngrediant  type="bread-bottom" />

        </div>
    )
};
export default burger;