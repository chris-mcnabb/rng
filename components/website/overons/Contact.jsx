import React from 'react';
import styles from "../../../styles/website/Construction.module.css";
import Image from "next/image";

const Contact = ({image}) => {
    return (
        <div className={styles.container}>

            {image.map((pic)=>(
                pic.construction &&
                <div className={styles.image} key={pic._id}>
                    <Image src={pic.construction} alt='' width={2000} height={600} priority={true} objectFit='contain'/>
                </div>

            ))}
            <div className={styles.link}>
                <a href="https://www.freepik.com/vectors/coming-soon">Coming soon vector created by starline </a>
            </div>

        </div>
    );
};

export default Contact;
