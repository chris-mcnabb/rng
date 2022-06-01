
import {createSlice} from "@reduxjs/toolkit";

const guestSlice = createSlice({
    name: "guest",
    initialState:{
        shipping: [],

        isFetching: false,


    },
    reducers: {

        guestStart: (state, action)=>{
            state.shipping=action.payload;
            state.isFetching=true;

        },
        addGuest: (state, action)=>{
            state.isFetching=false;
            state.quantity +=1;
            state.guests.push(action.payload);
        },
        removeGuest: (state, action)=>{
            state.quantity -=1;
            const {id} = action.payload;
            state.guests = state.guests.filter(item => item._id !== id)



        },
        clearGuest: (state) => {
            state.shipping = [];
            state.isFetching=false;

        },

    }
})

export const { clearGuest, guestStart} = guestSlice.actions;
export default guestSlice.reducer;
