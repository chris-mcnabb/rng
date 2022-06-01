import  {useState, useEffect} from 'react';

import styles from "../../styles/website/Cart.module.css";
import Image from "next/image";

import {useSession} from "next-auth/react";

import Modal from "../../components/Modal";
import Head from "next/head";
import {useSelector, useDispatch} from "react-redux";
import {shippingMethod} from "../../redux/cartSlice";
import {deleteCart, deleteCartItem, updateCartItem} from "../../redux/apiCalls";
import useToggle from "../../components/hooks/useToggle";
import Link from "next/link";
import ArrowBack from "../../components/icons/ArrowBack";
import TrashCan from "../../components/icons/TrashCan";

const Cart = () => {

    const cart = useSelector(state=>state.cart);
    const {isFetching} = useSelector(state=>state.guest)

    const dispatch = useDispatch()
    const [complete, setComplete] = useToggle()
    const [cartQuantity, setCartQuantity] = useState(0)
    const [selected, setSelected] = useState('')
    const [clientSecret, setClientSecret] = useState('');
    const [paymentIntent, setPaymentIntent] = useState('');
    const [showModal, setShowModal] = useToggle()
    const [shipping, setShipping] = useState({})
    const [title, setTitle] = useState('')
    const [showCheckout, setShowCheckout] = useState(false)
    const [couponCode, setCouponCode] = useState('')
    const [id, setId] = useState(cart.cartId)
    const {data: session}=useSession()
  console.log(session)
  useEffect(()=>{
    if(isFetching){
      setShowCheckout(true)
    }
    if(session?.user){
      setShowCheckout(true)
    }

  },[isFetching, session])

    const handleQuantity =  async(e, idx, item) => {

        const difference = e.target.value-item.quantity
      await updateCartItem(dispatch, e.target.value, id,  item.productId, idx,  (item.price * difference), session)

    }
    const handleRemoveItem =  async(item, idx) => {


     if(cart.products.length === 1){
         await deleteCart(dispatch, id, cart, session)
      }else{
          await deleteCartItem(dispatch, id, cart.products[idx].productId, idx, (item.price * item.quantity), session)
      }
       //await deleteCartItem(dispatch, id, mongoCart.items[idx]._id, idx, (item.price * item.quantity))
    }

   // const stripe =  loadStripe(publishableKey)
    const handleClick = (data) => {
        setTitle(data)

        setShowModal()
    }
    const handleChange = (e) => {

       setSelected(e.target.value)
        setComplete()
        if(e.target.value === 'Winkel'){
            setShipping({'shippingMethod': e.target.value, 'shippingCost': 0})
            dispatch(shippingMethod({'shippingMethod': e.target.value,
                shippingCost:0}))
        }
        if(e.target.value === 'PostNL'){
            if(cart.total >= 70){
                setShipping({'shippingMethod': e.target.value, 'shippingCost': 0})
                dispatch(shippingMethod({'shippingMethod': e.target.value,
                    shippingCost: 0}))
            }else{
                setShipping({'shippingMethod': e.target.value, 'shippingCost': 6.95})
                dispatch(shippingMethod({'shippingMethod': e.target.value,
                    shippingCost: 6.95}))
            }
        }

    };
console.log(showCheckout)
    return (
        <div className={styles.container}>

            <Head>

                <title></title></Head>
            <Modal showModal={showModal} cart={cart} setShowModal={setShowModal} title={title} shipping={shipping} amount={cart.total} location={'checkout'}  clientSecret={clientSecret}  paymentIntent={paymentIntent}/>
            <div className={styles.header}>
               <div className={styles.backArrow}>
                   <ArrowBack className={styles.terug}/><h1 > Terug</h1>
               </div>

                <h1>WinkelWagen</h1>
            </div>
            <div className={styles.wrapper}>
            <div className={styles.left}>
                {cart.products.map((item, idx)=>(
                    <div className={styles.product} key={idx}>
                        <div className={styles.productDetail}>
                            <div  className={styles.mainImage}>
                                <Image  src={`/img/${item.img}`} alt='' height={200} width={200} objectFit='contain'/>
                            </div>
                            <div  className={styles.mobileImage}>
                                <Image  src={`/img/${item.img}`} alt='' height={50} width={70} objectFit='contain'/>
                            </div>

                            <div className={styles.details}>
                                <span><b>Name:</b> {item.name}</span>
                                <span><b>ID:</b> {item.modelId}</span>
                                {item.color && <span><b>Color:</b> {item.color}</span>}
                                {item.size && <span><b>Size:</b> {item.size}</span>}
                            </div>
                        </div>
                        <div className={styles.priceDetail}>
                            <div className={styles.productAmountContainer}>
                                <input  type="number" defaultValue={item.quantity} min={1} className={styles.quantity}
                                       onChange={(e)=>handleQuantity(e, idx, item)} />

                            </div>
                            <div className={styles.productPrice}>
                              <span>  €{Number(item.price*(item.quantity)).toFixed(2)}</span>
                            </div>
                            <div className={styles.trashcan} onClick={()=>handleRemoveItem(item, idx)}>
                                <TrashCan />
                            </div>
                            <div className={styles.delete}  onClick={()=>handleRemoveItem(item, idx)}>
                                <span>X</span>
                            </div>

                        </div>

                    </div>

                ))}
                <hr className={styles.hr}/>
            </div>
            <div className={styles.right}>
                <div className={styles.topRight}>
                    {!showCheckout  &&
                        <>
                        <h1 className={styles.h1Summary}>Checkout As:</h1>
                        <div className={styles.buttonContainer}>
                        <span className={styles.checkoutButton} onClick={()=>handleClick('Guest')}>
                        Guest
                        </span>
                        <h2 className={styles.h2}>Or</h2>
                        <span className={styles.checkoutButton} onClick={()=>handleClick('Login')}>
                        Login
                        </span>
                        </div>
                        </>
                        }

                    <div className={styles.summary}>
                        <span className={styles.summaryText}>Choose Shipping Method</span>
                        <div className={styles.checkBox}>

                               <input id='Winkel' type="radio" checked={selected === 'Winkel'} value='Winkel' onChange={handleChange}/>
                               <label className={styles.checkboxLabel}>Winkel</label>

                                <input id='PostNL' type="radio"   checked={selected === 'PostNL'} value='PostNL' onChange={handleChange}/>
                                <label className={styles.checkboxLabel}>PostNL </label>


                        </div>

                    </div>

                    <div className={styles.summary}>
                        <span className={styles.summaryText}>Coupon Code</span>
                        <input onChange={(e)=>setCouponCode(e.target.value)}className={styles.coupon} type='text' placeholder={'Enter Code...'}/>
                    </div>
                    <div className={styles.summary}>
                        <h2>SUB-TOTAL:</h2>
                        {cart.total > 0 ?<h2>€{cart.total.toFixed(2)}</h2> : <h2>€0.00</h2>}
                    </div>
                    <hr/>
                </div>
                <div className={styles.bottomRight}>
                    <h1 className={styles.h1Summary}>Order Summary</h1>
                    <div className={styles.summary}>
                        <span className={styles.summaryText}>Subtotal</span>
                        {cart.total > 0 ?<span className={styles.summaryPrice}>€{(cart.total/1.21).toFixed(2)}</span> : <h2>€0.00</h2>}
                    </div>
                    <div className={styles.summary}>
                        <span className={styles.summaryText}>Estimated Shipping</span>
                        {shipping.shippingCost !==undefined ? <span className={styles.summaryPrice}>€{shipping.shippingCost.toFixed(2)}</span>
                            : <span className={styles.summaryPrice}>€0.00</span>
                        }
                    </div>
                    <div className={styles.summary}>
                        <span className={styles.summaryText}>Discount</span>
                        <span className={styles.summaryPrice}>€0.00</span>
                    </div>
                    <div className={styles.summary}>
                        <span className={styles.summaryText}>Tax</span>
                        {cart.total > 0 ? <span className={styles.summaryPrice}>€{(cart.total-(cart.total/1.21)).toFixed(2)}</span> : <h2>€0.00</h2>}
                    </div>
                    <div className={styles.summary}>
                       <span className={styles.summaryText}>Coupon Code</span>
                        {couponCode &&   <span>{couponCode}</span>}
                    </div>
                    <div className={styles.summary}>
                        <h2>SUB-TOTAL:</h2>
                        {cart.total > 0 ?<h2>€{cart.total.toFixed(2)}</h2> : <h2>€0.00</h2>}
                    </div>
                    <div className={styles.summary}>
                        <h2>TOTAL:</h2>
                        {shipping.shippingCost !==undefined && <h2>€{(cart.total + shipping.shippingCost).toFixed(2)}</h2>}
                    </div>
                    {(complete) && <div className={styles.buttonContainer}>
                        <Link href='/checkout' passHref>
                            <button
                                className={styles.button}>
                                COMPLETE ORDER
                            </button>
                        </Link>
                    </div>}
                </div>


            </div>
            </div>
        </div>
    );
};

export default Cart;
Cart.layout = "L3";
