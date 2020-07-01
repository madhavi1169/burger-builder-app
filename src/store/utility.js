export const updateObject = (oldObj,updatedProprs)=>{
    return{
        ...oldObj,
        ...updatedProprs
    }
}