import React from 'react';
import styles from '../../styles/website/Rentals.module.css'



const Rentals = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>




                   <div className={styles.headerTitle}>
                       <h1>Rent Scuba Gear</h1>
                   </div>

            </div>
            <div className={styles.wrapper}>
            <h2>Packages</h2>
                <div className={styles.headerLine}>
                    <span>Package</span>
                    <span>Price</span>
                </div>
                <div className={styles.gearInfo}>
                   <div className={styles.infoTitle}>
                       <span className={styles.title}>Rental of Full Equipment Set (Day or Weekend)</span>
                       <span>Includes a wetsuit, BCD, regulator, tank, weights, and a bag.</span>
                   </div>
                    <span>€75.00</span>
                </div>
                <hr className={styles.hr}/>
                <div className={styles.gearInfo}>
                    <div className={styles.infoTitle}>
                        <span className={styles.title}>Personal Gear Rental Set (Day or Weekend)</span>
                        <span>Includes a mask, snorkel, pair of boots, and fins.</span>
                    </div>
                    <span>€45.00</span>

                </div>
        <div className={styles.disclaimer}><i>**Extended length rental packages are available at a discount upon request**</i></div>

                <h2>Individual Rental Items</h2>
                <div className={styles.headerLine}>
                    <span>Personal Items</span>
                  <div className={styles.weekly}>
                      <span>1/2 Day</span>
                      <span>Full Day</span>
                      <span>Weekend</span>
                      <span>Weekly</span>
                  </div>
                </div>
                <div className={styles.gearInfo}>
                    <div className={styles.infoTitle}>
                        <span>Mask</span>
                    </div>
                    <div className={styles.weekly}>
                        <span>€10.00</span>
                        <span>€12.50</span>
                        <span>€20.00</span>
                        <span>€35.00</span>
                    </div>
                </div>
                <hr className={styles.hr}/>
                <div className={styles.gearInfo}>
                    <div className={styles.infoTitle}>
                        <span>Snorkel</span>
                    </div>
                    <div className={styles.weekly}>
                        <span>€10.00</span>
                        <span>€12.50</span>
                        <span>€20.00</span>
                        <span>€35.00</span>
                    </div>
                </div>
                <hr className={styles.hr}/>
                <div className={styles.gearInfo}>
                    <div className={styles.infoTitle}>
                        <span>Fins</span>
                    </div>
                    <div className={styles.weekly}>
                        <span>€10.00</span>
                        <span>€12.50</span>
                        <span>€20.00</span>
                        <span>€35.00</span>
                    </div>
                </div>
                <hr className={styles.hr}/>
                <div className={styles.gearInfo}>
                    <div className={styles.infoTitle}>
                        <span>Boots</span>
                    </div>
                    <div className={styles.weekly}>
                        <span>€10.00</span>
                        <span>€12.50</span>
                        <span>€20.00</span>
                        <span>€35.00</span>
                    </div>
                </div>

                <div className={styles.headerLine}>
                    <span>BCD/Regulators</span>
                    <div className={styles.weekly}>
                        <span>1/2 Day</span>
                        <span>Full Day</span>
                        <span>Weekend</span>
                        <span>Weekly</span>
                    </div>
                </div>
                <div className={styles.headerLine}>
                    <span>Exposure Protection</span>
                    <div className={styles.weekly}>
                        <span>1/2 Day</span>
                        <span>Full Day</span>
                        <span>Weekend</span>
                        <span>Weekly</span>
                    </div>
                </div>
                <div className={styles.headerLine}>
                    <span>Tanks</span>
                    <div className={styles.weekly}>
                        <span>1/2 Day</span>
                        <span>Full Day</span>
                        <span>Weekend</span>
                        <span>Weekly</span>
                    </div>
                </div>
                <div className={styles.headerLine}>
                    <span>Cameras</span>
                    <div className={styles.weekly}>
                        <span>1/2 Day</span>
                        <span>Full Day</span>
                        <span>Weekend</span>
                        <span>Weekly</span>
                    </div>
                </div>
                <div className={styles.headerLine}>
                    <span>Miscellaneous</span>
                    <div className={styles.weekly}>
                        <span>1/2 Day</span>
                        <span>Full Day</span>
                        <span>Weekend</span>
                        <span>Weekly</span>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Rentals;
Rentals.layout = "L3";
