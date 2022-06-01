import styles from '../../../styles/website/Overons.module.css'
import Image from "next/image";
import StaffCard from "../StaffCard";
const Staff = () => {
    return (
        <div className={styles.sectionWrapper}>
            <h1>Onze Staff</h1>
                <div className={styles.staffWrapper}>
                    <StaffCard/>
                    <StaffCard/>
                    <StaffCard/>
                    <StaffCard/>
                    <StaffCard/>
                    <StaffCard/>


                </div>
        </div>
    );
};

export default Staff;
