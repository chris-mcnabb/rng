import styles from '../../styles/website/ImageModal.module.css';
import Image from "next/image";
import React, {useState} from "react";
const ImageModal = ({img, pic,setShowModal}) => {
    const [index, setIndex] = useState(0)
    const handlePhoto = (idx) => {
        setIndex(idx)
    };
console.log(img)
    return (
        <div className={styles.container}>

            <div className={styles.wrapper}>
                <div className={styles.close} onClick={(()=>setShowModal())}>
                 <span>
                  X
              </span>
                </div>
               <Image src={`/img/${pic[index]}`} alt='' height={600} width={600} objectFit="contain"/>
           </div>
            <div>
                {pic.length > 1 && pic.map((picture, idx)=>(
                    <Image key={idx} className={styles.img} value={idx} src={`/img/${picture}`} alt="" height={100} width={100} objectFit="contain" onClick={()=>handlePhoto(idx)}/>
                ))}


            </div>
        </div>
    );
};

export default ImageModal;
