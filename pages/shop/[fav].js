import React from 'react';
import {useRouter} from "next/router";
import {getSession} from "next-auth/react";
import styles from "../../styles/website/Cat.module.css";
import Head from "next/head";
import Link from "next/link";
import ServiceCard from "../../components/website/ServiceCard";
import {useSelector} from "react-redux";
import ArrowBack from "../../components/icons/ArrowBack";

const Favorites = ({session}) => {
    const router = useRouter()
    const favorites= useSelector(state=>state.favorite.favorites)
    const {fav} = router.query
    console.log(favorites)
    return (
        <div className={styles.container}>
            <Head>
                <title>Favorites</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/public/favicon.ico" />
            </Head>

            <div className={styles.wrapper}>
                <div className={styles.back}>
                    <Link href="/shop" passHref>
                      <div className={styles.backArrow}>
                        <ArrowBack height={45} width={45}/>
                        <h1 className={styles.terug}> Terug</h1>
                      </div>

                    </Link>
                    <h1>Favorites</h1>
                </div>
                <div className={styles.buttonContainer}>

                </div>
                <div className={styles.cardContainer}>
                    {favorites.map((item, idx) => (

                        <div key={idx}>

                                <ServiceCard key={item._id} product={item}/>


                        </div>
                    ))
                    }
                </div>
            </div>

        </div>

    );
};

    export default Favorites;
Favorites.layout = "L3";
export const getServerSideProps = async (ctx) => {
    return{
        props: {
            session: await getSession(ctx)
        }
    }
}

