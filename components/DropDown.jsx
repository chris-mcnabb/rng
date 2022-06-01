import React, {useEffect, useRef, useState} from 'react';
import styles from '../styles/website/DropDown.module.css';
import mask from "../public/img/WEB-Zensee-Pro-M1010S-QBA.jpg";
import Search from "./icons/Search";
import Link from "next/link";
import Image from "next/image";


import axios from "axios";

const DropDown = () => {

    const [searchInput, setSearchInput] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);
    const [showDropdown, setShowDropdown] =useState(false)
    const [searchData, setSearchData] = useState('')
    const test = useRef(null);
    useEffect(()=>{
        const dropDownList = async() => {
            try{
                const res = await axios.get(`/api/products`);
                setSearchData(res.data)

            }catch(err){
            console.log(err)
            }
        }
        dropDownList()
    },[])
    const searchItems = (searchValue) => {

        setShowDropdown(true)
        setSearchInput(searchValue)
        const filteredData = searchData.filter((item)=>{

            return Object.values(item).join().toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
        if(searchValue.length === 0){
            setShowDropdown(false)
        }
    };

    const handleSearch = (e) => {
        setShowDropdown(false)
        setFilteredResults([])
        test.current.reset()

    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.value)

    };
    console.log(filteredResults)
    return (
        <div className={styles.searchBar}>
            <form className={styles.searchWrapper}  ref={test} onSubmit={(e)=>handleSubmit(e.target.value)}>
                <div className={styles.searchContainer}>
                    <input className={styles.input}

                           placeholder="Search..."
                           onChange={(e)=> searchItems(e.target.value)}

                    />
                    <Search style={{color: "gray", fontSize: 16}}/>
                </div>
                {showDropdown &&
                    <div className={styles.dropdown}>
                        {filteredResults.map((items, idx) => (
                            <div key={idx} className={styles.searchList}>
                                <Link style={{textDecoration: "none", color: "black"}} href={`/shop/${items.categories[0]}/${items._id}`} passHref>
                                    <div className={styles.searchItems}>
                                        <Image className={styles.searchImg} src={mask} alt="" height={30} width={30}/>
                                        <option className={styles.searchListItem} onClick={()=>handleSearch(items)}>
                                            {items.name}
                                        </option>
                                    </div>
                                </Link>
                            </div>
                        ))}

                    </div>}
            </form>
        </div>
    );
};

export default DropDown;
