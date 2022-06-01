import {loadStripe} from "@stripe/stripe-js/pure";
import {useEffect, useState} from 'react';
import Head from "next/head";
import {Elements} from "@stripe/react-stripe-js";
import Script from "next/script";
import CheckoutForm from '../components/CheckoutForm'
import axios from "axios";
import styles from "../styles/website/Checkout.module.css";
import {useSelector, useDispatch} from "react-redux";
import useToggle from "../components/hooks/useToggle";
import {useRouter} from "next/router";



const Checkout = () => {
    const guest = useSelector(state=>state.guest)
    const cart = useSelector(state=>state.cart);
    const [clientSecret, setClientSecret] = useState('');
    const [paymentIntent, setPaymentIntent] = useState('')
  const [stripeObject, setStripeObject] = useState(null)
    const [success, setSuccess] = useToggle()
    const router = useRouter()
    const dispatch = useDispatch();

    useEffect(() => {
        const newIntent = async() => {
          const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
          setStripeObject(stripe)
            try {
                const res = await axios.post('/api/stripe/stripe_intent', {
                    headers: {'Content-Type': 'application/json'},
                    amount: Math.round((cart.total + cart.shipping.shippingCost) * 100),
                    items: cart,
                    payment_intent_id: '',
                })

                setClientSecret( res.data.client_secret),
                    setPaymentIntent(res.data.id)

            } catch (err) {
                console.log(err)
            }
        }
        newIntent()
    },[cart]);
    /*useEffect(() =>{
        const finalizeOrder = async() => {
            const session = await getSession()
            if(cart.processed === 'succeeded'){
                await updateOrder(dispatch, session, cart.cartId, cart, cart.products, guest)
                 router.push('/success')
            }
        }
        finalizeOrder()
    },[cart.processed === 'succeeded'])*/

    const appearance = {
        theme: 'flat',
        labels: 'floating',
    };
    const options = {
        clientSecret,
        appearance,

    };

    return (
        <div className={styles.container}>
            <Script src="https://js.stripe.com/v3" async></Script>
            {success && <h1>Order Number: {cart.cartId}</h1>}
            <Head>

                <title></title></Head>
            {!success &&
                <>
                {cart.total > 0 ? <h1>Total: €{(cart.total + cart.shipping.shippingCost).toFixed(2)}</h1> : <h1>€0.00</h1>}




              {clientSecret && (
                    <Elements key={clientSecret} options={options} stripe={stripeObject}>
                        <CheckoutForm  total={cart.total} paymentIntent={paymentIntent}/>
                    </Elements>
                )}


                </>  }
        </div>
    );
};

export default Checkout;
Checkout.layout = "L3";
