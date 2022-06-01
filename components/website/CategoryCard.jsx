import React from "react";

import styles from "../../styles/website/CategoryCard.module.css"
import Image from "next/image"
import Link from "next/link"

const CategoryCard = ({category, fill, index}) => {

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
             <Image src={category.img}   alt="" layout={fill} objectFit="contain"/>
         </div>
            <Link href={`/shop/category/${category.name}`} passHref>
            <div className={styles.info}>
                <h1 className={styles.title}>{category.name}</h1>
                <div className={styles.iconContainer}>
                    <span className={styles.desc}>{category.desc}</span>

                </div>
            </div>
            </Link>
        </div>
    );
};

export default CategoryCard;
