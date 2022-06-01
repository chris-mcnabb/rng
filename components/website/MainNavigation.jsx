import React from 'react';
import styles from "../../styles/website/Navbar.module.css";
import Link from "next/link";

import DropDown from "../DropDown";

const MainNavigation = ({setActive, active, session, user, setTitle, handleClick, handleLogOut, test, showDropdown}) => {
    return (
        <div className={styles.item}>
            <div className={styles.userSession}>
                {(user?.isEmployee || user?.isAdmin) &&
                    <Link href="/admin" passHref >
                        <span className={styles.adminItem}>Admin</span>
                    </Link>
                }
                {session &&  <><span className={styles.hand}>👋</span> <span  className={styles.listItem}>Dag {session.firstName}</span></> }
            </div>
            <ul className={styles.list}>
                <Link href="/" passHref>
                    <li className={styles.listItem}>Home</li>
                </Link>
                <Link href="/learn" passHref>
                    <li className={styles.listItem}>Learn to Dive </li>
                </Link>
                <Link href="/shop" passHref>
                    <li className={styles.listItem}>Shop</li>
                </Link>
                <Link href="/overons" passHref>
                    <li className={styles.listItem}>Over Ons</li>
                </Link>
                <Link href="/rental" passHref>
                    <li className={styles.listItem}>Rentals</li>
                </Link>
                <Link href="/service" passHref>
                    <li className={styles.listItem}>Service</li>
                </Link>

                {!session?.user ?
                    <li className={styles.listItem}  onClick={()=>{
                        setTitle('Login'),
                            handleClick('Login')
                    }
                    } >Log In/Register</li>
                    :<>
                         <li className={styles.listItem}>


                        <span onClick={handleLogOut}>

                                    Logout
                                </span>


                    </li>
                    </>}
            </ul>

            <DropDown/>
        </div>
    );
};

export default MainNavigation;
