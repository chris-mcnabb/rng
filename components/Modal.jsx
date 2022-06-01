import React from 'react';
import styles from "../styles/Modal.module.css"

import Link from 'next/link'
import Login from "./website/Login";
import CartSummary from "./website/CartSummary";
import ImageModal from "./website/ImageModal";
import GuestCheckOut from "./website/GuestCheckOut"
/*import CheckoutForm from './checkout/CheckoutForm'
import {useRouter} from "next/router";




import UserSearch from "./admin/UserSearch";

import GuestCheckOut from "./website/GuestCheckOut";*/


const Modal = ({showModal, setShowModal, title, location, pic, img, product, size, color, quantity}) => {
    const handleClick = (value) => {
        console.log('--->', value)
        setShowModal()


    }

    return (

    <>
        {showModal &&
            <div  className={styles.container}>
                {title === 'Login' && <Login handleClick={handleClick} location={location} showModal={showModal}
                                             setShowModal={setShowModal}/>}
                {title === 'Cart' && <CartSummary quantity={quantity} size={size} color={color} showModal={showModal}
                                                  setShowModal={setShowModal} product={product} img={img}/>}
                {title === 'Photo' &&
                    <ImageModal showModal={showModal} setShowModal={setShowModal} img={img} pic={pic}/>}
                {title === 'Guest' && <GuestCheckOut handleClick={handleClick} setShowModal={setShowModal}/>}
            </div>


        }
        {/*    {showModal &&
            <div className={styles.container}>
                {title === 'Nieuw' && <NieuwModal setShowModal={setShowModal}/>}
                {title === 'Guest' && <GuestCheckOut handleClick={handleClick} setShowModal={setShowModal}/>}

                {title === 'Login' && <Login handleClick={handleClick} location={location} showModal={showModal}
                                             setShowModal={setShowModal}/>}
                {title === 'Cart' && <CartSummary quantity={quantity} size={size} color={color} showModal={showModal}
                                                  setShowModal={setShowModal} product={product} img={img}/>}
                {title === 'Photo' &&
                    <ImageModal showModal={showModal} setShowModal={setShowModal} img={img} pic={pic}/>}
                {title === 'FindUser' &&
                    <UserSearch newSale={newSale} setNewSale={setNewSale} client={client} setClient={setClient}
                                showModal={showModal} setShowModal={setShowModal} search={'search'} criteria={criteria}
                                setCriteria={setCriteria}/>}
            </div>
        }*/}
    </>

    );
};

export default Modal;
