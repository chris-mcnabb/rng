import {configureStore, combineReducers} from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

import favoriteReducer from "./favoriteSlice"
import guestReducer from './guestSlice'
import itemReducer from "./productSlice"

import {

    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from "./storage"
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}
const rootReducer = combineReducers({cart: cartReducer, favorite: favoriteReducer, item: itemReducer, guest: guestReducer});

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
export const persistor = persistStore(store)
