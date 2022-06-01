

import styles from '../../styles/admin/Sidebar.module.css'
import React, {useState} from 'react';
import Link from "next/link"
import Image from "next/image";
import Calendar from '../icons/Calendar'

import Danger from '../icons/Danger'
import Dashboard from '../icons/Dashboard'
import Employee from '../icons/Employee'
import Exit from '../icons/Exit'
import Money from '../icons/Money'
import Notification from '../icons/Notification'
import Payment from '../icons/Payment'
import Person from '../icons/Person'
import Product from '../icons/Product'
import Profile from '../icons/Profile'
import School from '../icons/School'
import Timer from '../icons/Timer'
import TrendingUp from '../icons/TrendingUp'
import Web from '../icons/Web'


import logo from "../../public/img/headerlogo.svg";

const Sidebar = () => {
    const [active, setActive] =  useState("")

    const handleClick = (selection) => {
        setActive(selection)
    }
    return (
        <div className={styles.sidebar}>
            <Link href="/" passHref>
                <div className={styles.top}>
                    <Image src={logo}
                           priority={true}
                           alt=""
                           height="150"
                           width="150"
                           objectFit="contain"
                    />

                </div>
            </Link>
            <div className={styles.center}>
                <ul className={styles.ul}>
                    <p className={styles.title}>MAIN</p>
                    <Link href="/admin/" passHref>
                        <li className={active === "Home" ? styles.liActive : styles.li} onClick={()=>handleClick("Home")}>
                            <Dashboard className={styles.icon}/>
                            <span className={styles.span}>Dashboard</span>
                        </li>
                    </Link>
                    <p className={styles.title}>BOOK</p>
                    <Link href="/admin/new/lesson" passHref>
                        <li className={active === "Lessons" ? styles.liActive : styles.li} onClick={()=>handleClick("Lessons")}>
                            <School className={styles.icon} />
                            <span className={styles.span}>Nieuw Lesson</span>
                        </li>
                    </Link>
                    <Link href="/admin/new/sale" passHref>
                        <li className={active === "newSale" ? styles.liActive : styles.li} onClick={()=>handleClick("newSale")}>
                            <Money className={styles.icon} />
                            <span  className={styles.span}>New Sale</span>
                        </li>
                    </Link>
                    <li className={styles.li}>
                        <Payment className={styles.icon}/>
                        <span  className={styles.span}>New Invoice</span>
                    </li>
                    <p className={styles.title}>SCHEDULING</p>
                    <Link href="/admin/calendar" passHref>
                        <li className={active === "Calendar" ? styles.liActive : styles.li} onClick={()=>handleClick("Calendar")}>
                            <Calendar className={styles.icon} />
                            <span className={styles.span}>View Calendar</span>
                        </li>
                    </Link>
                    <Link href="/admin/calendar/lessons" passHref>
                        <li className={active === "LessonCalendar" ? styles.liActive : styles.li} onClick={()=>handleClick("LessonCalendar")}>
                            <School className={styles.icon} />
                            <span className={styles.span}>Lessons</span>
                        </li>
                    </Link>
                    <Link href="/admin/calendar/rental" passHref>
                        <li className={active === "Rental" ? styles.liActive : styles.li} onClick={()=>handleClick("Rental")}>
                            <Timer className={styles.icon} />
                            <span className={styles.span}>Rental</span>
                        </li>
                    </Link>
                    <Link href="/admin/calendar/service" passHref>
                        <li className={active === "Service" ? styles.liActive : styles.li} onClick={()=>handleClick("Service")}>
                            <Danger className={styles.icon}/>
                            <span className={styles.span}>Service</span>
                        </li>
                    </Link>

                    <li  className={styles.li}>
                        <Notification   className={styles.icon}/>
                        <span  className={styles.span}>Notifications</span>
                    </li>

                    <p className={styles.title}>LISTS</p>
                    <Link href="/admin/sales" passHref>
                        <li className={active === "Sales" ? styles.liActive : styles.li} onClick={()=>handleClick("Sales")}>
                            <TrendingUp className={styles.icon}/>
                            <span className={styles.span}>Sales</span>
                        </li>
                    </Link>
                    <Link href="/admin/users/customer" passHref>
                        <li className={active === "Customer" ? styles.liActive : styles.li} onClick={()=>handleClick("Customer")}>
                            <Person  className={styles.icon}/>
                            <span  className={styles.span}>Customers</span>
                        </li>
                    </Link>
                    <Link href="/admin/users/employee" passHref>
                        <li className={active === "Employee" ? styles.liActive : styles.li} onClick={()=>handleClick("Employee")}>
                            <Employee className={styles.icon}/>
                            <span  className={styles.span}>Instructors/Employees</span>
                        </li>
                    </Link>
                    <Link href="/admin/products" passHref>
                        <li className={active === "Product" ? styles.liActive : styles.li} onClick={()=>handleClick("Product")}>
                            <Product className={styles.icon}/>
                            <span  className={styles.span}>Products</span>
                        </li>
                    </Link>
                    <Link href="/admin/orders" passHref>
                        <li className={active === "Order" ? styles.liActive : styles.li} onClick={()=>handleClick("Order")}>
                            <Payment   className={styles.icon}/>
                            <span  className={styles.span}>Orders</span>
                        </li>
                    </Link>
                    <li className={styles.li}>
                        <Danger className={styles.icon}/>
                        <span  className={styles.span}>Service</span>
                    </li>
                    <p className={styles.title}>SITE</p>
                    <Link href="/admin/maintenance" passHref>
                        <li className={active === "Maintenance" ? styles.liActive : styles.li} onClick={()=>handleClick("Maintenance")}>
                            <Web   className={styles.icon}/>
                            <span  className={styles.span}>Maintenance</span>
                        </li>
                    </Link>
                    <p className={styles.title}>USER</p>

                    <li  className={styles.li}>
                        <Profile   className={styles.icon}/>
                        <span  className={styles.span}>Profile</span>
                    </li>
                    <li  className={styles.li}>
                        <Exit   className={styles.icon}/>
                        <span  className={styles.span}>Logout</span>
                    </li>

                </ul>
            </div>

        </div>
    );
};

export default Sidebar;
