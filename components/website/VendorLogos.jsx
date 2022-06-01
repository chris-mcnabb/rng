
import styles from "../../styles/website/VendorLogo.module.css";
import Image from "next/image";
import Link from "next/link";




const VendorLogos = ({logos, width, as}) => {

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
       <>

           {logos ?<div className={styles.imageContainer}>
               {logos.map((image, idx) => (
                   image.vendorLogo &&
                   <div className={imageStyle(width)} key={idx} as={as}>

                       <Image key={idx} src={image.vendorLogo} alt='' height={imageHeight(width)}
                              width={imageWidth(width)} priority={true} objectFit='contain' as={as}
                              crossOrigin="anonymous"/>


                   </div>

               ))}
           </div> : null
           }

       </>
    );
};

export default VendorLogos;
