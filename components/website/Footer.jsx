import styles from "../../styles/website/Footer.module.css"
import Image from "next/image";
import monkey from '../../public/img/494.jpg'
const Footer = () => {

    return (


            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.contactContainer}>
                        <div className={styles.addressContainer}>
                        <span className={styles.contactInfo}>
                            Teteringsedijk 275
                        </span>
                            <span className={styles.contactInfo}>
                            4817 ME Breda, NL
                        </span>
                        </div>
                        <span className={styles.contactInfo}>
                        info@rngdiving.nl
                    </span>
                        <span className={styles.contactInfo}>
                        KvK: 06-41280374
                    </span>
                    </div>
                    <div className={styles.creator}>
                        <span className={styles.app}> powered by DiveMonkey</span>
                        <div className={styles.attribute}>
                            <div className={styles.pic}>
                                <Image src={monkey} alt='' width={25} height={25} objectFit='contain'/>
                                <a href='https://www.freepik.com/vectors/gorilla-logo'> vector created by dgim-studio</a>
                            </div>

                        </div>

                    </div>
                </div>

            </div>

    );
};

export default Footer;
