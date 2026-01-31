import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }];
        case "REMOVE":
            let newArr = [...state];
            newArr.splice(action.index, 1);
            return newArr;
        case "UPDATE":
            let arr = [...state];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].id === action.id && arr[i].size === action.size) {
                    arr[i] = {
                        ...arr[i],
                        qty: action.qty,
                        price: action.price
                    };
                    break;
                }
            }
            return arr;

        case "DROP":
            let empArr = [];
            return empArr;
        default:
            console.log("Error in reducer");
    }


}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>

    )

}
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);