import  {useState, useMemo} from 'react';
import styles from "../../styles/website/Login.module.css";



import {useRouter} from "next/router";
import {newGuest} from "../../redux/apiCalls";
import {useDispatch} from "react-redux";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import countryList from 'react-select-country-list'
import phone from 'phone'
import postalCodes from 'zipcodes-regex'


const GuestCheckOut = ({setShowModal}) => {
    const options = useMemo(() => countryList().getData(), [])
    const dispatch = useDispatch()
    const router = useRouter()
    const [country, setCountry] = useState('')

    const [code, setCode] =useState(postalCodes.NL)

    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
        country: yup.string().required(),
        address: yup.string().required(),
        city: yup.string().required(),
        postalCode: yup.string().required()
            .matches({code}, 'Post Code does not match country format'),
        phone: yup.string().required('Please enter your phone number'),



    })
    const { register, handleSubmit, formState: {errors}, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async(data) => {
        console.log(data)

        await newGuest(dispatch, {
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            email: data.email,
            address: data.address,
            city: data.city,
            postalCode: data.postalCode,
            country: data.country
        })
        reset()
        setShowModal()

    };





    return (
        <div className={styles.wrapper}>
            <div className={styles.close} onClick={(()=>setShowModal())}>
                 <span>
                  X
              </span>
            </div>
            <h1 className={styles.title}>ENTER SHIPPING INFORMATION</h1>
            <form className={styles.form}   onSubmit={handleSubmit(onSubmit)}>

                <input className={styles.input} {...register("firstName")} placeholder="voornaam" />
                {errors.firstName && <p>{errors.firstName?.message}</p>}
                <input className={styles.input} {...register("lastName")} placeholder="achternaam" />
                {errors.lastName && <p>{errors.lastName?.message}</p>}
                <input className={styles.input} placeholder="email" {...register("email")} />
                {errors.email && <p>{errors.email?.message}</p>}
                <input className={styles.input} placeholder="phone" {...register("phone")} />
                {errors.phone && <p>{errors.phone?.message}</p>}
                <select className={styles.input} {...register("country")} onChange={(e) => {
                    setCountry(e.target.value)
                    setCode(postalCodes[e.target.value])
                }}>
                    <option value="NL">NL</option>
                    <option value="DE">DE</option>
                    <option value="BE">BE</option>
                    {options.map((country, idx)=>(
                        <option key={idx} value={country.value}>{country.value}</option>
                    ))}
                </select>

                <input className={styles.input} {...register("address")} placeholder="address" type="text" />
                {errors.address && <p>{errors.address?.message}</p>}
                <input className={styles.input} {...register("city")} placeholder="city" type="text" />
                {errors.city && <p>{errors.city?.message}</p>}


                {country === 'US' ?
                    <>
                        <input className={styles.input} {...register("state")} placeholder="state" type="text"/>
                        <p>{errors.state?.message}</p>
                        <input className={styles.input} {...register("postalCode")} placeholder="zip code" type="password" />
                {errors.postalCode &&<p>{errors.postalCode?.message}</p>}
                    </>
                    :  <>
                        <input className={styles.input} {...register("postalCode")}  placeholder="postal code" type="text" />
                {errors.postalCode&&<p>{errors.postalCode?.message}</p>}
                    </>
                }

                <button className={styles.button} type='submit' >CONTINUE</button>


            </form>
        </div>
    );
};

export default GuestCheckOut;
