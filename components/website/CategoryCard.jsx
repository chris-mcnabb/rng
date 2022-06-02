import React from "react";

import styles from "../../styles/website/CategoryCard.module.css"
import Image from "next/image"
import Link from "next/link"

const CategoryCard = ({name, desc, img, fill, index}) => {

    const containerSize = (index) => {
        if(index === 'all'){
            return styles.container
        }
        if(index === 'category'){
            return styles.serviceContainer
        }
    }

    return (
        <div className={containerSize(index)}>

            <div className={styles.circle}/>

         <div  className={styles.img}>
             <Image src={img}   alt="" width={300} height={350} objectFit="contain"/>
         </div>
            <Link href={`/shop/category/${name}`} passHref >
            <div className={styles.info}>
                <h1 className={styles.title}>{name}</h1>
                <div className={styles.iconContainer}>
                    <span className={styles.desc}>{desc}</span>

                </div>
            </div>
            </Link>
        </div>
    );
};

export default CategoryCard;
