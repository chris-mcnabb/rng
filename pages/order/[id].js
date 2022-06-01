import React from 'react';
import {useRouter} from "next/router";

import styles from "../../styles/website/Cart.module.css";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";

const Order = ({order}) => {
    const router = useRouter()
    const {id} = router.query
    console.log(order)
    const statusClass = (index) => {
        if(index === 0){

          return styles.received


        }
        if(index === 1){

            return styles.prepared

        }
        if(index === 2){

            return styles.shipped;
        }
        if(index === 3) {

            return styles.delivered;
        }
        if(index === 4) {

            return styles.cancelled;
        }
    };
    const statusName = (index) => {
        if(index === 0){

            return 'Order Received'
        }
        if(index === 1){

            return 'Ready to Ship'

        }
        if(index === 2){

            return 'Shipped'
        }
        if(index === 3) {

            return 'Delivered';
        }
        if(index === 4) {

            return 'Cancelled'
        }
    };
    return (
        <div className={styles.container}>
            <Head>

                <title></title></Head>

            <div className={styles.header}>
                <h1>Order Number: {id}</h1>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    {order.items.map((item, idx)=>(
                        <div className={styles.product} key={item._id}>
                            <div className={styles.productDetail}>
                                <Image src={`/img/${item.img}`} alt='' height={200} width={200} objectFit='contain'/>
                                <div className={styles.details}>
                                    <span><b>Name:</b> {item.name}</span>
                                    <span><b>ID:</b> {item.modelId}</span>
                                    {item.color && <span><b>Color:</b> {item.color}</span>}
                                    {item.size && <span><b>Size:</b> {item.size}</span>}
                                </div>
                            </div>
                            <div className={styles.priceDetail}>
                                <div className={styles.productAmountContainer}>
                                    <span>Quantity: {item.quantity}</span>

                                </div>
                                <div className={styles.productPrice}>
                                    <span>  €{Number(item.price*(item.quantity)).toFixed(2)}</span>
                                </div>

                            </div>

                        </div>

                    ))}
                    <hr className={styles.hr}/>
                </div>
                <div className={styles.rightOrder}>
                    <div className={styles.topRight}>
                        <div className={styles.summary}>
                            <span className={styles.summaryText}>Order Status: </span>
                            <span className={styles.summaryText}>{statusName(order.status)}</span>
                        </div>
                        <div className={styles.summary}>
                            <span className={styles.summaryText}>Address: </span>
                            <span className={styles.summaryText}>{order.address.address}</span>
                        </div>
                        <div className={styles.summary}>
                            <span className={styles.summaryText}>City: </span>
                            <span className={styles.summaryText}>{order.address.city}</span>
                        </div>
                        <div className={styles.summary}>
                            <span className={styles.summaryText}>Post Code: </span>
                            <span className={styles.summaryText}>{order.address.postalCode}</span>
                        </div>
                        <div className={styles.summary}>
                            <span className={styles.summaryText}>Country: </span>
                            <span className={styles.summaryText}>{order.address.country}</span>
                        </div>
                        <div className={styles.summary}>
                            <span className={styles.summaryText}>Carrier: </span>
                            <span className={styles.summaryText}>{order.shippingMethod.shippingMethod}</span>
                        </div>
                        <div className={styles.summary}>
                            <span className={styles.summaryText}>Tracking Number: </span>
                            <span className={styles.summaryText}>{id}</span>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

    export default Order;
Order.layout = "L3";
export const getServerSideProps = async ({params}) =>{

    const res = await axios.get(process.env.VERCEL_URL+`/api/orders/${params.id}`);

    return{
        props:{
            order: res.data,



        }
    }
}
