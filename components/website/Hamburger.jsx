import React from 'react';
import styles from "../../styles/website/Navbar.module.css";
import Link from "next/link";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
const Hamburger = ({setOpen, quantity, session, user, setTitle, handleClick, handleLogOut, open, favoriteQuantity}) => {
    const router = useRouter()
    const {cartId} = useSelector(state=>state.cart);
    const handleCart = (data) => {
        data === 'cart' && router.push(`/cart/${cartId}`)
        data === 'fav' && router.push(`/shop/favorites`)
    }
    return (
        <>
            <div className={styles.hamburger} onClick={() => setOpen(!open)}>
                <div className={styles.line}/>
                <div className={styles.line}/>
                <div className={styles.line}/>
            </div>
            <ul onClick={() => setOpen(false)} className={styles.menu} style={{right: open ? "0px" : "-50vw"}}>
                {session?.user && <li className={styles.menuItem}>
                    <span>Dag  </span>{session?.firstName}
                </li>}
                <li className={styles.menuItem}>
                    <Link href="/">Home</Link>
                </li>
                <li className={styles.menuItem}>
                    <Link href="/learn" >Learn to Dive</Link>
                </li>
                <li className={styles.menuItem}>
                    <Link href="/shop">Shop</Link>
                </li>
                <li className={styles.menuItem}>
                    <Link href="/overons">Over Ons</Link>
                </li>
                <li className={styles.menuItem}>
                    <Link href="/rental">Rentals</Link>
                </li>
                <li className={styles.menuItem}>
                    <Link href="/service">Service</Link>
                </li>
                <li className={styles.menuItem}  onClick={()=>handleCart('fav')}>
                    WishList: {favoriteQuantity}
                </li>
                <li className={styles.menuItem} onClick={()=>handleCart('cart')}>
                      Cart: {quantity}
                </li>
                {(user?.isEmployee || user?.isAdmin) &&
                    <Link href="/admin" passHref>
                        <li className={styles.menuItem}>Admin</li>
                    </Link>
                }
                {!session?.user ?
                    <li className={styles.menuItem}  onClick={()=>{
                        setTitle('Login'),
                            handleClick('Login')
                    }
                    } >Log In/Register</li>
                    :<>
                        <li className={styles.menuItem}>


                                            <span onClick={handleLogOut}>

                                    Logout
                                </span>


                        </li>
                    </>}

            </ul>

        </>
    );
};

export default Hamburger;
