
import {addProduct, editProduct, clearCart, newId, removeProduct, cartStart, addProcess} from "./cartSlice"

import {addFavorite, favoriteStart} from "./favoriteSlice";
import axios from "axios";

import {addItem} from "./productSlice";
import {clearGuest, guestStart} from "./guestSlice";

export const retrieveCart = async (dispatch, session, cart) => {
console.log(session)

    if(session.cart[0]?.items.length >0 && session.cart[0].status === 0){
         dispatch(
             cartStart(session.cart[0]),
         )

     }else if(cart.products.length>0){

         try{
             const res = await axios.post(`/api/cart`,

                 {
                     userId: session.id,
                        items: cart.products
                 })
             dispatch(newId(res.data._id))

         }catch(err){
             console.log(err)
         }
     }
    if(session.favorites.length >=1){
        dispatch(
            favoriteStart(session.favorites[0])
        )

    }else{
    return null
    }

      /*try{
          //const cart = await axios.get(`/api/cart/${session.cart[0]._id}`)
         //const favorites = await axios.get(`/api/favorite/${session.favorites[0]._id}`)
        console.log('cart', cart)
        dispatch(
            cartStart(session.cart[0]),
        )
        {productId, color, size, quantity, name: product.name, img: product.img[0], price: product.price, modelId: product.modelId}
        dispatch(
              favoriteStart(session.favorites[0]),
          )
      }catch(err){
          console.log(err)
      }*/
    }

export const setFavorites = async (dispatch, items, session, favs, favoriteCart) => {

    if(!session){
        return null;
    }
    if(session && favoriteCart.length === 0){
        console.log('first')
        try{
            const res = await axios.post(`/api/favorite`,
                {
                    userId: session.id,
                    items: {...items}
                })
            dispatch(
                addFavorite({...items})
            )
            console.log('res at api', res.data)
        }catch(err){
            console.log(err)
        }
    }
    if(session && favoriteCart.length > 0){
        console.log(items)
       try {
            const res = await axios.put(`/api/favorite?favorite=${session.id}`,
                {save: items},
            )
            console.log('res at api', res.data)
            dispatch(
                addFavorite({...items})
            )

        } catch (err) {
            console.log(err)
        }
    }


};
export const editFavorites = async (dispatch, items, session) => {
    console.log(session)
   try{
       const res = await axios.put(`/api/favorite?favorite=${session.id}`,
           {remove: items._id},
            )
    }catch(err){
        console.log(err)
    }


}
export const newCart = async (dispatch, items, session, cart) => {

  if(!session){
        dispatch(
            addProduct(items)
        );

    }
    if(session && cart.length === 0) {
        try{
            const res = await axios.post(`/api/cart`,
                {
                    userId: session.id,
                    items
                })
            dispatch(
                addProduct(items)
            )
            dispatch(newId(res.data._id))
            console.log('res at api', res.data)
        }catch(err){
            console.log(err)
        }
    }
  if(session && cart.length > 0){
        try {
            const res = await axios.put(`/api/cart?cart=${session.id}`,
                 items,
            )
            dispatch(
                addProduct(items)
            )
            dispatch(newId(res.data._id))
            console.log('--->',res.data)
        } catch (err) {
            console.log(err)
        }
    }
};

export const updateCartItem = async (dispatch, quant, id, productId, idx, total, session) => {
   if(session){
       try{
           const res = await axios.put(`/api/cart/${id}`,
               {quant, id,  productId}
           )
           dispatch(
               editProduct({quant, idx, total})
           )

       }catch(err){
           console.log(err)
       }
   }else{
       dispatch(
           editProduct({quant, idx, total})
       )
   }

};

export const deleteCartItem = async (dispatch, id, deleteId, idx, amount, session) => {
    console.log('amount', amount)

    if(session){
        try{
            const res = await axios.put(`/api/cart/${id}`,
                {deleteId}
            );
            dispatch(
                removeProduct({idx, amount})
            )
            console.log('Item successfully deleted...')
        }catch(err){
            console.log(err)
        }
    }else{
        dispatch(
            removeProduct({idx, amount})
        )
    }
}

export const deleteCart = async (dispatch, id, cart, session) => {
    console.log(id)
  if(session){
      try{
          const res = await axios.delete(`/api/cart/${id}`

          );
          dispatch(clearCart({...cart.products}))
          console.log('Item successfully deleted...')
      }catch(err){
          console.log(err)
      }
  }else{
      dispatch(clearCart({...cart.products}))
  }
}


export const updateOrder = async (dispatch, session, id, cart, items, event) => {
//console.log('api--->', session)
console.log(event)

    try{

        const res = await axios.post('/api/orders',
          {
            userId: session.id,
            customer: {firstName: session.firstName, lastName: session.lastName},
            address: session.user.address,
            email: session.personal.email,
            total: cart.total,
            items: cart.products,
            purchaseType: 'Web-shop',
            shippingMethod: cart.shipping
          });
        console.log(res.data)
        const remove = await axios.delete(`api/cart/${id}`)


        dispatch(clearCart({...cart.products}))



    }catch(err){
        console.log(err)
    }
}
export const guestOrder = async(dispatch, id, cart, items, guest) => {

    try{
        const res = await axios.post('/api/orders',
            {
                userId: cart.cartId + new Date().getTime(),
                customer: {firstName: guest.shipping.firstName, lastName: guest.shipping.lastName},
                address: {address: guest.shipping.address, city: guest.shipping.city,
                    postalCode: guest.shipping.postalCode, country: guest.shipping.country},
                email: guest.shipping.email,
                phone: guest.shipping.phone,
                total: cart.total,
                items: cart.products,
                purchaseType: 'Web-shop',
                shippingMethod: cart.shipping
            });

        console.log(items)
        dispatch(clearCart({...cart.products}))

        console.log('order', res.data)
    }catch(err){
        console.log(err)
    }
    dispatch(clearGuest(guest))

}
export const updateInventory = async(cart) => {

    cart.products.map(async(item)=>{
            try{
                const inventory = await axios.put(`/api/products/inventory/${item.productId}`,
                    {quantity: item.quantity}
                    )
                console.log(inventory.data)
            }catch(err){
                console.log(err)
            }

        })



}
export const retrieveProducts = async (dispatch, products) => {

        dispatch(
            addItem([...products])
        )


}

export const newGuest = async(dispatch, guestUser) => {

    dispatch(guestStart(guestUser))
}

