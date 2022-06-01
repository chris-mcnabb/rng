import React from 'react';
import Sidebar from "../admin/Sidebar";

import styles from "./Layout.module.css"
import AdminNavbar from "../admin/AdminNavbar";

const Layout = ({children}) => {
    return (
        <div className={styles.container}>
           <Sidebar/>
            <div className={styles.lowerContainer}>
                <AdminNavbar/>
            {children}

            </div>
        </div>
    );
};

export default Layout;
