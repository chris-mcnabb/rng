import {createSlice} from "@reduxjs/toolkit";

const itemSlice = createSlice({
    name: "item",
    initialState:{
        items: [],
        quantity: 0,


    },
    reducers: {
        addItem: (state, action)=>{
            console.log('payload',action.payload)
            state.items=(action.payload)


        },

    }
})

export const {addItem} = itemSlice.actions;
export default itemSlice.reducer;
