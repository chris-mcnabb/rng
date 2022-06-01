import {createSlice} from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name: "favorite",
    initialState:{
        favorites: [],
        quantity: 0,
        isFetching: false,


    },
    reducers: {

        favoriteStart: (state, action)=>{
            state.favorites=action.payload.items;
            state.quantity=action.payload.items.length
        },
        addFavorite: (state, action)=>{
            state.isFetching=false;
            state.quantity +=1;
            state.favorites.push(action.payload);
            },
        removeFavorite: (state, action)=>{
            state.quantity -=1;
            const {id} = action.payload;
            state.favorites = state.favorites.filter(item => item._id !== id)



        },
        clearFavorite: (state) => {
            state.favorites = [];
            state.quantity = 0;

        },

    }
})

export const {addFavorite, clearFavorite, removeFavorite, favoriteStart} = favoriteSlice.actions;
export default favoriteSlice.reducer;
