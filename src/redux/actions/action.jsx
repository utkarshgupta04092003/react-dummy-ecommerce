export const ADD=(item)=>{
    return{
        type:"ADD_CART",
        payload:item
    }
}
//remove items
export const DLT=(id)=>{
    return{
        type:"RMV_CART",
        payload:id
    }
}


//remove individual item

export const REMOVE=(item)=>{
    return{
        type:"RMV_ONE",
        payload:item
    }
}

export const ADD_2=(item)=>{
    return{
        type:"ADD_Product",
        payload:item
    }
}


export const UPDATE=(item)=>{
    return{
        type:"Update_Product",
        payload:item
    }
}

//Delete Product From List
export const DELETE=(id)=>{
    return{
        type:"Delete_Product",
        payload:id
    }
}


//Search Product From List
export const SEARCH=(item)=>{
    return{
        type:"Search_Product",
        payload:item
    }
}

//Sort By Price
export const SORTLTH=()=>{
    return{
        type:"Sort_Product1",
        payload:""
    }
}

export const SORTHTL=()=>{
    return{
        type:"Sort_Product2",
        payload:""
    }
}

//Reset
export const RESET=()=>{
    return{
        type:"Reset_Product",
        payload:""
    }
}