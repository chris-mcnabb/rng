
import styles from "../../styles/website/VendorLogo.module.css";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import axios from "axios";




const VendorLogos = ({ width, as}) => {
  const [logos, setLogos] = useState([])

    useEffect(()=>{
        const loadVendors = async() => {
            try{
                const res = await axios.get(`/api/images`);

                res.data.map((pic)=>{
                    if(pic.pic.category==='vendorLogo'){
                        setLogos(prev=>[...prev, pic.pic])
                    }
                })


            }catch(err){
                console.log(err)
            }
        }
        loadVendors()
    },[])

const imageStyle = (width) => {
        if(width > 850){
            return styles.scrollingImage
        }
        if(width <= 850){

            return styles.mobileScrollingImage
        }
}
const imageHeight = (width) => {
    if(width >850){
     return 80
    }

    if(width <= 850){
        return 50

    }
}
const imageWidth = (width) => {
    if(width >850){
        return 100
    }

    if(width <= 850){
        return 50

    }
}

    return (

                <div>
                   <div className={styles.imageContainer}>
                        {logos.map((image, idx) => (

                            <div className={imageStyle(width)} key={idx} as={as}>

                                <Image  src={image.img} alt='' height={imageHeight(width)}
                                       width={imageWidth(width)} priority={true} objectFit='contain' as={as}
                                       crossOrigin="anonymous"/>


                            </div>

                        ))}
                    </div>


                </div>


    );
};

export default VendorLogos;
