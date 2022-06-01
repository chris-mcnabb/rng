import Head from 'next/head'

import styles from '../styles/Home.module.css'
import Announcement from "../components/website/Announcement";
import {useEffect, useState} from "react";
import axios from "axios";
import Slider from "../components/website/Slider";
import VendorLogos from "../components/website/VendorLogos";
import windowDimensions from "../components/hooks/windowDimensions";
import {useDispatch} from "react-redux";
Home.layout = "L3";
export default function Home({images}) {

    const { height, width } = windowDimensions();
    const [sale, setSale] = useState(false)
  const dispatch = useDispatch()



    return (
        <>

            <div className={styles.container}>

                <div className={styles.announcement}>
                    {sale && <Announcement/>}
                </div>
                <Head>
                    <title>RnG Diving</title>

                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
             <Slider pics={images} as={'image'}/>
                <VendorLogos logos={images} as={'logo'} width={width}/>
            </div>
        </>
    )
};
export const getStaticProps = async () =>{


    const img = await axios.get(process.env.VERCEL_URL+`/api/images`);


    return{
        props:{

            images: img.data,

        }
    }
};

