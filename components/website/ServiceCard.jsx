import React from 'react';
import styles from "../../styles/website/ServiceCard.module.css";
import Image from "next/image";

import Router, {useRouter} from 'next/router'
const ServiceCard = ({product, cat}) => {

    const router = useRouter()

    const handleClick = (page) => {
        router.push(`/shop/${cat}/${page}`)
    }

    return (
        <div className={styles.container} onClick={()=>handleClick(product._id)}>

            <div className={styles.circle}>
            {product.img && <Image src={`/img/${product.img[0]}`} alt="" height={150} width={150} objectFit="contain"/>}

            </div>
            <div className={styles.mobileImg}>
                {product.img && <Image src={`/img/${product.img[0]}`} alt="" height={50} width={150} objectFit="contain"/>}

            </div>

                <div className={styles.info}>
                    <span className={styles.manufacturer}>{product.manufacturer}</span>
                    <span className={styles.title}>{product.name}</span>
                    <div className={styles.iconContainer}>
                        <span className={styles.price}>€{(product.price).toFixed(2)}</span>
                    </div>





                </div>

        </div>
    );
};



export default ServiceCard;
