import React from "react";

import styles from "../../styles/website/CategoryCard.module.css"
import Image from "next/image"

import remco from '../../public/img/remco.jpeg'
const CategoryCard = () => {



    return (
        <div className={styles.container}>

            <div className={styles.circle}/>
            <Image src={remco} alt="" layout="fill" objectFit="contain"/>

                <div className={styles.info}>
                    <h1 className={styles.title}>Remco Van &apos;t Hooft</h1>
                    <div className={styles.iconContainer}>
                        <span className={styles.desc}>Course Director</span>

                    </div>
                </div>

        </div>
    );
};

export default CategoryCard;
