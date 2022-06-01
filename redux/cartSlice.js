import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState:{
        products: [],
        quantity: 0,
        processed: [],
        total: 0,
        shipping: {},
        cartId: 'guest',
        isFetching: false,
        setToPay: false,
        orders: {}

    },
    reducers: {
        cartStart: (state, action)=>{
            state.products=action.payload.items;
            state.quantity=action.payload.items.length;
            state.cartId = action.payload._id;
            state.total = action.payload.items.reduce((sub, item) => {
                return sub + (item.price * item.quantity)
            }, 0)
        },
        addProduct: (state, action)=>{
            state.quantity +=1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
        amendTotal: (state, action) => {
           state.total = action.payload.total

        },

        editProduct: (state, action)  => {
            const {quant, idx} = action.payload;
            state.products[idx].quantity =  quant
            console.log( state.products[idx].quantity)
            state.total = state.total + action.payload.total
            /* return {...state, total: state.total + action.payload.total, products: state.products.map((p)=>p._id===item ?
                     {...p, quantity: p.quantity+inc} : p)}*/


        },
        removeProduct: (state, action) =>{
            state.quantity -=1;
            const {idx} = action.payload;
            state.total=state.total - action.payload.amount;
            state.products.splice(idx, 1);
            return

        },
        newId: (state, action) => {
            state.cartId = action.payload
        },
        setTotal: (state, action) => {
            const total = action.payload.items.reduce((sub, item) =>{
                return sub + (item.price * item.quantity)
            }, 0)
            state.total = total
        },
        clearCart: (state) => {
            state.products = [];
            state.processed = [];
            state.quantity = 0;
            state.total = 0;
            state.cartId = 'guest';
            state.shipping = {}
        },
        makePayment: (state) => {
            state.setToPay = true;
        },
        clearAddress: (state) => {
            state.setToPay = false;
        },
        addProcess: (state, action) => {
            state.processed = action.payload
        },
        shippingMethod: (state, action) => {
            state.shipping = action.payload
        },
        getOrder: (state, action) =>{
            state.orders = action.payload
        }

    }
})

export const {addProduct, clearCart, removeProduct, addProcess, editProduct, setTotal, cartStart, shippingMethod, newId, getOrder} = cartSlice.actions;
export default cartSlice.reducer;
