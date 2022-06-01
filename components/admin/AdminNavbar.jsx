import styles from '../../styles/admin/AdminNavbar.module.css'


import React from "react";
import {useRouter} from "next/router";
import Modal from "../Modal";

import {useSession, signOut} from "next-auth/react";

import Link from "next/link";
import useToggle from "../hooks/useToggle";
import Search from '../icons/Search'
import Profile from "../icons/Profile";
import Exit from '../icons/Exit'
const Navbar = () => {
    const [showModal, setShowModal] = useToggle()
    const [active, setActive] = useToggle()
    const router = useRouter()
    const { data: session } =   useSession()

    const handleClick = () => {
        setShowModal();
    }

    return (
        <>
            <Modal showModal={showModal} setShowModal={setShowModal} title={'Nieuw'}/>
            <div className={styles.navbar}>
                <div className={styles.wrapper}>
                    <div className={styles.search}>
                        <input className={styles.input} type="text" placeholder='Search...'/>
                        <Search height={20} width={20}/>
                    </div>
                    <div className={styles.user}>
                        {session && <h2>👋  Dag {session.firstName}</h2>}
                    </div>
                    <div className={styles.items}>

                        <div className={styles.item}>

                            <button className={styles.productAddButton2} onClick={handleClick}>Nieuw</button>


                        </div>
                        <div className={styles.item}>
                            <div className={styles.avatar} onClick={()=>setActive()}>
                                <div className={styles.avatarText}>
                                    {session && <span>{session.user.firstName[0].toUpperCase()}{session?.user.lastName[0].toUpperCase()}</span>}
                                </div>
                            </div>
                            <div className={active === true ? styles.infoBoxContainerActive : styles.infoBoxContainer} onClick={()=>setActive()}>
                                <div className={styles.infoBox}>
                                    <div className={styles.popUpTitle}>
                                        <h3>👋 Dag {session?.firstName}</h3>
                                        <hr/>
                                    </div>
                                    <div className={styles.popUpOptions}>
                                        <Link href={`/admin/users/employee/${session?.id}`} passHref>

                                    <span>
                                    <Profile/>
                                 <span className={styles.profile}>
                                     Profile
                                 </span>
                                </span>
                                        </Link>
                                        <span  onClick={()=>signOut()}>
                                       <Exit />
                                   <span  className={styles.profile}>
                                       Logout
                                   </span>
                                </span>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
