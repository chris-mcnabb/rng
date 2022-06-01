import {removeFavorite} from "../../redux/favoriteSlice";
import styles from "../../styles/website/ProductPage.module.css";

import React, {useEffect} from "react";
import {editFavorites, setFavorites} from "../../redux/apiCalls";
import useToggle from "../hooks/useToggle";
import Heart from "../icons/Heart";


export const FavoriteButton = ({dispatch, product, quantity, favs, favoriteCart, session}) => {

    const handleSave =  () => {
        const dupSearch = favs.filter((favorite)=>favorite._id === product._id )
        console.log(dupSearch.length)
      if(dupSearch.length===0){
            setFavorites(
                dispatch, product, session, favs, favoriteCart
            )
            console.log(dupSearch.length)


        }

    };
  const clearFavorite = async () => {
     dispatch(
            removeFavorite( {id: product._id, quantity})
        )

       await editFavorites(dispatch, product, session, favs, favoriteCart, {deleteId: product._id})
    };
    return(
        <>
            {favs.filter((favorite)=>favorite._id === product._id ).length === 0 ?
                <button  className={styles.favoriteButton}  onClick={handleSave}>
                    <span className={styles.favoriteSpan}>Save for Later</span>
                   <div className={styles.big}>
                       <Heart  color={'red'} height={30} width={30}/>
                   </div>
                    <div className={styles.small}>
                        <Heart   color={'white'} height={20} width={20}/>
                    </div>
                </button> :
                <button className={styles.savedButton} onClick={clearFavorite}>
                    <span className={styles.favoriteSpan}>Saved</span>
                   <div className={styles.big}>
                       <Heart   color={'red'} height={30} width={30}/>
                   </div>
                    <div className={styles.small}>
                        <Heart    color={'white'} height={20} width={20}/>
                    </div>
                </button>}
        </>
    )
}


export const AddToCart = ({setQuantity, quantity, setTitle, handleClick, max}) => {
    const [disabled, setDisabled] = useToggle()
useEffect(()=>{
    if(max === 0){
        setDisabled()
    }
},[max, setDisabled])
console.log(max)
    return(
        <>
            <div className={styles.orderContainer}>
                <input  onChange={(e)=>setQuantity(e.target.value)} type="number" defaultValue={quantity} min='1' max={max} className={styles.quantity}/>
                <button disabled={disabled} className={styles.button} onClick={()=> {
                    setTitle('Cart'),
                        handleClick('Cart')
                }}>Add to Cart</button>
            </div>
        </>
    )
}
