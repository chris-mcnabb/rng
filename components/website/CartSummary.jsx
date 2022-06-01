import styles from '../../styles/website/CartSummary.module.css'
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import ArrowBack from "../icons/ArrowBack";
const CartSummary = ({ setShowModal, product, img, quantity, size, color}) => {
    const router = useRouter()
    const cart = useSelector(state => state.cart);
    const {cartId} = useSelector(state => state.cart);
    const handleClick = () => {

        setShowModal()
        router.push(`/cart/${cartId}`)
    }



    return (
        <div className={styles.container}>
             <span onClick={(()=>setShowModal())} className={styles.close}>
                  X
              </span>
            <div className={styles.left}>
                <div className={styles.title}>
                    <span>Added to Shopping Cart</span>
                </div>
                <hr className={styles.topHr}/>
                <div className={styles.items}>

                    <Image src={img} alt="" height={120} width={120} objectFit="contain"/>
                    <div className={styles.desc}>
                        <span className={styles.name}>{product.name}</span>
                        <span className={styles.item}>Price: €{(product.price).toFixed(2)}</span>
                        {size && <span className={styles.item}>Size: {size}</span>}
                        {color && <span className={styles.item}>Color: {color}</span>}
                        <span className={styles.item}>Quantity: {quantity}</span>
                    </div>


                </div>
                <Link href='/shop' passHref>
                <div className={styles.backButton}>
                  <div>
                        <ArrowBack color={'#1980b5'} height={20} width={20}/>
                  </div>
                   <span>
                       CONTINUE SHOPPING
                   </span>
                </div>
                </Link>
            </div>
            <hr className={styles.hr}/>
            <div className={styles.right}>
                <div className={styles.title}>
                    <span>Shopping Cart</span>
                </div>
                <hr className={styles.topHr}/>
                <div className={styles.totals}>
                    <div className={styles.itemTotals}>
                        <span className={styles.infoTotals}>Total Items: {cart.quantity}</span>
                        <span className={styles.infoTotals}>Total: €{(cart.total).toFixed(2)}</span>
                    </div>
                    <button className={styles.button} onClick={handleClick}>VIEW CART</button>
                </div>
            </div>
        </div>
    );
};

export default CartSummary;
