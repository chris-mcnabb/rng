import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import styles from "../styles/website/Login.module.css";
import {getSession} from "next-auth/react";
import {guestOrder, updateInventory, updateOrder} from "../redux/apiCalls";

const Success = () => {

    const dispatch = useDispatch();
    const guest = useSelector(state=>state.guest)
    const cart = useSelector(state=>state.cart);
    const success = useSelector(state=>state.cart.processed)

console.log(success)
    useEffect(() =>{

           const finalizeOrder = async() => {

             const session = await getSession()

        if(success==='succeeded'){
          if(session?.user){
            await updateOrder(dispatch, session, cart.cartId, cart, cart.products)
          }else{
            await guestOrder(dispatch, cart.cartId, cart, cart.products, guest)
          }

        }
                console.log('i fire once')

           }
           finalizeOrder()
       },[success])



    return (

        <div className={styles.resetContainer}>
            <div className={styles.orderConfirm}>
            <h1 className={styles.title}>Thank You For Your Order!!</h1>

              <h1 className={styles.title}>You Will Receive a Confirmation Email Shortly.</h1>
          </div>



        </div>
    );
};

export default Success;
Success.layout = "L3";
