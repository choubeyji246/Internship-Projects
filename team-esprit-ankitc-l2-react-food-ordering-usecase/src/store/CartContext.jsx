import React from 'react'
import { createContext, useReducer } from 'react'

const CartContext = createContext({
    items:[],
    addItem:(item)=>{},
    removeItem:(id)=>{},
    clearCart: () => {}
})

const cartReducer = (state, action)=>{
    if(action.type === "ADD_ITEM"){
        const existingCartItemIndex = state.items.findIndex(
            (item)=>item.id === action.item.id
        )
        const existingCartItem = state.items[existingCartItemIndex]
        const updatedItems = [...state.items]
        if(existingCartItemIndex > -1){
            const updatedItem ={
                ...existingCartItem,
                quantity:existingCartItem.quantity +1
            }
            updatedItems[existingCartItemIndex] = updatedItem
        }else{
            updatedItems.push({...action.item, quantity:1})
        }

        return {...state ,items: updatedItems}
    }
    if(action.type === "REMOVE_ITEM"){
        const existingCartItemIndex = state.items.findIndex(
            (item)=>item.id === action.id
        )
        const existingCartItem = state.items[existingCartItemIndex]
        const updatedItems =[...state.items]
        if(existingCartItem.quantity === 1){
            
            updatedItems.splice(existingCartItemIndex, 1)
        }else{
            const updatedItem ={
                ...existingCartItem,
                quantity:existingCartItem.quantity -1
            }
            updatedItems[existingCartItemIndex] = updatedItem
        }
        return {...state, items:updatedItems}

    }
    if (action.type === "CLEAR_CART") { 
        return { ...state, items: [] };
    }
    return state;
}
const CartContextProvider = ({children}) => {

    const [cart, dispatchCartMethod]  = useReducer(cartReducer,{items:[]})

    const addItem = (item)=>{
        dispatchCartMethod({
            type:"ADD_ITEM",
            item
        })
    }

    const removeItem = (id)=>{

        dispatchCartMethod({
            type:"REMOVE_ITEM",
            id
        })
    }

    const clearCart = () => {
        dispatchCartMethod({ type: "CLEAR_CART" }); 
    }

    const cartContext ={
        items: cart.items,
        addItem,
        removeItem,
        clearCart
    }
    return <CartContext.Provider value={cartContext}>
        {children}
    </CartContext.Provider>

}

export {CartContextProvider, CartContext}
